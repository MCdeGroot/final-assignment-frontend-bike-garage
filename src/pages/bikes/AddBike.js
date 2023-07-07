import React, {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import FormInputField from "../../components/formInput/FormInputField";
import Button from "../../components/button/Button";
import FormInputSelect from "../../components/formInput/FormInputSelect";

function AddBike() {
    const {register, handleSubmit} = useForm();
    async function handleFormSubmit(data){
        console.log(data)
    }

    const options = [
        {label: "Road Bike", value: "ROAD"},
        {label: "Time Trial", value: "TIMETRIAL"},
        {label: "MTB", value: "MOUNTAIN"}
    ];

    return (
        <>
            <main className='outer-container'>
                <div className='inner-container authorization'>
                    <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
                        <article className='form-wrapper'>
                            <div className='form-title'>
                                <h3>Looks like someone got a little present!</h3>
                            </div>
                            <div className='form-input-items'>
                                <FormInputField
                                    name="brand"
                                    label="Brand"
                                    type="text"
                                    placeholder="Tell me which beautiful brand this bike is from"
                                    register={register}
                                />
                                <FormInputField
                                    name="model"
                                    label="Model"
                                    type="text"
                                    placeholder="Which model you bought?"
                                    register={register}
                                />
                                <FormInputField
                                    name="name"
                                    label="Nickname"
                                    type="text"
                                    placeholder="How do you want to call your beautiful ride?"
                                    register={register}
                                />
                                <FormInputSelect
                                    name="bikeType"
                                    label="Bike type"
                                    options={options}
                                    register={register}
                                />


                            </div>
                        </article>
                        <Button type="submit"
                                className='submit-button'>
                            Add Bike!
                        </Button>
                    </form>


                </div>
            </main>
        </>
    );
}

export default AddBike;
