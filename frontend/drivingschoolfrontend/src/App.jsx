import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Program from './Components/Programs/Programs'
import Tittle from './Components/Tittle/Tittle'
import About from './Components/About/About'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container"> 
      <Tittle subTittle='Our Main Packages' tittle='What We Offer'/>
      <Program/> 
      <About/>
      </div>
      

    </div>
  )
}

export default App
