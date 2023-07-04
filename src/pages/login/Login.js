import React from "react";
import '../../App.css'
import Button from '../../components/button/Button'
import addIcon from '../../assets/add.svg';
import {ChatText} from "@phosphor-icons/react";
import {useForm} from "react-hook-form";
import FormInputField from "../../components/formInputField/FormInputField";

function Login() {
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

