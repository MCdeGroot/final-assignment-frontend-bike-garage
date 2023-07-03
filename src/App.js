import React, { useState } from "react";
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from "./components/footer/Footer";
import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/profile/Profile"
import Dashboard from "./pages/dashboard/Dashboard";
import Bikes from "./pages/bikes/Bikes";
import Gear from "./pages/gear/Gear";
import Button from './components/button/Button';

function App() {
    function logClick(){
        toggleIsAuth(!isAuth);
        console.log(isAuth);
        console.log('You clicked!');
    }

    const [isAuth, toggleIsAuth] = useState(true); // Initial state is set to true

    return (
        <>
            <NavBar isAuth={isAuth}></NavBar>
            <Button type="button" onClick={logClick} className='signin-button'> log in </Button>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/login"/>}/>
                <Route path="/dashboard" element={isAuth ? <Dashboard/> : <Navigate to="/login"/>}/>
                <Route path="/bikes" element={isAuth ? <Bikes/> : <Navigate to="/login"/>}/>
                <Route path="/gear" element={isAuth ? <Gear/> : <Navigate to="/login"/>}/>
            </Routes>
            <Footer></Footer>
        </>
    );
}

export default App;
