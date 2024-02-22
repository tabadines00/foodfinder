import React, { useState, createContext, useContext } from 'react'; 

const MyContext = createContext()

export const MyProvider = ({children}) => {
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    return <MyContext.Provider value={{count, setCount, items, setItems, addItem}}>{children}</MyContext.Provider>
}


export const useMyContext = () => useContext(MyContext);