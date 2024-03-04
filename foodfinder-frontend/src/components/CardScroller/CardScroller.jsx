import React, {useState} from 'react';
import { useMyContext } from '../../Context';
import SwipeCardDesc from '../SwipeCard/SwipeCardDesc/SwipeCardDesc'
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import '../SwipeCard/SwipeCard.css'



const CardScroller = () => {
  const {items} = useMyContext(); 
  const [render, setRender] = useState(false); 
  
  const toggleRender = () => {
    setRender(prevState => !prevState);
  }; 

  const cards = [
    { id: 1, title: 'Card 1', description: 'This is card 1.' },
    { id: 2, title: 'Card 2', description: 'This is card 2.' },
    // Add more cards as needed
  ];

  return (
    <div style={{ display: 'flex', overflowX: 'auto', paddingTop: "20px", height: '100%', width: '100vw',}}>

        {items?.map((business) =>
<div style={{position: 'static',height: '80%',width: '100%', marginLeft: '20px',}}>
<div key={business.id} style={{ backgroundImage: `url(${business.image_url})`, minWidth: '300px'}} className='card'>
              <IconButton onClick={toggleRender} style={{position: "absolute", right: 0, bottom: !render ? '11%' : '21%', color: "white"}}><InfoIcon /></IconButton>
              {render && <SwipeCardDesc Data={business}/>}
            <h3 style={{color: "white", position: "absolute", fontSize: "20px", margin: "10px", bottom:  !render ? '10%' : '20%' , }}>{business.name}</h3>
                <p style={{color: "white", position: "absolute", fontSize: "12px", margin: "10px", bottom:  !render ? '8%' : '18%' }}>{business.categories.join(', ')}</p>
            </div>
            </div>
  )}
    </div>
  )}

export default CardScroller;






