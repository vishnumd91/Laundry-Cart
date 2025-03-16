import React from 'react';
import '../styles/Sidebar.css';
import { NavLink } from 'react-router-dom';

function Sidebar(){
    return(
        <>
            <nav>
                <ul className='side-container'>
                        <NavLink to='/' className={({isActive}) => (isActive ? "nav-home active" : "nav-home")}>
                            <li>
                                <p className='home-icon'></p>
                            </li>
                        </NavLink>
                        <NavLink to='/orders' className={({isActive}) => (isActive ? "nav-more active" : "nav-more")}>
                            <li>
                                <p className='more-icon'></p>
                            </li>
                        </NavLink>
                        <NavLink to='/past-orders'  className={({isActive}) => (isActive ? "nav-list active" : "nav-list")}>
                            <li>
                                <p className='list-icon'></p>   
                            </li>    
                        </NavLink>
                </ul>
            </nav>
        </>
    );
}

export default Sidebar;