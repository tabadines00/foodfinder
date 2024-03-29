const fs = require('fs');
const https = require('https');
const express = require('express');
const { spawn } = require('child_process');
const axios = require('axios');
const cors = require('cors');
const sdk = require('api')('@yelp-developers/v1.0#8e0h2zlqcimwm0');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup');

const app = express();
const PORT = process.env.PORT || 3000; // Define your preferred port

//new
const certOptions = {
  key: fs.readFileSync('./localhost+2-key.pem'),
  cert: fs.readFileSync('./localhost+2.pem')
};




app.use(cors()); // Enable CORS for your frontend


app.get('/', (req, res) => {
  res.send('Welcome to my backend server!');
});



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
      // Create a new object to send to the frontend
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

app.get('/recommendations', (req, res) => {
  const pythonProcess = spawn('python', ['cluster2.py'])

  pythonProcess.stdout.on('data', (data) => {
    res.send(data.toString())
  })
  pythonProcess.stderr.on('data', (data) => {
    res.status(500).send(data.toString())
  })

})




/*
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/



// OAuth login protocol

//mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true });

app.use(cookieSession({
  //standard formula for calculating a day ms 
  maxAge: 24 * 60 * 60 * 1000, 
  keys: [process.env.SESSION_SECRET]
})); 


app.use(passport.initialize()); 
app.use(passport.session()); 

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}))      //passport

app.get('auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
function(req, res) {
  res,redirect('/'); 
}
);


app.get('/logout', (req, res) => {
  req.session = null;
  req.logout(); 
  res.redirect('/')
})








app.post('/geocode', async (req, res) => {
  const { address } = req.body; // Assume address is sent in the request body
  if (!address) {
      return res.status(400).send({ error: 'Address is required' });
  }

  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'User-Agent': 'YourApp/1.0 (YourContactEmailAddress)', // Replace with your app name and contact email
          },
      });
      const data = await response.json();

      if (data.length > 0) {
          // Just return the first result for simplicity
          const { lat, lon } = data[0];
          res.send({ latitude: lat, longitude: lon });
      } else {
          res.status(404).send({ error: 'No results found' });
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send({ error: 'Failed to fetch data' });
  }
});












https.createServer(certOptions, app).listen(3000, () => {
  console.log('Server listening on https://localhost:3000');
});





