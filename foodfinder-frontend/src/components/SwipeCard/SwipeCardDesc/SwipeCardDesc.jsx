import React from 'react';
import Typography from '@mui/material/Typography'; 
import Rating from '@mui/material/Rating'; 
import { Button } from '@mui/material';

/* IMPLEMENT "Open in Google Maps?" */
const toGoogleMaps = (address) => {
    let mapUrl = ""
/*
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        console.log("This is an iOS device.");
        // mapUrl should look like "comgooglemaps://?daddr=John+F.+Kennedy+International+Airport,+Van+Wyck+Expressway,+Jamaica,+New+York"
        mapUrl = "comgooglemaps://maps.google.com/?daddr=" + address.replaceAll(" ", "+")
        // redirect to iosUrl to launch Google Maps
       */
    //} else {
    //    console.log("This is not an iOS device!");
        mapUrl = "https://www.google.com/maps/dir/?api=1&destination=" + address.replaceAll(" ", "+").replaceAll(",", "")
        // redirect to mapUrl for Google Maps in the Browser
    //}
    //window.location.assign(mapUrl)
    return mapUrl
}
    

const SwipeCardDesc = (props) => {
    const {Data} = props; 
    //console.log(Data.rating)
    let mapUrl = toGoogleMaps(Data.address)


return (
    <div style={{position: "absolute", 
                 width: "100%", 
                 maxHeight: "110px", 
                 bottom: '0%', 
                 borderRadius: '0 0 11px 11px', 
                 backgroundColor: 'white', 
                 color: "#808080",
                 padding: "10px",
                 paddingBottom: "25px",
                 boxSizing: "border-box",
                  }}>

      <div style={{display: "flex", flexDirection: "row"}}> 
        <Rating name="read-only" value={Data.rating} percision={0.5} size="small" readOnly/>
        <Typography sx={{ display: Data.rating && Data.price ? "flex" : "none" ,fontSize: 32, lineHeight: 0, marginLeft: "7px"}}>.</Typography>
            <Typography sx={{fontSize: "14px", marginLeft:  "7px"}}>
             {Data.price} 
            </Typography>  
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}> 
            <Typography sx={{width: "66%", fontSize: "14px", marginLeft:  "0px", textAlign: "left"}}>
            {Data.address} 
            </Typography>
            <Button style={{  }} className="pressable" variant="contained" href={mapUrl}>Maps</Button>
        </div>
        {/*<div style={{width: "66%", display: "flex", flexDirection: "row", paddingBottom: 35}}>
            <Typography align='left' sx={{fontSize: "14px",}}>
               Categories: {Data.categories.join(", ")}
            </Typography>
        </div>*/}
    </div>

)
}

export default SwipeCardDesc; 


/*
  <Typography align='left' sx={{fontSize: "14px",}}>
       Rating: {Data.rating}
    </Typography>

*/





/*

<Rating name="read-only" value={Data.rating} percision={0.5} size="small" readOnly sx={{top: 10, right: 115}}/>
    <Typography sx={{fontSize: 32, position: "absolute", bottom: 40, right: 222}}>.</Typography>
    <Typography sx={{fontSize: "14px", position: "relative", bottom: 15, right: 40}}>
     {Data.price} 
    </Typography>   
    <Typography align='left' sx={{fontSize: "14px",}}>
       Categories: {Data.categories}
    </Typography>

*/
