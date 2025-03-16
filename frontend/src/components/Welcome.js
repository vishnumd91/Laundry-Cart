import React from 'react'
import '../styles/Welcome.css';

function Welcome({children}) {
  return (
    <>
        <div className='welcome-container'>
            <div className='app-name'>Laundry Service</div>
            <div className='app-desc'>Doorstep Wash & Dryclean Service</div>
            {children}
        </div>
    </>
  )
}

export default Welcome
