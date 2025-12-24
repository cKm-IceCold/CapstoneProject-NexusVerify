import { useState } from 'react'
import Home from './components/Home'

import { BrowserRouter as Router, Link } from 'react-router-dom';
import HowItWorks from './components/how_it_works';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Home />
     <HowItWorks />
    </>
  )
}

export default App
