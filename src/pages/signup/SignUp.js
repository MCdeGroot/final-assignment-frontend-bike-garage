import React from "react";
import Button from '../../components/button/Button'
import FormInputField from '../../components/formInputField/FormInputField'
import './SignUp.css'
import {useForm} from "react-hook-form";


function SignUp() {
    const {register} = useForm();


    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>

                    <article className='form-wrapper'>
                        <h2>Nice to see you again</h2>
                        <form className='form'>

                            <FormInputField
                                name="firstname"
                                label="Voornaam"
                                type="text"
                                register={register}
                            />

                            <Button className='signin-button'>
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