import React, {useState} from "react";
import Button from '../../components/button/Button'
import FormInputField from '../../components/formInput/FormInputField'
import './AuthPages.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function SignUp() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onTouched'});

    // state voor functionaliteit
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    async function handleFormSubmit(data) {
        console.log(data)
        try {
            const response = await axios.post('http://localhost:8080/users', {
                username: data.username,
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName
            });
            console.log(response);
            console.log("user signed up!");
            navigate("/login");

        } catch (error) {
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
                                    validationRules={
                                        {
                                            required: {
                                                value: true,
                                                message: "Username is required!"
                                            }
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                />
                                <FormInputField
                                    name="email"
                                    label="E-mail"
                                    type="email"
                                    placeholder="email@bike-garage.com"
                                    validationRules={
                                        {
                                            required: {
                                                value: true,
                                                message: "Username is required!"
                                            }
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                />
                                <FormInputField
                                    name="firstName"
                                    label="First name"
                                    type="text"
                                    placeholder="Mathieu"
                                    validationRules={
                                        {
                                            required: {
                                                value: true,
                                                message: "First name is required!"
                                            }
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                />
                                <FormInputField
                                    name="lastName"
                                    label="Last name"
                                    type="text"
                                    placeholder="van der Poel"
                                    validationRules={
                                        {
                                            required: {
                                                value: true,
                                                message: "Last name is required!"
                                            }
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                />
                                <FormInputField
                                    name="password"
                                    label="Password"
                                    type="password"
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
                                {/*TODO een functie schrijven dat deze per se moet worden ingevoerd bij registreren*/}
                                <FormInputField
                                    name="password-confirm"
                                    label="Confirm password"
                                    type="password"
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
                                className='signin-button'
                        >
                            Sign up!
                        </Button>
                        {error && <p>{error}</p>}
                    </form>


                </div>
            </main>
        </>
    );
}

export default SignUp;