import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Navbar from '../../components/Navbar/Navbar';
import SwipeCard from '../../components/SwipeCard/SwipeCard'; 
import BottomBar from '../../components/BottomBar/BottomBar';
import Simple from '../../components/SwipeCard/Simple';

 

const UiPage = () => {

 return(
    <Container maxWidth={"sm"} alignItems="center" disableGutter={"true"} sx={{padding: "0 5px 0 5px"}}>
        <Navbar />
        <Simple />
        <BottomBar />
    </Container>
 )
}



export default UiPage; 
