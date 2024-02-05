import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Navbar from '../../components/Navbar/Navbar';
import SwipeCard from '../../components/SwipeCard/SwipeCard'; 
import BottomBar from '../../components/BottomBar/BottomBar';

 

const UiPage = () => {

    const [data, setData] = useState([{
      "businesses": [
        {
          "alias": "golden-boy-pizza-hamburg",
          "categories": [
            {
              "alias": "pizza",
              "title": "Pizza"
            },
            {
              "alias": "food",
              "title": "Food"
            }
          ],
          "coordinates": {
            "latitude": 41.7873382568359,
            "longitude": -123.051551818848
          },
          "display_phone": "(415) 982-9738",
          "distance": 4992.437696561071,
          "id": "QPOI0dYeAl3U8iPM_IYWnA",
          "image_url": "https://yelp-photos.yelpcorp.com/bphoto/b0mx7p6x9Z1ivb8yzaU3dg/o.jpg",
          "is_closed": true,
          "location": {
            "address1": "James",
            "address2": "Street",
            "address3": "68M",
            "city": "Los Angeles",
            "country": "US",
            "display_address": [
              "James",
              "Street",
              "68M",
              "Los Angeles, CA 22399"
            ],
            "state": "CA",
            "zip_code": "22399"
          },
          "name": "Golden Boy Pizza",
          "phone": "+14159829738",
          "price": "$",
          "rating": 4,
          "review_count": 903,
          "transactions": [
            "restaurant_reservation"
          ],
          "url": "https://www.yelp.com/biz/golden-boy-pizza-hamburg?adjust_creative=XsIsNkqpLmHqfJ51zfRn3A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=XsIsNkqpLmHqfJ51zfRn3A"
        }
      ],
      "region": {
        "center": {
          "latitude": 37.76089938976322,
          "longitude": -122.43644714355469
        }
      },
      "total": 6800
    }, {
      "businesses": [
        {
          "alias": "golden-boy-pizza-hamburg",
          "categories": [
            {
              "alias": "pizza",
              "title": "Pizza"
            },
            {
              "alias": "food",
              "title": "Food"
            }
          ],
          "coordinates": {
            "latitude": 41.7873382568359,
            "longitude": -123.051551818848
          },
          "display_phone": "(415) 982-9738",
          "distance": 4992.437696561071,
          "id": "QPOI0dYeAl3U8iPM_IYWnA",
          "image_url": "https://yelp-photos.yelpcorp.com/bphoto/b0mx7p6x9Z1ivb8yzaU3dg/o.jpg",
          "is_closed": true,
          "location": {
            "address1": "James",
            "address2": "Street",
            "address3": "68M",
            "city": "Los Angeles",
            "country": "US",
            "display_address": [
              "James",
              "Street",
              "68M",
              "Los Angeles, CA 22399"
            ],
            "state": "CA",
            "zip_code": "22399"
          },
          "name": "Golden Boy Pizza",
          "phone": "+14159829738",
          "price": "$",
          "rating": 4,
          "review_count": 903,
          "transactions": [
            "restaurant_reservation"
          ],
          "url": "https://www.yelp.com/biz/golden-boy-pizza-hamburg?adjust_creative=XsIsNkqpLmHqfJ51zfRn3A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=XsIsNkqpLmHqfJ51zfRn3A"
        }
      ],
      "region": {
        "center": {
          "latitude": 37.76089938976322,
          "longitude": -122.43644714355469
        }
      },
      "total": 6800
    }]); // Initialize state for the fetched data

    useEffect(() => {
      // Fetch data when the component mounts
      const fetchData = async (longitude, latitude) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/yelpdata?latitude=${latitude}&longitude=${longitude}`
          );
          setData(response.data); // Update the component's state with the fetched data
          console.log("success")
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Check for geolocation support and request user's location
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
            // Call fetchData with the obtained coordinates
            fetchData(longitude, latitude);
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported in this browser.');
      }
    }, []);
    
   
 return(
    <Container maxWidth={"sm"} alignItems="center" disableGutter={"true"} sx={{padding: "0 5px 0 5px"}}>
        <Navbar />
        <SwipeCard data={data}/>
        <BottomBar />
    </Container>
 )
}



export default UiPage; 
