import os
from pathlib import Path
import tempfile
from fastembed.embedding import FlagEmbedding, EmbeddingModel

class LocalEmbedding(FlagEmbedding):
    """
    Extension of the Flag Embedding model.

    Args:
        Embedding (_type_): _description_
    """
    def __init__(
            self,
            model_name: str = "BAAI/bge-small-en-v1.5",
            path: Path = None,
            max_length: int = 512,
            cache_dir: str = None,
            threads: int = None,
    ):
        """
        Args:
            model_name (str): The name of the model to use.
            max_length (int, optional): The maximum number of tokens. Defaults to 512. Unknown behavior for values > 512.
            cache_dir (str, optional): The path to the cache directory.
                                       Can be set using the `FASTEMBED_CACHE_PATH` env variable.
                                       Defaults to `fastembed_cache` in the system's temp directory.
            threads (int, optional): The number of threads single onnxruntime session can use. Defaults to None.

        Raises:
            ValueError: If the model_name is not in the format <org>/<model> e.g. BAAI/bge-base-en.
        """
        self.model_name = model_name

        if cache_dir is None:
            default_cache_dir = os.path.join(tempfile.gettempdir(), "fastembed_cache")
            cache_dir = Path(os.getenv("FASTEMBED_CACHE_PATH", default_cache_dir))
            print("------------------------- Cache dir is now ", cache_dir)
            cache_dir.mkdir(parents=True, exist_ok=True)

        self._cache_dir = cache_dir
        self._model_dir = self.retrieve_model_local(model_name, cache_dir)
        #self._model_dir = path
        self._max_length = max_length

        self.model = EmbeddingModel(self._model_dir, self.model_name, max_length=max_length, max_threads=threads)
        
    def retrieve_model_local(self, model_name: str, cache_dir: str) -> Path:
        """
        Retrieves a model from local storage.

        Args:
            model_name (str): The name of the model to retrieve.
            cache_dir (str): The path to the cache directory.

        Raises:
            ValueError: If the model_name is not in the format <org>/<model> e.g. BAAI/bge-base-en.

        Returns:
            Path: The path to the model directory.
        """

        assert "/" in model_name, "model_name must be in the format <org>/<model> e.g. BAAI/bge-base-en"

        fast_model_name = f"fast-{model_name.split('/')[-1]}"

        model_dir = Path(cache_dir) / fast_model_name
        if model_dir.exists():
            return model_dir

        model_tar_gz = Path(cache_dir) / f"{fast_model_name}.tar.gz"
        
        # We don't need to download
        # in fact, it checks if it's already downloaded first
        # we can use this in order to shortcut to the decompressing stage. Just check the source just in case
        '''
        try:
            self.download_file_from_gcs(
                f"https://storage.googleapis.com/qdrant-fastembed/{fast_model_name}.tar.gz",
                output_path=str(model_tar_gz),
            )
        except PermissionError:
            simple_model_name = model_name.replace("/", "-")
            print(f"Was not able to download {fast_model_name}.tar.gz, trying {simple_model_name}.tar.gz")
            self.download_file_from_gcs(
                f"https://storage.googleapis.com/qdrant-fastembed/{simple_model_name}.tar.gz",
                output_path=str(model_tar_gz),
            )
        '''

        self.decompress_to_cache(targz_path=str(model_tar_gz), cache_dir=cache_dir)
        assert model_dir.exists(), f"Could not find {model_dir} in {cache_dir}"

        model_tar_gz.unlink()

        return model_dir
