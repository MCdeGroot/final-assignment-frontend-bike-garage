import React from 'react';
import './NavBar.css';
import '../../App.css'
import {NavLink} from "react-router-dom";
import logo from "../../assets/bikegaragelogo.png";


function NavBar({isAuth}) {
    return (
        <>
            <div className='outer-container navbar'>    {/*outercontainer*/}
                <nav className='inner-container navbar-items'>
                    <div className='navbar-logo'>
                        <NavLink to="/dashboard"><img className='logo' src={logo} alt=""/></NavLink>
                        <h1>BikeGarage</h1>
                    </div>
                    {isAuth &&
                        <>
                            <ul>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/dashboard"><h2>Dashboard</h2>
                                    </NavLink>
                                </li>
                                <li className='separation-line'></li>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/bikes"><h2>Bikes</h2>
                                    </NavLink>
                                </li>
                                <li className='separation-line'></li>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/gear"><h2>Gear</h2>
                                    </NavLink>
                                </li>
                            </ul>
                            <ul>
                                <NavLink to="/profile"><img className='logo' src={logo} alt=""/></NavLink>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/login"><h2>Uitloggen</h2>
                                    </NavLink>
                                </li>
                            </ul>
                        </>
                    }
                    {!isAuth &&
                        <>
                            <ul>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/signup"><h2>Registreren</h2>
                                    </NavLink>
                                </li>
                            </ul>
                        </>}
                </nav>
            </div>
        </>
    )

}

export default NavBar;