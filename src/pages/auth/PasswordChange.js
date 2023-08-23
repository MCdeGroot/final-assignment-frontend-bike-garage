import React, {useContext} from "react";
import '../../App.css'
import './AuthPages.css'
import Button from '../../components/button/Button'
import {useForm} from "react-hook-form";
import FormInputField from "../../components/formInput/FormInputField";
import axios from "axios";

function PasswordChange(){
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleFormSubmit(data){
        const storedToken = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:8080/users/updatepassword/${data.username}`, {
                newPassword: data.newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }

            });
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
                                    errors={errors}
                                />

                                <FormInputField
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    placeholder="Enter new password"
                                    validationRules={
                                        {
                                            required: {
                                                value: true,
                                                message: "Password is required!"
                                            }, pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[\\!\\#\\@\\$\\%\\&\\/\\(\\)\\=\\?\\*\\-\\+\\_\\.\\:\\;\\,\\{\\}\\^])[A-Za-z0-9!#@$%&/()=?*+-_.:;,{}].+$/,
                                                message: "Invalid password! Password must meet the following requirements: At least 1 lowercase letter, at least 1 uppercase letter, at least 1 number and at least 1 symbol!"
                                            },
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters!"
                                            }, maxLength: {
                                                value: 20,
                                                message: "Password cannot be more than 20 characters long!"
                                            }
                                        }
                                    }
                                    register={register}
                                    errors={errors}
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