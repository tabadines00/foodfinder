import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Navbar from '../../components/Navbar/Navbar';
import SwipeCard from '../../components/SwipeCard/SwipeCard'; 
import BottomBar from '../../components/BottomBar/BottomBar';

 

const UiPage = () => {

    const [data, setData] = useState(null); // Initialize state for the fetched data

    useEffect(() => {
      // Fetch data when the component mounts
      const fetchData = async (longitude, latitude) => {
        try {
          const response = await axios.get(
            `https://api.yelp.com/v3/businesses/search?latitude=60}&longitude=70&term=restaurants&radius=8045&categories=french&categories=bars&sort_by=distance&limit=50`
            //`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=restaurants&radius=8045&categories=french&categories=bars&sort_by=distance&limit=50`
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
