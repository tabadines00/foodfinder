import React from 'react'; 
import axios from 'axios'; 
import { Container } from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Navbar from '../../components/Navbar/Navbar';
import BottomBar from '../../components/BottomBar/BottomBar';

const fetchData = async (longitude, latitude) => {
const response = await axios.get("https://api.yelp.com/v3/businesses/search?latitude=90&longitude=180&term=restaurants&radius=8045&categories=french&categories=bars&sort_by=distance&limit=50");
return response.data
}


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
