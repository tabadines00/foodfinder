import React from 'react';
import TinderCard from 'react-tinder-card'
import Box from '@mui/material/Box'; 
import { Typography } from '@mui/material';



const SwipeCard = ({data}) => {
    console.log(data)
    const onSwipe = (direction) => {
        console.log('you swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + 'left the screen')
    }
   
   return (
    <Box height="80%" width="100%" borderRadius="11"> 
    {
  data.map((group) => ( // Iterate over each group in the data array
    group.businesses.map((business) => ( // Iterate over each business in the businesses array
    <TinderCard key={business.id} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('Gone')} style={{borderRadius:"11"}}>
      <div > // Use business.id as the key for each item
        <h2>{business.name}</h2>
        <img src={business.image_url} alt={business.name} />
        <p>{business.display_phone}</p>
        <p>{business.location.address1} {business.location.city}</p>
        <p>{business.categories.map(category => category.title).join(', ')}</p>
        <p>{business.distance.toFixed(2)} meters away</p>
        {/* ... add any other details you want from the business object */}
      </div>
     </TinderCard>
    ))
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