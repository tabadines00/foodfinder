const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD

export const login = async (data) => {
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
    let response = {}
    try {
        response = await fetch(backendUrl + 'signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        // login 
        return (!result.error)
    } catch (err) {
        return false
    }
}
