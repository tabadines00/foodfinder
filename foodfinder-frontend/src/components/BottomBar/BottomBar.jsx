import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'; 
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const BottomBar = () => {
    return (
        <div style={{flexGrow: 1, width: "100%", height: "10%", maxWidth: "360px"}}>
            <AppBar position='static' sx={{backgroundColor: "#EEEEEE", borderRadius: "0 0 11px 11px", height: '100%'}}>
                <Toolbar>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default BottomBar; 