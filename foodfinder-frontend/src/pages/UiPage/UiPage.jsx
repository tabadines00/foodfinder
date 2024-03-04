import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Navbar from '../../components/Navbar/Navbar';
//import SwipeCard from '../../components/SwipeCard/SwipeCard'; 
import BottomBar from '../../components/BottomBar/BottomBar';
import Simple from '../../components/SwipeCard/Simple';
import { MyProvider } from '../../Context'; 
import './UPage.css'

 

const UiPage = () => {


 return(
    <MyProvider> 
   <div style={{ width: "100%", maxWidth: "450px", display: "flex", justifyContent: "center", alignItems: "center",}}> 
     <div style={{ maxWidth: "450px", width: '100%', height: "100vh",  overflow: "hidden",}} className="ui-page-parent"> 
        <Navbar/>
        <Simple />
      </div>
   </div>
    </MyProvider>
 )
}



export default UiPage; 


/*     <Container maxWidth={"450px"} height={"100vh"} alignItems="center"  className="ui-page-parent" sx={{overflow: "hidden", }} >*/