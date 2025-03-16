import React from 'react';
import '../styles/PreFooter.css';
import { Link } from 'react-router-dom';

function PreFooter() {
  return (
    <>
        <div className='prefooter-container'>
            <div className='offer'>
                <p class="offer-main-text">Now Refer & Earn ₹500 for every referral*</p>
                <p class="offer-sub-text">* Terms and conditions will be applied</p>
            </div>
            <div className='footer-navigation'>
              <ul className='flex-container'>
                <li className='intro-heading'>ABOUT US</li>
                <li className='intro-subheading'>Doorstep Wash & Dryclean Service</li>
              </ul>
              <ul className='flex-container'>
                <li>
                  <Link to='/' className='flex-item-heading'>Home</Link>  
                </li>
                <li>
                  <Link to='/signin' className='flex-item'> Sign In </Link> 
                </li>
                <li>
                  <Link to='/sighup' className='flex-item'>Register</Link>
                </li>
              </ul>
              <ul className='flex-container'>
                <li className='flex-item-heading'>Pricing</li>
              </ul>
              <ul className='flex-container'>
                <li className='flex-item-heading'>Career</li>
                <li>
                  <Link to='/blogs' className='flex-item'>Blogs</Link>
                </li>
                <li>
                  <Link to='/createorder' className='flex-item'>Create</Link>
                </li>
              </ul>
              <ul className='flex-container'>
                <li className='flex-item-heading'>Contact</li>
              </ul>
              <ul className='flex-container'>
                <li className='flex-item-heading-socials'>SOCIAL MEDIA</li>
                <li>
                  <ul className='flex-container-socials'>
                    <li>
                      <Link to='https://www.facebook.com/' target='_blank'><div className='facebook-icon'></div></Link>
                    </li>
                    <li>
                      <Link to='https://www.instagram.com/' target='_blank'><div className='instagram-icon'></div></Link>
                    </li>
                    <li>
                      <Link to='https://www.linkedin.com/' target='_blank'><div className='linkedin-icon'></div></Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
        </div>      
    </>
  )
}

export default PreFooter;
