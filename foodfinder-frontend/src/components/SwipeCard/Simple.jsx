import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import SwipeCardDesc from './SwipeCardDesc/SwipeCardDesc'
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { useMyContext } from '../../Context'; 
import axios from 'axios'
import './SwipeCard.css'; 


function Simple () {
    const {count, setCount, items, setItems, addItem} = useMyContext()
    const [lastDirection, setLastDirection] = useState()
    const [data, setData] = useState([]); // Initialize state for the fetched data
    const [coords, setCoords] = useState([null, null])
    const [yesChoice, setYesChoice] = useState([])
    const [render, setRender] = useState(false); 


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
                    /*`https://10.0.0.158:3000*/
                       `https://localhost:3000/api/yelpdata?latitude=${coords[0]}&longitude=${coords[1]}`
                    //`https://localhost:3000/api/yelpdata?latitude=${coords[0]}&longitude=${coords[1]}`
                );
                setData(response.data); // Update the component's state with the fetched data
                console.log("success");
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if(coords[0]) {
            fetchData()
        }
    }, [coords]);


  const swiped = (direction, nameToDelete, business) => {
    if (direction === 'right') {
     
      setCount(prevCount => prevCount + 1);
      addItem(business)
      console.log(items)
      if (items.length === 50) {

        //send The copy array to the backend
        sendToBackend(items)
        
        //reset yes choice to an empty array
        setItems([]); 
    }
      
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }
}

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const sendToBackend = (choices) => {
    axios.post('https://localhost:3000/api/sendChoices', { choices })
      .then((response) => {
        console.log('choices sent successfully', response.data)
      })
      .catch((error) => {
        console.log('error sending choices', error)
      })
  }

  const toggleRender = () => {
    setRender(prevState => !prevState);
  }; 

  return (
      <div className='cardContainer' style={{margin: 0}}>
        {data?.map((business) =>
          <TinderCard className='swipe' key={business.id} onSwipe={(dir) => swiped(dir, business.name, business)} onCardLeftScreen={() => outOfFrame(business.name)} style={{maxWidth: "100%",}}>
            <div style={{ backgroundImage: `url(${business.image_url})`}} className='card'>
              <IconButton onClick={toggleRender} style={{position: "absolute", right: 0, bottom: !render ? '11%' : '21%', color: "white"}}><InfoIcon /></IconButton>
              {render && <SwipeCardDesc Data={business}/>}
            <h3 style={{color: "white", position: "absolute", fontSize: "20px", margin: "10px", bottom:  !render ? '10%' : '20%' , }}>{business.name}</h3>
                <p style={{position: "absolute", fontSize: "12px", margin: "10px", bottom:  !render ? '8%' : '18%' }}>{business.categories.join(', ')}</p>
            </div>
          </TinderCard>
        )}
      </div>

   
  )
}

export default Simple;  


