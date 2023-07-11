import React, {useContext, useState} from "react";
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from "./components/footer/Footer";
import {Route, Routes, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/profile/Profile"
import Dashboard from "./pages/dashboard/Dashboard";
import Bikes from "./pages/bikes/Bikes";
import Gear from "./pages/gear/Gear";
import PasswordChange from "./pages/auth/PasswordChange";
import AddBike from "./pages/bikes/AddBike";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {isAuth, authority} = useContext(AuthContext);
    console.log(isAuth);

    return (
        <>
            <NavBar isAuth={isAuth}></NavBar>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/passwordchange" element={<PasswordChange/>}/>
                <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/login"/>}/>
                <Route path="/rides" element={isAuth ? <Dashboard/> : <Navigate to="/login"/>}/>
                <Route path="/bikes" element={isAuth ? <Bikes/> : <Navigate to="/login"/>}/>
                <Route path="/bikes/add" element={isAuth ? <AddBike/> : <Navigate to="/login"/>}/>
                <Route path="/gear/:id" element={isAuth ? <Gear/> : <Navigate to="/login"/>}/>
            </Routes>
            <Footer></Footer>
        </>
    );
}

export default App;
