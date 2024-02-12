import React from 'react';
import Button from '@mui/material/Button'




const Login = () => {
    const handleLogin = () => {
        window.location.href = "https://10.0.0.158:3000/auth/google"
    }
            
    return (
        <div style={{ maxWidth: "450px", 
                      width: '100%', 
                      height: "100vh",  
                      overflow: "hidden", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center" }}>
                <Button onClick={handleLogin} size='large'>Sign In</Button>
        </div>

    )
}


export default Login; 