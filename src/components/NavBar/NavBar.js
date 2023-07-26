import React, {useContext} from 'react';
import './NavBar.css';
import '../../App.css'
import {NavLink} from "react-router-dom";
import logo from "../../assets/bikegaragelogo.png";
import {AuthContext} from "../../context/AuthContext";


function NavBar() {
    const {isAuth, logout} = useContext(AuthContext);

    return (
        <>
            <div className='outer-container navbar'>    {/*outercontainer*/}
                <nav className='inner-container navbar-items'>
                    <div className='navbar-logo'>
                        <NavLink to="/rides"><img className='logo' src={logo} alt=""/></NavLink>
                        <h1>BikeGarage</h1>
                    </div>
                    {isAuth &&
                        <>
                            <ul>
                                <li>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'active-nav-link' : 'default-nav-link'}
                                        to="/rides"><h4>Dashboard</h4>
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
                                        onClick={logout}
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