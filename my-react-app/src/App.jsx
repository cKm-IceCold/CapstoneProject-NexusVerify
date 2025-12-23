import { useState } from 'react'
import Home from './components/Home'
import Navbar from './components/navBar'
import { BrowserRouter as Router, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
   
     
     
     <Home />
    </>
  )
}

export default App
