import React, {useContext} from "react";
import '../../App.css'
import './AuthPages.css'
import Button from '../../components/button/Button'
import {useForm} from "react-hook-form";
import FormInputField from "../../components/formInput/FormInputField";
import axios from "axios";

function PasswordChange(){
    const {register, handleSubmit, reset} = useForm();

    async function handleFormSubmit(data){
        const storedToken = localStorage.getItem('token');
        console.log(storedToken);
        console.log(data);
        try {
            const response = await axios.put(`http://localhost:8080/updatepassword/${data.username}`, {
                username: data.username,
                newPassword: data.newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }

            });
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <main className='outer-container'>
                <div className='inner-container authorization'>
                    <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
                        <article className='form-wrapper'>
                            <div className='form-title'>
                                <h3>Ready to change your password?</h3>
                            </div>
                            <div className='form-input-items'>
                                <FormInputField
                                    name="username"
                                    label="Login"
                                    type="text"
                                    placeholder="Fill in your username"
                                    register={register}
                                />

                                <FormInputField
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    placeholder="Enter new password"
                                    register={register}
                                />
                            </div>
                        </article>
                        <Button type="submit"
                                className='signin-button'>
                            Reset!
                        </Button>
                    </form>


                </div>
            </main>
        </>
    );



}

export default PasswordChange;