import React from 'react';
import {useNavigate} from 'react-router-dom'

function CtaLogin() {

  const navigate = useNavigate();
  
  const goToSignin = () => {
    navigate('/signin');
  }
  
  return (
    <>
        <p className='cta-text'>Already Have Account</p>
        <button className='cta-btn' onClick={goToSignin}>Sign In</button> 
    </>
  )
}

export default CtaLogin
