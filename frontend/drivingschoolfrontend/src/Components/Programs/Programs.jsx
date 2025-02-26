import React from 'react'
import './Programs.css'
import program1 from '../../assets/program1.jpg'
import program2 from '../../assets/program2.jpg'
import program3 from '../../assets/program3.jpg'


const Programs = () => {
  return (
    <div className='programs'>

     <div className="program">
          <img src= {program1} alt=""/>
          <div className="caption">
          <h2> Individual Package</h2>
          <p> Our driving school individual package is design to provide students with a comprehensive and personalized driving education experience. </p>
          </div>
          
    </div>
    

    <div className="program">
          <img src= {program2} alt="" className='prg2'/>
          <div className="caption">
          <h2> VIP Package</h2>
          <p> Our driving school Home pick and drop package is designed to provides students with a convenient and stress-free way to how to drive. </p>
          </div>
          
    </div>


    <div className="program">
          <img src= {program3} alt=""/>
          <div className="caption">
          <h2> Refresher Package</h2>
          <p>Our driving school refresher course is designed for drivers who have already obtaine their driver's license but feel they need to brush up on their skill and knowledge.</p>
          </div>
          
    </div>

</div>
  )
}

export default Programs