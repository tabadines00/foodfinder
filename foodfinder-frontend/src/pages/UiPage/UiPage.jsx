import React from 'react'; 
import { Container } from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Navbar from '../../components/Navbar/Navbar';
import BottomBar from '../../components/BottomBar/BottomBar';




const UiPage = () => {

 return(
    <Container maxWidth={"sm"} alignItems="center" disableGutter={"true"} sx={{padding: "0 5px 0 5px"}}>
        <Navbar />
        <SwipeCard data={data}/>
        <BottomBar />
    </Container>
 )
}



export default UiPage; 
