const backendUrl = "http://localhost:8787/" /////////////////////////////////////////////////////////////

export const login = async (user) => {
    // login
    // post to the backend    
    const response = await fetch(backendUrl + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
}

export const signup = async (newUser) => {
    const data = {
        user: {
            first_name: newUser.first_name,
            email: newUser.email
        }
    };
    // post user data to the background
    // fetch(backendUrl + "login", { 
    
    const response = await fetch(backendUrl + 'signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    const result = await response.json();
    // login 
    // if (result is not successful)
        // return an error    
    // else    
    login(newUser)
}
