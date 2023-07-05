import React from 'react';
import './NavBar.css';
import '../../App.css'
import {NavLink} from "react-router-dom";
import logo from "../../assets/bikegaragelogo.png";


function NavBar({isAuth}) {
    return (
        <>
            {/*TODO mijn styling van isActive werkt niet*/}
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
                                        to="/dashboard"><h4>Dashboard</h4>
                                    </NavLink>
                                </li>
                                <li className='separation-line'></li>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/bikes"><h4>Bikes</h4>
                                    </NavLink>
                                </li>
                                <li className='separation-line'></li>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/gear"><h4>Gear</h4>
                                    </NavLink>
                                </li>
                            </ul>
                            <ul>
                                <NavLink to="/profile"><img className='logo' src={logo} alt=""/></NavLink>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/login"><h4>Uitloggen</h4>
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
                                        to="/signup"><h4>Registreren</h4>
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