const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Define your preferred port

app.use(cors()); // Enable CORS for your frontend

app.get('/api/yelpdata', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // Make a request to the Yelp API using Axios or any other HTTP library
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search`,
      {
        params: {
          latitude,
          longitude,
          term: 'restaurants',
          radius: 8045,
          categories: 'french,bars',
          sort_by: 'distance',
          limit: 50,
        },
        headers: {
          Authorization: 'YELP_API_KEY',
        },
      }
    );

    // Send the Yelp API response to your frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
