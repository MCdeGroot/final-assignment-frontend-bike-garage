import React from "react";
import Button from '../../components/button/Button'
import FormInputField from '../../components/formInputField/FormInputField'
import './SignUp.css'
import {useForm} from "react-hook-form";


function SignUp() {
    const {register, handleSubmit} = useForm();

    function handleFormSubmit(data) {
        console.log(data)
    }

    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
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
                                    register={register}
                                />
                                <FormInputField
                                    name="email"
                                    label="E-mail"
                                    type="email"
                                    register={register}
                                />
                                <FormInputField
                                    name="firstname"
                                    label="First name"
                                    type="text"
                                    register={register}
                                />
                                <FormInputField
                                    name="lastname"
                                    label="Last name"
                                    type="text"
                                    register={register}
                                />
                                <FormInputField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    register={register}
                                />
                                <FormInputField
                                    name="password-confirm"
                                    label="Confirm password"
                                    type="password"
                                    register={register}
                                />
                            </div>
                        </article>
                        <Button type="submit"
                                className='signin-button'>
                            Sign up!
                        </Button>
                    </form>


                </div>
            </main>
        </>
    );
}

export default SignUp;