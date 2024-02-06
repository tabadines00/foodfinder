import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'; 
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
    //boxShadow: "none"
    return (
        <div  style={{flexGrow: 1, width: "100%", height: "7%", maxWidth: "360px",}}>
            <AppBar position='static' sx={{backgroundColor: "#EEEEEE", borderRadius: "11px 11px 0 0", width: "100%", height: "100%", boxShadow: "none"}}>
                <Toolbar>
                    <Typography variant="h6" align={"left"} component="div" sx={{flexGrow: 1, fontFamily:'Philosopher, sans-serif', color:"#FB0000"}}>
                        FoodFinder
                    </Typography>
                    <IconButton size="large" edge="end" align={"right"} color="#605656" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar; 