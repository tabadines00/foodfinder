import React from 'react';
import Typography from '@mui/material/Typography'; 
import Rating from '@mui/material/Rating'; 



const SwipeCardDesc = (props) => {
    const {Data} = props; 
console.log(Data.rating)


return (
    <div style={{position: "absolute", 
                 width: "100%", 
                 maxHeight: 90, 
                 bottom: '0%', 
                 borderRadius: '0 0 11px 11px', 
                 backgroundColor: 'white', 
                 color: "#808080",
                 padding: "10px",
                 boxSizing: "border-box",
                 boxShadow: '0px -10px 10px -10px rgba(0, 0, 0, 0.5)',
                  }}>

      <div style={{display: "flex", flexDirection: "row", }}> 
      <Rating name="read-only" value={Data.rating} percision={0.5} size="small" readOnly/>
    <Typography sx={{ display: Data.rating && Data.price ? "flex" : "none" ,fontSize: 32, lineHeight: 0, marginLeft: "7px"}}>.</Typography>
    <Typography sx={{fontSize: "14px", marginLeft:  "7px"}}>
     {Data.price} 
    </Typography>  
    </div>
    <div style={{display: "flex", flexDirection: "row", }}> 
    <Typography sx={{fontSize: "14px", marginLeft:  "0px"}}>
     {Data.address} 
    </Typography>
    </div>
    <div style={{display: "flex", flexDirection: "row", paddingBottom: 35}}>
    <Typography align='left' sx={{fontSize: "14px",}}>
       Categories: {Data.categories}
    </Typography>
    </div>
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