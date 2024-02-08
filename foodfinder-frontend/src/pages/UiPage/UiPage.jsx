import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Navbar from '../../components/Navbar/Navbar';
import SwipeCard from '../../components/SwipeCard/SwipeCard'; 
import BottomBar from '../../components/BottomBar/BottomBar';
import Simple from '../../components/SwipeCard/Simple';
import './UPage.css'

 

const UiPage = () => {


 return(
    <Container maxWidth={"360px"} height={"100vh"} alignItems="center"  className="ui-page-parent" sx={{overflow: "hidden"}} >
        <Navbar/>
        <Simple />
        <BottomBar />
    </Container>
 )
}



export default UiPage; 
