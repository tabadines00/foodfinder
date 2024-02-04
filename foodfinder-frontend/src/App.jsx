import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UiPage from './pages/UiPage/UiPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UiPage />
    </>
  )
}

export default App
