import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import Login from './pages/Login'; 
import UiPage from './pages/UiPage/UiPage'






const router = createBrowserRouter([
  /*{path: "/", element: <Login/>}, */
  {path: "/", element: <UiPage/>}
]); 




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
