import React, {useState} from "react";
import Button from '../../components/button/Button'
import FormInputField from '../../components/formInput/FormInputField'
import './AuthPages.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function SignUp() {
    const {register, handleSubmit} = useForm();

    // state voor functionaliteit
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

   async function handleFormSubmit(data) {
        try {
            const response = await axios.post('http://localhost:8080/users', {
                username: data.username,
                email: data.email,
                password: data.password
            } );
            console.log(response);
            console.log("user signed up!");
            navigate("/login");

        } catch (error)
        {
            console.error(error);
            toggleError(true);
        }
        toggleLoading(false);

    }

    return (
        <>
            <main className='outer-container'>
                <div className='inner-container authorization'>
                    <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
                        <article className='form-wrapper'>
                            <div className='form-title'>
                                <h3>Welcome!</h3>
                                <p>Please fill in the form to register!</p>
                            </div>
                            <div className='form-input-items'>
                                <FormInputField
                                    name="username"
                                    label="Username"
                                    type="text"
                                    placeholder="Username"
                                    register={register}
                                />
                                <FormInputField
                                    name="email"
                                    label="E-mail"
                                    type="email"
                                    placeholder="email@bike-garage.com"
                                    register={register}
                                />
                                <FormInputField
                                    name="firstname"
                                    label="First name"
                                    type="text"
                                    placeholder="Mathieu"
                                    register={register}
                                />
                                <FormInputField
                                    name="lastname"
                                    label="Last name"
                                    type="text"
                                    placeholder="van der Poel"
                                    register={register}
                                />
                                <FormInputField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    register={register}
                                />
                                {/*TODO een funcite schrijven dat deze per se moet worden ingevoerd bij registreren*/}
                                <FormInputField
                                    name="password-confirm"
                                    label="Confirm password"
                                    type="password"
                                    register={register}
                                />
                            </div>
                        </article>
                        <Button type="submit"
                                className='signin-button'
                               >
                            Sign up!
                        </Button>
                    </form>


                </div>
            </main>
        </>
    );
}

export default SignUp;