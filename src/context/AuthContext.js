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

    useEffect(() => {
    }, [authState])

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
                    username: response.data.name,
                    authorities: response.data.authorities.map(authority => authority.authority)
                    // bikes: response.data.bikes.map(bike => bike.id)
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


