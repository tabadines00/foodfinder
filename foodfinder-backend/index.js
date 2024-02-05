const express = require('express');
const axios = require('axios');
const cors = require('cors');
const sdk = require('api')('@yelp-developers/v1.0#8e0h2zlqcimwm0');

const app = express();
const PORT = process.env.PORT || 3000; // Define your preferred port


app.use(cors()); // Enable CORS for your frontend

app.get('/api/yelpdata', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    sdk.auth(process.env.YELP_API_KEY);
    sdk.v3_business_search({
      latitude: latitude,
      longitude: longitude,
      open_now: 'true',
      sort_by: 'distance',
      limit: '20'
    })
    .then(({ data }) => {
      const simplifiedList = data.businesses.map(({ name, categories }) => (
        { name,
          categories: categories.map(category => category.title) }
      ));
      console.log(JSON.stringify(simplifiedList))
      // Send the Yelp API response to your frontend
      res.json(simplifiedList);
      console.log("success")
    })
    .catch(err => console.error(err));
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
