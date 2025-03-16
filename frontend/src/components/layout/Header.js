import React from 'react'
import '../../styles/Header.css';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/user';

function Header() {
    const [user, setUser] = useUser();

    return (
    <>
        {/* {console.log("current user: ", user.currUser)} */}
        <nav>
            <ul className='nav-container'>
                <NavLink to="/">
                    <li className='logo-container'>
                        <p className='logo-text'>LAUNDRY</p>
                    </li>
                </NavLink>
                {
                    !user.currUser ? (
                        <>
                            <NavLink to="/" className={({isActive}) => (isActive ? "nav-home nav-item active" : "nav-home nav-item")}>
                                <li>
                                    <p className='text'>Home</p>
                                </li>
                            </NavLink>        
                        </>
                    ) : (
                        <></>
                    )
                }
                
                <NavLink to="/pricing" className={({isActive}) => (isActive ? "nav-pricing nav-item active" : "nav-pricing nav-item")}>
                    <li>
                        <p className='text'>Pricing</p>
                    </li>
                </NavLink>
                <NavLink to="/career" className='nav-career nav-item'>
                    <li>
                        <p className='text'>Career</p>
                    </li>
                </NavLink>
                {
                    !user.currUser ? (
                        <>
                            <NavLink to="/signin" className='nav-signin nav-item'>
                                <li>
                                    <p className='text'>Sign In</p>
                                </li>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/user-profile" className="user">
                                    <ul  className='nav-user'>
                                        <li>
                                            <div className='user-photo'>
                                                {/*
                                                {user.currUser.photo ? (
                                                    <img src={user.currUser.photo} alt="Profile" />
                                                ) : (
                                                    <img src='../../public/images/user.webp' alt="Profile" />
                                                )}
                                                */}
                                            </div>
                                        </li>
                                        <li>
                                            <div className='user-name'>
                                                <p className='user-text'>{user.currUser.name}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </NavLink>
                            </li>        
                        </>
                    )
                }
            </ul>
        </nav>
    </>
  )
}

export default Header
