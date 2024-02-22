import json
import os
import tempfile
from pathlib import Path

import numpy as np
from fastembed.embedding import FlagEmbedding as Embedding
#from fastembed.embedding import EmbeddingModel
from localembedding import LocalEmbedding

# Install package synchronously with .run to the temp directory
mv = subprocess.run(['mv', os.environ["PATH_TO_MODEL"], tempfile.gettempdir(), capture_output=True, text=True)
print(mv.stdout, "Succeeded")
print(mv.stderr, "Failed")

def lambda_handler(event, context):

    # Example list of documents
    documents: List[str] = [
        "Authentic Italian pizza baked in a wood-fired oven. Italian, Pizza, Casual Dining",
        "Sushi bar with a modern twist, offering fresh and creative rolls. Japanese, Sushi, Trendy",
        "Cozy cafe specializing in artisanal coffee and homemade pastries. Cafe, Coffee, Bakery",
        "Bold flavors of Indian street food served in a vibrant and lively atmosphere. Indian, Street Food, Energetic",
        "Rustic barbecue joint with slow-cooked meats and savory sauces. BBQ, Southern, Casual",
        "Chic vegetarian restaurant featuring innovative plant-based dishes. Vegetarian, Contemporary, Fine Dining",
        "Family-friendly diner serving classic American comfort food. American, Diner, Family-Friendly",
        "Mouthwatering desserts and handcrafted chocolates in a charming patisserie. Desserts, Chocolate, Patisserie",
        "Pan-Asian fusion restaurant offering a diverse menu of flavors. Asian Fusion, Pan-Asian, Eclectic",
        "Gourmet burger bar with a variety of unique toppings and artisanal buns. Burgers, Gourmet, Casual"
    ]
    
    ids = [
        "Pizza Napoli",
        "Sakura Sushi Lounge",
        "Café Aroma",
        "Spice Street Bites",
        "Smokehouse Grill",
        "Green Elegance",
        "Classic Diner Delight",
        "Sweet Indulgence Patisserie",
        "Flavors of Asia",
        "BunCraft Burger Bar"
    ]
    
    # Initialize the DefaultEmbedding class with the desired parameters
    #embedding_model = Embedding(model_name="BAAI/bge-small-en", max_length=512)
    
    # Create Path Object
    p = Path(os.environ["PATH_TO_MODEL"])
    
    # Initialize the EmbeddingModel class from disk bge-small-en-v1.5
    embedding_model = LocalEmbedding(model_name="BAAI/bge-small-en-v1.5", path=p, max_length=512)
    
    # We'll use the passage_embed method to get the embeddings for the documents
    embeddings: List[numpy.ndarray] = list(
        embedding_model.passage_embed(documents)
    )  # notice that we are casting the generator to a list
    
    print(embeddings[0].shape, len(embeddings))

    query = "tacos"
    query_embedding = list(embedding_model.query_embed(query))[0]
    plain_query_embedding = list(embedding_model.embed(query))[0]
    
    def top_k(query_embedding, embeddings, documents, k=5):
        res = []
        # use numpy to calculate the cosine similarity between the query and the documents
        scores = np.dot(embeddings, query_embedding)
        # sort the scores in descending order
        sorted_scores = np.argsort(scores)[::-1]
        # print the top 5
        for i in range(k):
            #print(f"Rank {i+1}: {documents[sorted_scores[i]]} - source: {ids[sorted_scores[i]]}")
            print(f"Rank {i+1}: {ids[sorted_scores[i]]}")
            res.append(ids[sorted_scores[i]])
            
        return res
            
    result = top_k(query_embedding, embeddings, documents, k=3)
    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }
