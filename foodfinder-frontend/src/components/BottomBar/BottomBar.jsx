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
        <Box bgcolor={"EEEEEE"} sx={{flexGrow: 1}}>
            <AppBar position='static'>
                <Toolbar>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default BottomBar; 