import React from 'react';
import './NavBar.css';
import {NavLink} from "react-router-dom";
import logo from "../../assets/bikegaragelogo.png";


function NavBar({isAuth}) {
    return (
        <>
            <div>    {/*outercontainer*/}
                <nav>
                    <NavLink to="/"><img src={logo} alt=""/></NavLink>
                    {isAuth &&
                        <>
                            <ul>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/"><h3>Dashboard</h3>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/bikes"><h3>Bikes</h3>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/parts"><h3>Gear</h3>
                                    </NavLink>
                                </li>
                            </ul>
                            <ul>
                                <NavLink to="/profile"><img src={logo} alt=""/></NavLink>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/"><h3>Uitloggen</h3>
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
                                        to="/"><h3>Registreren</h3>
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