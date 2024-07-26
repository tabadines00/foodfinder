import React, { useState, useEffect, useRef } from 'react'; 
import axios from 'axios'; 
import Container from '@mui/material/Container'; 
import Box from '@mui/material/Box'; 
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Navbar from '../../components/Navbar/Navbar';
//import SwipeCard from '../../components/SwipeCard/SwipeCard'; 
import BottomBar from '../../components/BottomBar/BottomBar';
import Simple from '../../components/SwipeCard/Simple';
import { MyProvider } from '../../Context'; 
import './UPage.css'



const UiPage = () => {

   const containerRef = useRef(null);

    // Set state for the height
    const [containerHeight, setContainerHeight] = useState(0);
    const [heightOffset, setHeightOffset] = useState(0);

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Function to update the height
        const updateHeight = () => {
            // Ensure the element is rendered before trying to access its properties
            if (containerRef.current) {
                setContainerHeight(containerRef.current.offsetHeight);
            }
        };

        // Update height on mount and resize
        updateHeight();
        window.addEventListener('resize', updateHeight);
        //console.log(containerHeight)

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    useEffect(() => {
      // This function now directly uses `containerHeight` from the state
      const updateHeightOffset = () => {
          const uiPageHeight = containerHeight; // Use the state variable directly
          const windowHeight = window.innerHeight;
          const newHeightOffset = Math.max(windowHeight - uiPageHeight, 0) / 2; // Ensuring the offset is not negative
          setHeightOffset(newHeightOffset);
      };
  
      updateHeightOffset(); // Calculate initial offset
      const handleResize = () => updateHeightOffset(); // Define a function to update on resize
      window.addEventListener('resize', handleResize); // Recalculate when window resizes
      //console.log(heightOffset)
  
      // Cleanup listener when component unmounts
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, [heightOffset]); // Dependency array now uses `containerHeight`
  


 return(
    <MyProvider> 
   <div  style={{ width: "100%", maxWidth: "450px", display: "flex", justifyContent: "center",  alignItems: "center",}}> 
     <div  ref={containerRef} style={{ maxWidth: "450px", width: '100%', height: "100%", maxHeight: "900px", overflowX: "hidden",}} className="ui-page-parent"> 
        <Navbar containerHeight={containerHeight} heightOffset={heightOffset} menuOpen={menuOpen} setMenuOpen={setMenuOpen} className="navbar"/>
        <Simple setMenuOpen={setMenuOpen} />
        
      </div>
   </div>
    </MyProvider>
 )
}



export default UiPage; 


/*
    // Function to calculate and update offset
    const updateHeightOffset = (containerHeight) => {
        const uiPageHeight = containerHeight // Adjust this based on your UiPage's actual width
        const windowHeight = window.innerHeight;
        const newHeightOffset = Math.max(windowHeight - uiPageHeight, 0) / 2; // Ensuring the offset is not negative
        setHeightOffset(newHeightOffset);
    };

    useEffect(() => {
        updateHeightOffset(); // Calculate initial offset
        window.addEventListener('resize', updateHeightOffset); // Recalculate when window resizes
        console.log(heightOffset)
        // Cleanup listener when component unmounts
        return () => {
            window.removeEventListener('resize', updateHeightOffset);
        };
    }, [containerHeight]);

*/
