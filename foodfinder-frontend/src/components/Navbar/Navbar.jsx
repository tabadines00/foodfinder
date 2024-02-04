import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'; 
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
    return (
        <Box bgcolor={"EEEEEE"} sx={{flexGrow: 1,}}>
            <AppBar position='static' >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, fontFamily:'Philosopher, sans-serif', color:"FB0000"}}>
                        FoodFinder
                    </Typography>
                    <IconButton size="large" edge="start" color="605656" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar; 