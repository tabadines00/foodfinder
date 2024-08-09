import React, { useState, useEffect } from 'react';
import GetLocation from './GetLocation'; 
import Geolocation from 'react-native-geolocation-service';
import TinderCard from 'react-tinder-card';
import SwipeCardDesc from './SwipeCardDesc/SwipeCardDesc';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import FastfoodIcon from '@mui/icons-material/Fastfood'
import Button from '@mui/material/Button'; 
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'; 
import TextField from '@mui/material/TextField'; 
import { useMyContext } from '../../Context'; 
import axios from 'axios';
import Navbar from '../Navbar/Navbar'; 
import './SwipeCard.css'; 
import './tutorial.css';
import SwipeInfo from './SwipeInfo';

import SwipeIcon from '@mui/icons-material/SwipeRightRounded';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import DoNotDisturbRoundedIcon from '@mui/icons-material/DoNotDisturbRounded';
import RamenDiningRoundedIcon from '@mui/icons-material/RamenDiningRounded';


import responsetest from "./testdata.json" //////////////////////////////////////////////////////////////////////////
import { BorderColor } from '@mui/icons-material';
console.log(responsetest)


let backendUrl = ""
if(process.env.NODE_ENV === "development") {
    backendUrl = import.meta.env.VITE_BACKEND_URL_DEV
} else {
    backendUrl = import.meta.env.VITE_BACKEND_URL_PROD
}

function Simple (props) {
    const {count, setCount, items, setItems, addItem} = useMyContext()
    const [lastDirection, setLastDirection] = useState()
    const [data, setData] = useState([]); // Initialize state for the fetched data
    const [coords, setCoords] = useState([null, null])
    const [yesChoice, setYesChoice] = useState([])
    const [render, setRender] = useState(true); 

    const { setMenuOpen, preferences } = props

    let dev = false ////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        // Check for geolocation support and request user's location
        if(!dev){ ///////////////////////////////////////////////////////////////////////////////
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
        } else { ////////////////////////////////////////////////////////////
          setCoords([-1,-1])
          console.log("Using test coords... ")
        }
    }, []);
  
    useEffect(() => {
        // Fetch data when the component mounts
        console.log("mount!")
        console.log(preferences)
        console.log(data)
        const fetchData = async () => {
            console.log("trying to fetch...")
            try {
                if (!dev) { ////////////////////////////////////////////////////////////
                  let terms = ""
                  if (preferences.coffee) {
                    terms += "&coffee=true"
                  }
                  if (preferences.vegan) {
                    terms += "&vegan=true"
                  }
                  if (preferences.halal) {
                    terms += "&halal=true"
                  }
                  const response = await axios.get(
                      backendUrl + `locallist?latitude=${coords[0]}&longitude=${coords[1]}${terms}`
                  );
                  setData(response.data.reverse()); // Update the component's state with the fetched data
                  console.log("success"+backendUrl);
                  response.data.map((el) => console.log(el.name))
                } /////////////////////////////////////////////////////////////////////////
                else {
                    console.log("trying to set test data!")
                    setData(responsetest.reverse())
                    console.log("set test data!")
                    responsetest.map((el) => console.log(el.name))
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if(coords[0] && data.length == 0) {
            fetchData()
        }
    }, [coords, preferences]);


  const swiped = (direction, nameToDelete, business, info) => {
    const newFilteredData = data.filter(business => business.name !== nameToDelete);
    setData(newFilteredData);

    if (direction === 'right' && !info) {
     
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
    axios.post(backendUrl + 'api/sendChoices', { choices })
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
      <div className='cardContainer' style={{display: "flex", justifyContent: "center", position:"relative", alignItems: "center", paddingBottom: "22%", marginLeft: "22px"}}>
       { !coords[0] && !coords[1] && <GetLocation coords={coords} setCoords={setCoords} /> }

        {coords[0]  && <div style={{justifyContent: "center", position:"relative", alignItems: "center"}}>
            <FastfoodIcon sx={{fontSize: "72px", color: "#FB0000"}}/>
            <Typography sx={{fontSize: "24px", color: "#FB0000", margin: "8px"}}>
             Like it so far?
            </Typography>
            <Typography sx={{fontSize: "16px", color: "#808080", marginBottom:  "1em"}}>
             Join the waitlist for more features!
            </Typography>
            <Button onClick={() => {setMenuOpen(true)}} className="pressable" variant="outlined">JOIN</Button>
        </div>}

        {data?.map((business) => 
          <TinderCard className='swipe' key={business.id} onSwipe={(dir) => swiped(dir, business.name, business)} onCardLeftScreen={() => outOfFrame(business.name)} flickOnSwipe={true}  swipeRequirementType={'velocity'}  style={{ backgroundColor: "rgba(0, 0, 0, .3)", width: "300px", height: "500px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            
              <div style={{  backgroundImage: `url(${business.image_url})`}} className='card'>
              <div className='cardbg'>
                {/*<IconButton onClick={toggleRender} style={{position: "absolute", right: 0, bottom: !render ? '11%' : '21%', color: "white", outline: "none"}}><InfoIcon /></IconButton>*/}
                {/*render &&*/ <SwipeCardDesc Data={business}/>}
              <h3 style={{ color: "white", textAlign: "left", position: "absolute", fontSize: "20px", margin: "10px", bottom:  !render ? '10%' : '20%' , }}>{business.name}</h3>
                  <p style={{ position: "absolute", fontSize: "14px", textAlign: "left", marginTop: "100px", margin: "10px", bottom:  !render ? '8%' : '17%' }}>{business.categories.join(', ')}</p>
              </div>
              </div>
          </TinderCard> 
        )}
        <TinderCard className='swipe' key={-1} onSwipe={(dir) => swiped(dir, "", "", true)} onCardLeftScreen={() => outOfFrame()} flickOnSwipe={true}  swipeRequirementType={'velocity'}  style={{ width: "300px", height: "500px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <div className='card' style={{ border: "2px solid", borderColor:"#FB0000", backgroundColor: "#FFFFFFBB", WebkitBackdropFilter: "blur(3px)", backdropFilter: "blur(10px)", display: "flex", flexDirection: "column", justifyContent: "center"}}>
              {/* <h3 style={{color: "grey", textAlign: "center", fontSize: "20px", margin: "8px" }}>
                All of these restauraunts are open now!
              </h3> */}
              <div style={{ margin: "0 auto" }}>
                <div style={{display: "flex", flexDirection:"row"}}>
                  <RamenDiningRoundedIcon style={{ color: "grey", fontSize: "24px", textAlign: "left", margin: "8px" }}/>
                  <p style={{ color: "grey", fontSize: "16px", textAlign: "left", margin: "8px" }}>
                    Restauraunts are open now
                  </p>
                </div>
                <div style={{display: "flex", flexDirection:"row"}}>
                  <PersonPinCircleRoundedIcon style={{ color: "grey", fontSize: "24px", textAlign: "left", margin: "8px" }}/>
                  <p style={{ color: "grey", fontSize: "16px", textAlign: "left", margin: "8px" }}>
                  Sorted by distance
                  </p>
                </div>
                <div style={{display: "flex", flexDirection:"row"}}>
                  <DoNotDisturbRoundedIcon style={{ color: "#FB0000", fontSize: "24px", textAlign: "left", margin: "8px" }}/> 
                  <p style={{ color: "#FB0000", fontSize: "16px", textAlign: "left", margin: "8px" }}>
                  Swipe left to discard...
                  </p>
                </div>
                <div style={{display: "flex", flexDirection:"row"}}>
                  <LibraryAddRoundedIcon style={{ color: "#00691f", fontSize: "24px", textAlign: "left", margin: "8px" }}/>
                  <p style={{ color: "#00691f", fontSize: "16px", textAlign: "left", margin: "8px" }}>
                  Swipe right to keep for later
                  </p>
                </div>
              </div>
              <div id="wrapper">
                  <div id="innerwrapper">
                      <span id="move">
                        <SwipeIcon sx={{fontSize: "72px", color: "grey"}}/>
                      </span>
                  </div>
              </div>
              <p style={{ color: "grey", fontSize: "16px", textAlign: "center", margin: "8px" }}>
                Swipe!
              </p>
              <br />
              <p style={{ color: "grey", fontSize: "16px", textAlign: "center", margin: "8px" }}>
                Stay in touch!
              </p>
              <div style={{display: 'flex', justifyContent: "center"}}>
                <Button onClick={() => {setMenuOpen(true)}} style={{ maxWidth: "fit-content"}} className="pressable" variant="outlined">JOIN THE WAITLIST</Button>
              </div>
            </div>
          </TinderCard> 
      </div>

   
  )
}

export default Simple


