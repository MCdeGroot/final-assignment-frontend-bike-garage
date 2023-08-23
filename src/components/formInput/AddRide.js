import React, {useEffect, useState} from "react";
import FormInputField from "./FormInputField";
import Button from "../button/Button";
import FormInputSelect from "./FormInputSelect";
import {isBefore} from "../../helper/dateValidation";

function AddRide({onSubmit, register, errors, closeModal, userBikesData, isEditing, initialValue}) {

    const [formValue, setFormValues] = useState(initialValue);

    useEffect(() => {
        setFormValues(initialValue); // Update the form values when the initial value changes
    }, [initialValue]);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormValues((previousValue) => ({
            ...previousValue,
            [name]: value,
        }));
    }

    function generateOptions() {
        return userBikesData.map((bike) => ({
            label: `${bike.brand} ${bike.model}`,
            value: bike.id
        }));
    }

    const options = generateOptions();

    return (
        <form className='modal-wrapper' onSubmit={onSubmit}>
            <article className='form-wrapper-modal'>

                <div>
                    <FormInputField
                        name="titleRide"
                        label="Ride Title"
                        type="text"
                        placeholder="Add a title"
                        register={register}
                        errors={errors}
                        value={formValue.titleRide}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Title is required!",
                            },
                        }}
                        onChange={handleChange}
                    />
                    <FormInputField
                        name="subTitleRide"
                        label="Description"
                        type="text"
                        placeholder="Add a description to your ride"
                        register={register}
                        errors={errors}
                        value={formValue.subTitleRide}
                        onChange={handleChange}
                    />
                    <FormInputField
                        name="distance"
                        label="Distance"
                        type="number"
                        placeholder="0.0"
                        register={register}
                        errors={errors}
                        value={formValue.distance}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Distance is required!",
                            },
                            min: {
                                value: 0.01,
                                message: "Distance must be greater than 0!",
                            }
                        }}
                        onChange={handleChange}
                    />
                    <FormInputField
                        name="date"
                        label="Date"
                        type="datetime-local"
                        placeholder=""
                        register={register}
                        errors={errors}
                        value={formValue.date}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Date is required!",
                            },
                            validate: isBefore
                        }}
                        onChange={handleChange}
                        // validationRules={...}
                    />
                    <FormInputField
                        name="averagePower"
                        label="Average power"
                        type="number"
                        placeholder="0.0"
                        register={register}
                        errors={errors}
                        value={formValue.averagePower}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Power input is required!",
                            },
                            min: {
                                value: 0.01, // De minimale waarde die groter moet zijn dan 0
                                message: "Power input must be greater than 0!",
                            }
                        }}
                        onChange={handleChange}
                    />
                    <FormInputField
                        name="normalizedPower"
                        label="Normalized power"
                        type="number"
                        placeholder="0.0"
                        register={register}
                        errors={errors}
                        value={formValue.normalizedPower}
                        validationRules={{
                            min: {
                                value: 0.01, // De minimale waarde die groter moet zijn dan 0
                                message: "Power input must be greater than 0!",
                            }
                        }}
                        onChange={handleChange}
                    />
                    <FormInputField
                        name="timeRide"
                        label="Duration"
                        type="time"
                        register={register}
                        errors={errors}
                        value={formValue.timeRide}
                        onChange={handleChange}
                    />
                    <FormInputSelect
                        name="bikeId"
                        label="Bike"
                        options={options}
                        placeholder="choose your bike"
                        register={register}
                    />
                </div>
            </article>
            {isEditing ? (
                <Button type="submit" className='signin-button'>
                    Edit ride!
                </Button>
            ) : (
                <Button type="submit" className='signin-button' onClick={closeModal}>
                    Add ride!
                </Button>
            )}
        </form>

    )
}

export default AddRide;