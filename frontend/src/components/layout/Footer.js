import React from 'react';
import '../../styles/Footer.css';
import PreFooter from '../PreFooter';
import { useUser } from '../../context/user';

function Footer() {
  const [user, setUser] = useUser();
  return (
    <>
        <div className='footer-container'>
            {
              !user.currUser ? (
                <>
                  <PreFooter/>    
                </>
              ) : (
                <>
                
                </>
              )
            }
            
            <div className='lower-footer'>
                <p className='footer-text'>2025 &copy; Laundry</p>
            </div>
        </div>
    </>
  )
}

export default Footer
