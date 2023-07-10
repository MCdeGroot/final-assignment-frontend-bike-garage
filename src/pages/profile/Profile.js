import React, {useContext, useEffect, useState} from "react";
import '../../App.css';
import axios from "axios";
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";
import BikeTile from "../../components/bikeTile/BikeTile";
import {NavLink} from "react-router-dom";
import {PlusCircle} from "@phosphor-icons/react";
import FormInputField from "../../components/formInput/FormInputField";
import {useForm} from "react-hook-form";

function Profile() {

    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onTouched'});

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUserData() {
            const storedToken = localStorage.getItem('token');
            toggleLoading(true)
            console.log(storedToken);
            try {
                toggleError(false);
                const response = await axios.get(`http://localhost:8080/users/${user.username}`, {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                setUserData(response.data);
                console.log(response.data); /// dit nog weghalen

            } catch (error) {
                console.error(error)
            }
        }

        fetchUserData();
    }, [])

    async function handleFormSubmit(data) {
        const storedToken = localStorage.getItem('token');
        toggleLoading(true)
        try {
            const response = await axios.put(`http://localhost:8080/users/${userData.username}`, {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                dateOfBirth: data.dateOfBirth
            }, {headers: {
                'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
            }});
            console.log(response);

        } catch (error) {
            console.error(error);
            toggleError(true);
        }
        toggleLoading(false);
    }

    function handleChange(e){
        const {name, value} = e.target;
        setUserData((previousValue) => ({
            ...previousValue,
            [name]: value,
        }));
    };


    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
                    <h1>Zie hier! Uw profiel pagina!</h1>
                    <form className='form-input-items' onSubmit={handleSubmit(handleFormSubmit)}>

                        {userData &&
                            <div>

                                <FormInputField
                                    name="username"
                                    label="Username"
                                    type="text"
                                    placeholder="Username"
                                    validationRules={
                                        {
                                            disabled: true,
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                    value={userData.username}
                                />
                                <FormInputField
                                    name="email"
                                    label="E-mail"
                                    type="email"
                                    placeholder="email@bike-garage.com"
                                    validationRules={
                                        {
                                            disabled: !editProfile,
                                            required: {
                                                value: true,
                                                message: "email is required!"
                                            }
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                    value={userData.email}
                                    onChange = {handleChange}
                                />
                                <FormInputField
                                    name="firstName"
                                    label="First name"
                                    type="text"
                                    placeholder="Mathieu"
                                    validationRules={
                                        {disabled: !editProfile,
                                            required: {
                                                value: true,
                                                message: "First name is required!"
                                            }
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                    value={userData.firstName}
                                    onChange = {handleChange}
                                />
                                <FormInputField
                                    name="lastName"
                                    label="Last name"
                                    type="text"
                                    placeholder="van der Poel"
                                    validationRules={
                                        {disabled: !editProfile,
                                            required: {
                                                value: true,
                                                message: "Last name is required!"
                                            }
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                    value={userData.lastName}
                                    onChange = {handleChange}
                                />
                                <FormInputField
                                    name="dateOfBirth"
                                    label="Date of Birth"
                                    type="date"
                                    placeholder=""
                                    validationRules={
                                        {
                                            disabled: !editProfile,
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                    value={userData.dateOfBirth}
                                    onChange = {handleChange}
                                />
                                <FormInputField
                                    name="role"
                                    label="Role"
                                    type="text"
                                    placeholder="rol"
                                    validationRules={
                                        {
                                            disabled: !editProfile,
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                    value={userData.authorities[0].authority === "ROLE_USER" ? "User" : "Trainer"}
                                />
                                <FormInputField
                                    name="numberOfRides"
                                    label="Number of rides"
                                    type="number"
                                    placeholder="0"
                                    validationRules={
                                        {
                                            disabled: true,
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                    value={userData.rides.length}
                                />
                                <FormInputField
                                    name="totalDistanceDriven"
                                    label="Total distance driven"
                                    type="number"
                                    placeholder="0"
                                    validationRules={
                                        {
                                            disabled: true,
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                    value={userData.totalDistanceDriven}
                                />
                                <FormInputField
                                    name="numberOfBikes"
                                    label="Number of bikes"
                                    type="number"
                                    placeholder="0"
                                    validationRules={
                                        {
                                            disabled: true,
                                        }
                                    }
                                    register={register}
                                    errors={errors}
                                    value={userData.bikes.length}
                                />



                            </div>
                        }
                        {editProfile &&

                        <Button className="signin-button" type="submit"> Save changes </Button>
                        }

                    </form>
                    {!editProfile &&

                    <Button className="signin-button" onClick={()=>{setEditProfile(true)}}>
                        Edit profile!
                    </Button>
                    }
                </div>

            </main>


        </>
    );
}

export default Profile;
