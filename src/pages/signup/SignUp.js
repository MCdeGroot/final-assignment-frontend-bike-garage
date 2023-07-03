import React from "react";
import Button from '../../components/button/Button'
import FormInputField from '../../components/formInputField/FormInputField'
import './SignUp.css'
import {useForm} from "react-hook-form";


function SignUp() {
    const {register, handleSubmit} = useForm();

    function handleFormSubmit(data){
        console.log(data)
    }

    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>

                    <article className='form-wrapper'>
                        <h2>Nice to see you again</h2>
                        <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>

                            <FormInputField
                                name="username"
                                label="Gebruikersnaam"
                                type="text"
                                register={register}
                            />
                            <FormInputField
                                name="email"
                                label="E-mail"
                                type="text"
                                register={register}
                            />
                            <FormInputField
                                name="firstname"
                                label="Voornaam"
                                type="text"
                                register={register}
                            />


                            <Button type="submit"
                                className='signin-button'>
                                Registreer!
                            </Button>
                        </form>
                    </article>
                </div>
            </main>
        </>
    );
}

export default SignUp;