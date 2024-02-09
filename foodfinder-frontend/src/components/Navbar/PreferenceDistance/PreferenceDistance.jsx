import React, { useState } from 'react';
import Typography from '@mui/material/Typography'; 
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch'; 


const PreferenceDistance = () => {
    const [switched, setSwitched] = useState(false)
    const handleSwitch = () => {
        setSwitched(!switched); 
}
    return (
        <div style={{display: "flex", flexDirection: "column",borderRadius: "11px", backgroundColor: "white", marginTop: '16px'}}>
            <div style={{display: "flex", 
                         padding: "24px 10px 12px 10px", 
                         flexDirection: "row", 
                         justifyContent: "space-between",
                         alignItems: "center", 
                         color: "#605656"
                         }}>
                <Typography sx={{fontSize: "16px"}}>Distance</Typography>
                <Switch onClick={handleSwitch} sx={{marginTop: "1px"}} ></Switch>
            </div>
            { switched && 
            <div style={{display: "flex",  paddingLeft: "40px", paddingBottom: "24px", }} >
            <Slider size="large"
                defaultValue={20}
                aria-label="Small"
                valueLabelDisplay="auto"
                max={50} 
                sx={{width: "50%"}}/>
                        
            </div>
            }
        </div>
    )
}


export default PreferenceDistance; 

/*
<Slider size="small"
 defaultValue={20}
aria-label="Small"
valueLabelDisplay="auto"
max={50}
*/

/*
!render ? '11%' : '21%'
*/