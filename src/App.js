import React, { useState } from "react";
import './App.css';
import NavBar from './components/NavBar/NavBar';

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
            <h1>Hello Welcome to BikeGarage</h1>
            <button type="button" onClick={logClick}> log in </button>
        </>
    );
}

export default App;
