import React from 'react';
import TinderCard from './react-tinder-card'




const SwipeCard = () => {
    const onSwipe = (direction) => {
        console.log('you swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + 'left the screen')
    }
   
   return (
    <div>
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('Gone')} />
    </div>
            )
}


export default SwipeCard; 