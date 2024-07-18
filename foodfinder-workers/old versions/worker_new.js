const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

async function fetchYelpData(request, env) {
  const { searchParams} = new URL(request.url);
  let longitude = searchParams.get("longitude");
  let latitude = searchParams.get("latitude");

  const yelpApiKey = await YELP_API_KEY

  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: yelpApiKey
      }
  };

  if(latitude && longitude) {
      try {
          let res = await fetch(`https://api.yelp.com/v3/businesses/search?open_now=true&sort_by=distance&latitude=${latitude}&longitude=${longitude}&term=food&categories=restaurants&limit=50`, options);
          let data = await res.json();
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
          ));
          return new Response(JSON.stringify(simplifiedList), {
              headers: {
                  ...corsHeaders,
                  "Content-Type": "application/json"
              }
          });
      } catch (err) {
          console.error(err);
          return new Response("Internal Server Error", { status: 500 });
      }
  } else {
      return new Response("No latitude and longitude provided", {
          headers: corsHeaders,
          status: 400
      });
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(
      handleRequest(event.request).catch(
          (err) => new Response(err.stack, { status: 500 })
      )
  );
});

async function handleRequest(request) {
  let response;
  if (request.method === "OPTIONS") {
      response = handleOptions(request);
  } else {
      response = await fetchYelpData(request);
  }
  return response;
}

function handleOptions(request) {
  let headers = request.headers;
  if (
      headers.get("Origin") !== null &&
      headers.get("Access-Control-Request-Method") !== null &&
      headers.get("Access-Control-Request-Headers") !== null
  ) {
      let respHeaders = {
          ...corsHeaders,
          "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers"),
      };
      return new Response(null, {
          headers: respHeaders,
      });
  } else {
      return new Response(null, {
          headers: {
              Allow: "GET, HEAD, POST, OPTIONS",
          },
      });
  }
}

