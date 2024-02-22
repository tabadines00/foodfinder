import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'; 
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



const Navbar = () => {
    const {count} = useMyContext();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('default');

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
                 rr
                </div>
                </div> };
            case 'Preferences':
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
        <div  style={{flexGrow: 1, width: "100%", height: "7%", maxWidth: "360px",}}>
            <AppBar position='static' sx={{backgroundColor: "#EEEEEE", borderRadius: "11px 11px 0 0", width: "100%", height: "100%", boxShadow: "none"}}>
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
                anchor='right'
                open={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { width } }}
            >
                <Box sx={{ width }} role="presentation">
                    {content}
                </Box>
            </Drawer>
        </div>
    );
};

export default Navbar;


