import React, {useEffect, useState} from "react";
import FormInputField from "./FormInputField";
import Button from "../button/Button";
import FormInputSelect from "./FormInputSelect";
import UploadFile from "../uploadFile/UploadFile";

function AddRide({onSubmit, register, errors, closeModal, userBikesData, isEditing, initialValue}) {

    const [formValue, setFormValues] = useState(initialValue);

    useEffect(() => {
        console.log(formValue)
        setFormValues(initialValue); // Update the form values when the initial value changes
    }, [initialValue]);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormValues((previousValue) => ({
            ...previousValue,
            [name]: value,
        }));
    };

    const isBefore = (date) => {
        if (!date) {
            return false;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return date > today;
    };

    function generateOptions() {
        return userBikesData.map((bike) => ({
            label: `${bike.brand} ${bike.model}`,
            value: bike.id
        }));
    }

    const options = generateOptions();

    //TODO mijn velden worden niet gereset als ik post of onclose druk

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
                <Button type="submit" className='signin-button' onClick={()=>{
                    console.log(formValue);
                }}>
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