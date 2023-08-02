import React, {useContext} from "react";
import '../../App.css'
import './AuthPages.css'
import Button from '../../components/button/Button'
import {useForm} from "react-hook-form";
import FormInputField from "../../components/formInput/FormInputField";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onTouched'});
    const {login} = useContext(AuthContext);


async function handleFormSubmit(data) {
    console.log(data)
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username: data.username,
                password: data.password
            });
            console.log(response);
            login(response.data.jwt, "/rides");
        } catch (error){
            console.error("Onjuist email en wachtwoord combinatie ⛔", error)
            console.log(data.username, data.password)
        }
    }
    return (
        <>
            <main className='outer-container'>
                <div className='inner-container authorization'>
                    <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
                        <article className='form-wrapper'>
                            <div className='form-title'>
                                <h3>Nice to see you again!</h3>
                            </div>
                            <div className='form-input-items'>
                                <FormInputField
                                    name="username"
                                    label="Login"
                                    type="text"
                                    placeholder="Fill in your username"
                                    register={register}
                                    errors = {errors}
                                />

                                <FormInputField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    placeholder="Enter password"
                                    register={register}
                                    errors = {errors}
                                />
                            </div>
                        </article>
                        <Button type="submit"
                                className='signin-button'>
                            Log in!
                        </Button>
                    </form>


                </div>
            </main>
        </>
    );
}

export default Login;

