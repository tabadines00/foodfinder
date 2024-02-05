import React, { useState, useEffect } from 'react'; 
import TinderCard from 'react-tinder-card'
import Box from '@mui/material/Box'; 
import { Typography } from '@mui/material';

import axios from 'axios'; 

const SwipeCard = () => {
    const onSwipe = (direction) => {
        console.log('you swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + 'left the screen')
    }

    const [data, setData] = useState([]); // Initialize state for the fetched data
    const [coords, setCoords] = useState([null, null])

    useEffect(() => {
        // Check for geolocation support and request user's location
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log('Latitude:', latitude);
                    console.log('Longitude:', longitude);
                    setCoords([latitude, longitude])
                    // Call fetchData with the obtained coordinates
                    //fetchData(longitude, latitude);
                },
                (error) => {
                console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported in this browser.');
        }
    }, []);

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/yelpdata?latitude=${coords[0]}&longitude=${coords[1]}`
                );
                setData(response.data); // Update the component's state with the fetched data
                console.log("success");
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if(coords) {
            fetchData()
        }
    }, [coords]);

    if(data) {
        return (
            <Box height="80%" width="100%" borderRadius="11"> 
                {
                data.map((business) => ( // Iterate over each business in the businesses array
                    <TinderCard key={business.id} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('Gone')} style={{borderRadius:"11"}}>
                        <div>
                            <h2>{business.name}</h2>
                            <img src={business.image_url} alt={business.name} />
                            {/*<p>{business.display_phone}</p>*/}
                            {/*<p>{business.location.address1} {business.location.city}</p>*/}
                            <p>{business.categories.join(', ')}</p>
                            {/*<p>{business.distance.toFixed(2)} meters away</p>*/}
                            {/* ... add any other details you want from the business object */}
                        </div>
                    </TinderCard>
                ))
                }
            </Box>
        )
    } else {
        return null;
    }
}


export default SwipeCard;


/*
import React from 'react';
import TinderCard from 'react-tinder-card'
import Box from '@mui/material/Box'; 
import { Typography } from '@mui/material';



const SwipeCard = (data) => {
    const onSwipe = (direction) => {
        console.log('you swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + 'left the screen')
    }
   
   return (
    <Box height="80%" width="100%" borderRadius="11"> 
     {data.map((item) =>
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('Gone')} style={{borderRadius:"11"}}>
            <div style={{backgroundImage: `url(${item.image_url})`, 
                         backgroundRepeat: "no-repeat", 
                         backgroundSize: "cover", 
                         width: "100%", 
                         height: "100%", 
                         display: "flex", 
                         flexDirection:"column", 
                         alignItems: "flex-end",
                         borderRadius:"11"}}>
                <Box width="100%" height="10%">
                </Box>
                <Box width="100%" display="flex" flexDirection="column">
                 <Typography variant="h2" align='left' sx={{fontFamily: 'Mulish, sans-serif', color:"white"}}>
                        {item[0].alias}
                 </Typography>
                 <Typography variant="p" align='left' sx={{fontFamily: 'Mulish, sans-serif',  color:"white"}}>
                    {item[0].categories[0].title}
                    
                 </Typography>
                 <Typography variant="p" align='left' sx={{fontFamily: 'Mulish, sans-serif',  color:"white"}}>
                     {item[0].distance}
                 </Typography>
                </Box>
            </div>
        </TinderCard>
        )}
    </Box>
            )
}


export default SwipeCard; 


*/