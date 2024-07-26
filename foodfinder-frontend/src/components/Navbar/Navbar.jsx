import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer'; 
import CardScroller from '../CardScroller/CardScroller'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon for the Account item
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Icon for the Menu item
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ListIcon from '@mui/icons-material/List';
import PreferenceDistance from './PreferenceDistance/PreferenceDistance'
import { useMyContext } from '../../Context'
import { Opacity } from '@mui/icons-material';

import { login, signup } from "../../services/loginService"

let backendUrl = import.meta.env.VITE_BACKEND_URL_PROD

const Navbar = ({containerHeight, heightOffset}) => {
    const {count} = useMyContext();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [first_name, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [activeContent, setActiveContent] = useState('default');
    //new
    const [drawerWidth, setDrawerWidth] = useState(450); // Default drawer width
    const [offset, setOffset] = useState(0);

    const createAccount = async (event) => {
        event.preventDefault()
        let result = await signup({ first_name: first_name, email: email })
        return result
    }

    const signIn = (event) => {
        event.preventDefault()
        let result = await login({ first_name: first_name, email: email })
        return result
    }

    // Function to calculate and update offset
    const updateOffset = () => {
        const uiPageWidth = 450; // Adjust this based on your UiPage's actual width
        const windowWidth = window.innerWidth;
        const newOffset = Math.max(windowWidth - uiPageWidth, 0) / 2; // Ensuring the offset is not negative
        setOffset(newOffset);
    };

    useEffect(() => {
        updateOffset(); // Calculate initial offset
        window.addEventListener('resize', updateOffset); // Recalculate when window resizes

        // Cleanup listener when component unmounts
        return () => {
            window.removeEventListener('resize', updateOffset);
        };
    }, []);


//new

    // Function to handle list item click
    const handleListItemClick = (content) => {
        setActiveContent(content);
        setDrawerOpen(true); // Open the drawer if not already open
        
    };

    const goBack = () => {
        setActiveContent('default')
    }

    const handleLogin = () => {

    fetch("https://10.0.0.158:3000/logout", {
        method: "GET",
        credentials: "include", 

    })

    .then(() => {
        window.location.href = '/';
    })

    .catch((error) => {
        console.error("logout failed", error)
    })

    }

    // Determine drawer width and content based on the active content
    const getDrawerContent = () => {
        switch (activeContent) {
            case 'account':
                return { width: '100%', content: 
                <div style={{display: "flex", flexDirection: "column", height: "100vh"}}> 
                <div style={{display: "flex", 
                             flexDirection: "row", 
                             color: "#605656", 
                             backgroundColor: "white", 
                             justifyContent: "center", 
                             alignItems: "center", 
                             borderRadius: "11px 11px 0 0"}}>
                 <IconButton onClick={goBack} sx={{position: "absolute", left: 0 }}><ArrowBackIosIcon fontSize="small" sx={{color: "#605656"}} /></IconButton>
                <Typography variant="h6" style={{margin: '10px 0 10px 0', fontFamily:'Philosopher, sans-serif'}}>Account Details</Typography>
                </div>
                <div style={{flexGrow: 1, backgroundColor: "#ececec"}}>
                    <form onSubmit={createAccount} style={{display: "flex", flexDirection: "column", rowGap: "16px"}}>
                        <Typography sx={{fontSize: "14px", color: "#808080"}}>Sign Up</Typography>
                        <TextField label="Name" value={first_name} onChange={(event) => {setFirstName(event.target.value)}}/>
                        <TextField label="Email" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                        <Button type="submit" >Enter</Button>
                     </form>
                </div>
                </div> };
            case 'Preferences':
                return { width: '100%', content: 
                <div style={{display: "flex", flexDirection: "column", height: "100vh", width: '100%',}}> 
                    <div style={{display: "flex", 
                                 flexDirection: "row", 
                                 color: "#605656", 
                                 backgroundColor: "white", 
                                 justifyContent: "center", 
                                 alignItems: "center", 
                                 borderRadius: "11px 11px 0 0"}}> 
                <IconButton onClick={goBack} sx={{position: "absolute", left: 0 }}><ArrowBackIosIcon fontSize="small" sx={{color: "#605656"}} /></IconButton>
                    
                <Typography variant="h6" style={{margin: '10px 0 10px 0', fontFamily:'Philosopher, sans-serif'}}>Preferences</Typography> 
                </div>
                <div style={{flexGrow: 1, backgroundColor: "#ececec",}}>
                    <PreferenceDistance />
                </div>
                </div> };
             case 'list':
                return { width: '100%', content: 
                <div style={{display: "flex", flexDirection: "column", height: "100vh"}}> 
                <div style={{display: "flex", 
                             flexDirection: "row", 
                             color: "#605656", 
                             backgroundColor: "white", 
                             justifyContent: "center", 
                             alignItems: "center", 
                             borderRadius: "11px 11px 0 0"}}>
                 <IconButton onClick={goBack} sx={{position: "absolute", left: 0 }}><ArrowBackIosIcon fontSize="small" sx={{color: "#605656"}} /></IconButton>
                <Typography variant="h6" style={{margin: '10px 0 10px 0', fontFamily:'Philosopher, sans-serif'}}>List</Typography>
                </div>
                <div style={{flexGrow: 1, backgroundColor: "#ececec"}}>
                 <CardScroller />
                </div>
                </div> };
            default:
                return { width: '250px', content: (
                    <List>
                        <ListItem button onClick={() => handleListItemClick('account')}>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="Account" />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('Preferences')}>
                            <ListItemIcon><MenuBookIcon /></ListItemIcon>
                            <ListItemText primary="Preferences" />
                        </ListItem>
                        <ListItem button onClick={() => handleListItemClick('list')}>
                            <ListItemIcon><Badge badgeContent={count} color="primary"><ListIcon /></Badge></ListItemIcon>
                            <ListItemText primary="List" />
                        </ListItem>
                    </List>
                )};
        }
    };

    const { width, content } = getDrawerContent();

    return (
        <div  style={{ flexGrow: 1, width: "100%", height: "7%", maxWidth: "360px",}}>
            <AppBar position='static' sx={{backgroundColor: "#EEEEEE", borderRadius: "11px 11px 0 0", width: "100%", height: "100%", boxShadow: "none",}}>
                <Toolbar>
                    <Typography variant="h6" align={"left"} component="div" sx={{flexGrow: 1, fontFamily:'Philosopher, sans-serif', color:"#FB0000"}}>
                        FoodFinder
                    </Typography>
                    <IconButton color="inherit" aria-label="Menu" onClick={() => setDrawerOpen(true)} sx={{color: "#605656"}}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            
            <Drawer
                anchor="top"
                open={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { width, height: `${containerHeight}px`, marginLeft: `${offset}px`, marginTop: `${heightOffset}px`, borderRadius: "11px 11px 11px 11px", maxWidth: drawerWidth} }}
            >
                <Box sx={{ maxWidth: drawerWidth,}}>
                    {content}
                </Box>
            </Drawer>
          
            
        </div>
    );
};

export default Navbar;


