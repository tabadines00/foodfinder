import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import axios from 'axios'
import './SwipeCard.css'; 


function Simple () {
    const [lastDirection, setLastDirection] = useState()
    const [data, setData] = useState([]); // Initialize state for the fetched data
    const [coords, setCoords] = useState([null, null])
    const [yesChoice, setYesChoice] = useState([])

    useEffect(() => {
        // Check for geolocation support and request user's location
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log('Latitude:', latitude);
                    console.log('Longitude:', longitude);
                    setCoords([latitude, longitude])
                    // Call fetchData with the obtained coordinates
                    //fetchData(longitude, latitude);
                },
                (error) => {
                console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported in this browser.');
        }
    }, []);

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/yelpdata?latitude=${coords[0]}&longitude=${coords[1]}`
                );
                setData(response.data); // Update the component's state with the fetched data
                console.log("success");
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if(coords[0]) {
            fetchData()
        }
    }, [coords]);


  const swiped = (direction, nameToDelete, business) => {
    if (direction === 'right') {
      const updatedYesChoice = [yesChoice, business]
      setYesChoice(updatedYesChoice)
      //if The array has 50 objects
      if (updatedYesChoice.length === 50) {

        //send The copy array to the backend
        sendToBackend(updatedYesChoice)
        
        //reset yes choice to an empty array
        setYesChoice = ([]); 

    }
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }
}

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const sendToBackend = (choices) => {
    axios.post('http://localhost:3000/api/sendChoices', { choices })
      .then((response) => {
        console.log('choices sent successfully', response.data)
      })
      .catch((error) => {
        console.log('error sending choices', error)
      })
  }

  return (
      <div className='cardContainer'>
        {data?.map((business) =>
          <TinderCard className='swipe' key={business.id} onSwipe={(dir) => swiped(dir, business.name, business)} onCardLeftScreen={() => outOfFrame(business.name)} style={{maxWidth: "100%"}}>
            <div style={{ backgroundImage: `url(${business.image_url})`}} className='card'>
            <h3>{business.name}</h3>
                {/*<p>{business.display_phone}</p>*/}
                {/*<p>{business.location.address1} {business.location.city}</p>*/}
                <p>{business.categories.join(', ')}</p>
                {/*<p>{business.distance.toFixed(2)} meters away</p>*/}
                {/* ... add any other details you want from the business object */}
            </div>
          </TinderCard>
        )}
      </div>

   
  )
}

export default Simple;  