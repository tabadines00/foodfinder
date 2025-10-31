interface Category {
  title: string;
}

interface Location {
  display_address: string[];
}

interface Business {
  id: string;
  name: string;
  image_url: string;
  categories: Category[];
  rating: number;
  price: string;
  location: Location;
}

interface ApiResponse {
  businesses: Business[];
}

interface Modifier {
  coffee: boolean,
  vegan: boolean,
  halal: boolean,
  search: string
}

function modifierFactory(modifier?: Modifier): string {
  let terms = "term=food"
  let categories = "categories=restaurants"

  if (modifier?.coffee) {
    terms = "term=coffee"
    categories = "categories=food"
  }
  if (modifier?.vegan) {
    terms = "term=vegan"
    categories += ",vegan"
  }
  if (modifier?.halal) {
    terms = "term=halal"
    categories += ",halal"
  }
  if(modifier?.search) {
    terms = "term=" + modifier.search
  }
  return terms + "&" + categories
}

export const fetchYelpData = async (latitude: string, longitude: string, yelpApiKey: string, modifier?: Modifier): Promise<any> => {
  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: yelpApiKey
      }
  };

  if(latitude && longitude) {
        let simplifiedList: any[] = []
      try {
          console.log(yelpApiKey)

          let terms = modifierFactory(modifier)
          
          let res = await fetch(`https://api.yelp.com/v3/businesses/search?open_now=true&sort_by=distance&latitude=${latitude}&longitude=${longitude}&${terms}&limit=50`, options);
          let data: ApiResponse = await res.json();
            console.log(data)
            console.log("latitude = " + latitude + " longitude = " + longitude)
          simplifiedList = await data.businesses?.map(({ id, name, image_url, categories, rating, price, location }) => (
              { 
                  id,
                  name,
                  image_url,
                  categories: categories.map(category => category.title),
                  rating,
                  price,
                  address: location.display_address.join(', ')
              }
          ));
      } catch (err: unknown) {
          console.error(err);
          return new Response("Internal Server Error", { status: 500 });
      } finally {
            return simplifiedList
      }
  } else {
      return new Response("No latitude and longitude provided", {
          status: 400
      });
  }
}


// export const getPost = async (KV: KVNamespace, id: string): Promise<Post | undefined> => {
//   const value = await KV.get(generateID(id))
//   if (!value) return
//   const post: Post = JSON.parse(value)
//   return post
// }

// export const createPost = async (KV: KVNamespace, param: Param): Promise<Post | undefined> => {
//   if (!(param && param.title && param.body)) return
//   const id = crypto.randomUUID()
//   const newPost: Post = { id: id, title: param.title, body: param.body }
//   await KV.put(generateID(id), JSON.stringify(newPost))
//   return newPost
// }

// export const updatePost = async (KV: KVNamespace, id: string, param: Param): Promise<boolean> => {
//   if (!(param && param.title && param.body)) return false
//   const post = await getPost(KV, id)
//   if (!post) return false
//   post.title = param.title
//   post.body = param.body
//   await KV.put(generateID(id), JSON.stringify(post))
//   return true
// }

// export const deletePost = async (KV: KVNamespace, id: string): Promise<boolean> => {
//   const post = await getPost(KV, id)
//   if (!post) return false
//   await KV.delete(generateID(id))
//   return true
// }
