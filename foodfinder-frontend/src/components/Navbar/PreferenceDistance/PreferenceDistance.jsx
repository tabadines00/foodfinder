import React, { useState } from 'react';
import Typography from '@mui/material/Typography'; 
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch'; 


const PreferenceDistance = (props) => {
    const { preferences, setPreferences } = props

    const handleSwitch = (pref) => {
        let newPreferences = preferences
        newPreferences[pref] = !preferences[pref]
        setPreferences(newPreferences); 
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
                <Typography sx={{fontSize: "16px"}}>Coffee Only</Typography>
                <Switch onClick={handleSwitch("coffee")} sx={{marginTop: "1px"}} ></Switch>
            </div>
            <div style={{display: "flex", 
                         padding: "24px 10px 12px 10px", 
                         flexDirection: "row", 
                         justifyContent: "space-between",
                         alignItems: "center", 
                         color: "#605656"
                         }}>
                <Typography sx={{fontSize: "16px"}}>Vegan</Typography>
                <Switch onClick={handleSwitch("vegan")} sx={{marginTop: "1px"}} ></Switch>
            </div>
            <div style={{display: "flex", 
                         padding: "24px 10px 12px 10px", 
                         flexDirection: "row", 
                         justifyContent: "space-between",
                         alignItems: "center", 
                         color: "#605656"
                         }}>
                <Typography sx={{fontSize: "16px"}}>Halal</Typography>
                <Switch onClick={handleSwitch("halal")} sx={{marginTop: "1px"}} ></Switch>
            </div>
            {/* switched && 
            <div style={{display: "flex",  paddingLeft: "40px", paddingBottom: "24px", }} >
            <Slider size="large"
                defaultValue={20}
                aria-label="Small"
                valueLabelDisplay="auto"
                max={50} 
                sx={{width: "50%"}}/>
                        
            </div>
            */}
        </div>
    )
}


export default PreferenceDistance; 