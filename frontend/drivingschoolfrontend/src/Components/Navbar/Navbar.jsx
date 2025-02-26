import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <nav className='container'>
    <div className='logo-div'>
    <img src={logo} alt="" className='logo'/>
    <h2 className='logo-text'> Tharuka</h2>
    </div>
    
    <ul>
        <li>Home</li>
        <li>Gallery</li>
        <li>About Us</li>
        <li>Contac Us</li>
        <li><button className='btn'>Apply Now</button></li>
        
    </ul>

    </nav>
  )
}

export default Navbar