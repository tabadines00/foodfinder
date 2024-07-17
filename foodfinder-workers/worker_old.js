/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
    async fetch(request, env, ctx) {
      const { searchParams} = new URL(request.url)
      let longitude = searchParams.get("longitude")
      let latitude = searchParams.get("latitude")
  
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.YELP_API_KEY
        }
      }
      if(latitude && longitude) {
        try {
          let res = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=food&categories=&price=1&price=2&price=3&price=4&sort_by=best_match&limit=50`, options)
          // Process the response data
          let data = await res.json()
          const simplifiedList = data.businesses.map(({ id, name, image_url, categories, rating, price, location }) => (
            { 
              id,
              name,
              image_url,
              categories: categories.map(category => category.title),
              rating,
              price,
              address: location.display_address.join(', ')
            }
          ))
          return new Response(JSON.stringify(simplifiedList))
        } catch (err) {
          console.error(err)
        }
    
        return new Response("Theres a lat and long but it failed")
      } else {
        return new Response("No lat long given")
      }
    }
  }