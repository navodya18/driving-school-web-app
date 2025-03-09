import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import menu from '../../assets/menu.png'
import { Link } from 'react-scroll'

const Navbar = () => {
  return (
    <nav className='container'>
    <div className='logo-div'>
    <img src={logo} alt="" className='logo'/>
    <h2 className='logo-text'> Tharuka</h2>
    </div>
    
    <ul>
        <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
        <li>Gallery</li>
        <li><Link to='about' smooth={true} offset={-240} duration={500}>About Us</Link></li>
        <li><Link to='contact' smooth={true} offset={-250} duration={500}>Contact Us</Link></li>
        <li><button className='btn btn-apply'>Apply Now</button></li>
        
    </ul>
    <img src={menu} alt="" className='menu-icon' /> 
    

    </nav>
  )
}

export default Navbar