import React, { useState, useEffect } from 'react';
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
import './SwipeCard.css'; 


let backendUrl = ""
if(process.env.NODE_ENV === "development") {
    backendUrl = import.meta.env.VITE_BACKEND_URL_DEV
} else {
    backendUrl = import.meta.env.VITE_BACKEND_URL_PROD
}

const topOfPage = () => {
    const navbar = document.getElementsByClassName('ui-page-parent')[0]
    navbar?.scrollIntoView({behavior: 'smooth'})
}

const GetLocation = ({coords, setCoords}) => {
    const userEmail = import.meta.env.REACT_APP_EMAIL;
    const [location, setLocation] = useState('')
    const [data, setData] = useState(null)

    const handleChange = (event) => {
        setLocation(event.target.value)
    }

    const fetchCoordinates = async (event) => {
        event.preventDefault();
        const formattedAddress = encodeURIComponent(location)
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${formattedAddress}`,
            {
                method: 'GET',
                headers: {
                    'User-Agent': `Foodfinder/1.0 (${userEmail})`, 
                },
            }
        );
        const data = await response.json();
        console.log(data)
        if(data && data.length > 0) {
            const {lat, lon } = data[0];
            setCoords([lat, lon]);
            console.log('New coords set:', [lat, lon]);
        } else {
            setCoords(null); 
        }
        topOfPage()

    }; 


      useEffect(() => {
        const fetchData = async () => {
            if (coords[0] !== null && coords[1] !== null) {
                try {
                    const response = await axios.get(backendUrl+`?latitude=${coords[0]}&longitude=${coords[1]}`);
                    setData(response.data);
                    console.log("Fetched data successfully:", response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        if (coords[0] !== null && coords[1] !== null) {
            fetchData();
        }
     }, [coords]);


   
    return(
        <div style={{maxHeight: "30%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: "20px"}}>
        <MapIcon sx={{fontSize: "72px", color: "#FB0000"}}/>
          <form onSubmit={fetchCoordinates} style={{display: "flex", flexDirection: "column", rowGap: "16px"}}>
          <Typography sx={{fontSize: "24px", color: "#FB0000"}}>We are unable to find your location</Typography>
           <TextField defaultValue="500 Castro St, Mountain View, CA, USA" label="Current Location" value={location} onChange={handleChange} id="margin-none" sx={{zIndex: 0}} />
            <Button type="submit" >Enter</Button>
          </form>
      </div>
    )

}



export default GetLocation; 


