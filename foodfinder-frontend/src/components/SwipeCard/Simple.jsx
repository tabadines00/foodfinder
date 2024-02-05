import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import axios from 'axios'

function Simple () {
    const [lastDirection, setLastDirection] = useState()
    const [data, setData] = useState([]); // Initialize state for the fetched data
    const [coords, setCoords] = useState([null, null])

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


  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {data?.map((business) =>
          <TinderCard className='swipe' key={business.id} onSwipe={(dir) => swiped(dir, business.name)} onCardLeftScreen={() => outOfFrame(business.name)}>
            <div style={{ backgroundImage: business.image_url}} className='card'>
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
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}

export default Simple