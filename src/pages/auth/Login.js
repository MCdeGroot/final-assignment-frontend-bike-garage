import React from "react";
import '../../App.css'
import './AuthPages.css'
import Button from '../../components/button/Button'
import {useForm} from "react-hook-form";
import FormInputField from "../../components/formInput/FormInputField";

function Login() {
    const {register, handleSubmit} = useForm();

    function handleFormSubmit(data) {
        console.log(data)
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
                                    name="email"
                                    label="Login"
                                    type="email"
                                    placeholder="Email"
                                    register={register}
                                />

                                <FormInputField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    placeholder="Enter password"
                                    register={register}
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

