import React, { useState, useEffect } from 'react';
import GetLocation from './GetLocation'; 
import Geolocation from 'react-native-geolocation-service';
import TinderCard from 'react-tinder-card';
import SwipeCardDesc from './SwipeCardDesc/SwipeCardDesc';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import Button from '@mui/material/Button'; 
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'; 
import TextField from '@mui/material/TextField'; 
import { useMyContext } from '../../Context'; 
import axios from 'axios';
import Navbar from '../Navbar/Navbar'; 
import './SwipeCard.css'; 


function Simple () {
    const {count, setCount, items, setItems, addItem} = useMyContext()
    const [lastDirection, setLastDirection] = useState()
    const [data, setData] = useState([]); // Initialize state for the fetched data
    const [coords, setCoords] = useState([null, null])
    const [yesChoice, setYesChoice] = useState([])
    const [render, setRender] = useState(false); 

    /* IMPLEMENT "Open in Google Maps?" *//*
    const toGoogleMaps = () => {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
          console.log("This is an iOS device.");
          // mapUrl should look like "comgooglemaps://?daddr=John+F.+Kennedy+International+Airport,+Van+Wyck+Expressway,+Jamaica,+New+York"
          mapUrl = "comgooglemaps://?daddr=" + business.address.replaceAll(" ", "+")
          // redirect to iosUrl to launch Google Maps
      } else {
          console.log("This is not an iOS device!");
          mapUrl = "https://www.google.com/maps/dir/?api=1&destination=" + business.address.replaceAll(" ", "+").replaceAll(",", "")
          // redirect to mapUrl for Google Maps in the Browser
      }
      window.location.assign(mapUrl)
    }
    */

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
            Geolocation.requestAuthorization('always'); 
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
        }
    }, []);
  
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    /*`https://10.0.0.158:3000*/
                    //`https://r65qphcnlh5nrxe6pmncjtuuu40ugjmq.lambda-url.us-west-1.on.aws?latitude=${coords[0]}&longitude=${coords[1]}`
                    `https://localhost:3000/api/yelpdata?latitude=${coords[0]}&longitude=${coords[1]}`
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
    const newFilteredData = data.filter(business => business.name !== nameToDelete);
    setData(newFilteredData);

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
      <div className='cardContainer' style={{display: "flex", justifyContent: "center", position:"relative", alignItems: "center", paddingBottom: "65px", marginLeft: "22px"}}>
        <GetLocation coords={coords} setCoords={setCoords} style={{ display: setCoords ? 'none' : 'block'}}/>
        {data?.map((business) =>
          <TinderCard className='swipe' key={business.id} onSwipe={(dir) => swiped(dir, business.name, business)} onCardLeftScreen={() => outOfFrame(business.name)} flickOnSwipe={true}  swipeRequirementType={'velocity'}  style={{width: "300px", height: "400px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <div style={{ backgroundImage: `url(${business.image_url})`}} className='card'>
              <IconButton onClick={toggleRender} style={{position: "absolute", right: 0, bottom: !render ? '11%' : '21%', color: "white", outline: "none"}}><InfoIcon /></IconButton>
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


