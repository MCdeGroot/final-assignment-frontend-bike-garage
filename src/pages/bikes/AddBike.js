import React, {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import FormInputField from "../../components/formInput/FormInputField";
import FormInputSelect from "../../components/formInput/FormInputSelect";
import Button from "../../components/button/Button";

function AddBike() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleFormSubmit(data) {

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
                                    errors={errors}
                                />
                                <FormInputField
                                    name="model"
                                    label="Model"
                                    type="text"
                                    placeholder="Which model you bought?"
                                    register={register}
                                    errors={errors}
                                />
                                <FormInputField
                                    name="name"
                                    label="Nickname"
                                    type="text"
                                    placeholder="How do you want to call your beautiful ride?"
                                    register={register}
                                    errors={errors}
                                />
                                <FormInputField
                                    name="groupSet"
                                    label="Group set"
                                    type="text"
                                    placeholder="So what is  it gonna be Shimano, SRAM or Campagnolo"
                                    register={register}
                                    errors={errors}
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
