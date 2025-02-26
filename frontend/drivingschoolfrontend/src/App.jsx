import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Program from './Components/Programs/Programs'
import Tittle from './Components/Tittle/Tittle'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container"> 
      <Tittle/>
      <Program/> 
      </div>
      

    </div>
  )
}

export default App
