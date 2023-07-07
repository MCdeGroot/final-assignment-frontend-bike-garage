import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {validateToken} from "../helper/validateToken";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });

    const navigate = useNavigate();

    // Stap 1: Gebruik useEffect om te checken of er een token in de localstorage zit
    // Stap 2: Als er een token in de localstorage zit, check dan of deze nog geldig is (checkTokenValidity)
    // Stap 3: Als de token nog geldig is, log de gebruiker in
    // Stap 4: Als de token niet meer geldig is, log de gebruiker uit
    // Stap 7: Haal de user data op uit de database en sla deze op in de state
    // Stap 8: Geef een redirect mee (optioneel)


    useEffect(() => {
        // check of er nog een token in Local Storage staat en of deze nog geldig is
        const storedToken = localStorage.getItem('token');

        if (storedToken && validateToken(storedToken)) {
            console.log("Looks like there is a valid token in the local storage")
            void login(storedToken)

        } else {
            void logout();
        }
    }, [])

    useEffect( ()=>{
        console.log(authState);
    },[authState])

    async function login(jwt_token, redirect) {
        console.log(jwt_token);
        const decodedToken = jwt_decode(jwt_token);
        localStorage.setItem('token', jwt_token);
        console.log(decodedToken);
        try {
            const response = await axios.get(`http://localhost:8080/authenticated`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt_token}`
                }
            })
            setAuthState({
                ...authState,
                isAuth: true,
                user: {
                    name: response.data.name,
                    authority: response.data.authorities[0].authority
                },
                status: "done"
            })
            console.log('De gebruiker is ingelogd 🔓')
            if (redirect) {
                navigate(redirect)
            }
        } catch (error) {
            console.error(error)
        }

    }


    function logout() {
        localStorage.removeItem('token');
        setAuthState({
            ...authState,
            isAuth: false,
            user: null,
            status: "done"
        })
        console.log('De gebruiker is uitgelogd 🔒')
        console.log(authState)
        navigate('/login')
    }

    const data = {
        isAuth: authState.isAuth,
        user: authState.user,
        logout: logout,
        login: login
    }
    return (
        <AuthContext.Provider value={data}>
            {authState.status === "done" ? children : <p>loading...</p>}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;


