import React from 'react';
import Typography from '@mui/material/Typography'; 



const SwipeCardDesc = (props) => {
    const {Data} = props; 
console.log(Data.rating)


return (
    <div style={{position: "absolute", 
                 width: "100%", 
                 bottom: '0%', 
                 borderRadius: '0 0 11px 11px', 
                 backgroundColor: 'white', 
                 color: "#808080",
                 padding: "10px",
                 boxSizing: "border-box"}}>

    <Typography align='left' sx={{fontSize: "14px",}}>
      Price:  {Data.price}

    </Typography>
    <Typography align='left' sx={{fontSize: "14px",}}>
       Categories: {Data.categories}
    </Typography>
    <Typography align='left' sx={{fontSize: "14px",}}>
       Rating: {Data.rating}
    </Typography>
    

    </div>

)
}

export default SwipeCardDesc; 