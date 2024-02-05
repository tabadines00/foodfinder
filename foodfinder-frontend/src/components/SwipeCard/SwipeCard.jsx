import React from 'react';
import TinderCard from 'react-tinder-card'
import Box from '@mui/material/Box'; 
import { Typography } from '@mui/material';



const SwipeCard = (props) => {
    console.log(props)
    const onSwipe = (direction) => {
        console.log('you swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + 'left the screen')
    }
   
   return (
    <Box height="80%" width="100%" borderRadius="11"> 
    
  {item.businesses.map((business) => (
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('Gone')} style={{borderRadius:"11"}}>
            <div style={{backgroundImage: `url(${business.image_url})`, 
                         backgroundRepeat: "no-repeat", 
                         backgroundSize: "cover", 
                         width: "100%", 
                         height: "100%", 
                         display: "flex", 
                         flexDirection:"column", 
                         alignItems: "flex-end",
                         borderRadius:"11"}}>
                <Box width="100%" height="10%">
                </Box>
                <Box width="100%" display="flex" flexDirection="column">
                 <Typography variant="h2" align='left' sx={{fontFamily: 'Mulish, sans-serif', color:"white"}}>
                        {business[0].alias}
                 </Typography>
                 <Typography variant="p" align='left' sx={{fontFamily: 'Mulish, sans-serif',  color:"white"}}>
                    {business[0].categories[0].title}
                    
                 </Typography>
                 <Typography variant="p" align='left' sx={{fontFamily: 'Mulish, sans-serif',  color:"white"}}>
                     {business[0].distance}
                 </Typography>
                </Box>
            </div>
        </TinderCard>
        ))
        }
    </Box>
            )
}


export default SwipeCard; 


/*
import React from 'react';
import TinderCard from 'react-tinder-card'
import Box from '@mui/material/Box'; 
import { Typography } from '@mui/material';



const SwipeCard = (data) => {
    const onSwipe = (direction) => {
        console.log('you swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + 'left the screen')
    }
   
   return (
    <Box height="80%" width="100%" borderRadius="11"> 
     {data.map((item) =>
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('Gone')} style={{borderRadius:"11"}}>
            <div style={{backgroundImage: `url(${item.image_url})`, 
                         backgroundRepeat: "no-repeat", 
                         backgroundSize: "cover", 
                         width: "100%", 
                         height: "100%", 
                         display: "flex", 
                         flexDirection:"column", 
                         alignItems: "flex-end",
                         borderRadius:"11"}}>
                <Box width="100%" height="10%">
                </Box>
                <Box width="100%" display="flex" flexDirection="column">
                 <Typography variant="h2" align='left' sx={{fontFamily: 'Mulish, sans-serif', color:"white"}}>
                        {item[0].alias}
                 </Typography>
                 <Typography variant="p" align='left' sx={{fontFamily: 'Mulish, sans-serif',  color:"white"}}>
                    {item[0].categories[0].title}
                    
                 </Typography>
                 <Typography variant="p" align='left' sx={{fontFamily: 'Mulish, sans-serif',  color:"white"}}>
                     {item[0].distance}
                 </Typography>
                </Box>
            </div>
        </TinderCard>
        )}
    </Box>
            )
}


export default SwipeCard; 


*/