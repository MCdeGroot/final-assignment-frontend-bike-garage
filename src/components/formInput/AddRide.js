import React from "react";
import FormInputField from "./FormInputField";
import Button from "../button/Button";

function AddRide({onSubmit, register, errors, closeModal}) {

    const isBefore = (date) => {
        if (!date) {
            return false;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log(date)
        return date > today;
    };

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
                        validationRules={
                            {
                                required: {
                                    value: true,
                                    message: "Title is required!"
                                }
                            }
                        }
                    />
                    <FormInputField
                        name="subTitleRide"
                        label="Description"
                        type="text"
                        placeholder="Add a description to your ride"
                        register={register}
                        errors={errors}
                    />
                    <FormInputField
                        name="distance"
                        label="Distance"
                        type="number"
                        placeholder="0.0"
                        register={register}
                        errors={errors}
                        validationRules={
                            {
                                required: {
                                    value: true,
                                    message: "Distance is required!"
                                }
                            }
                        }
                    />
                    <FormInputField
                        name="date"
                        label="Date"
                        type="date"
                        placeholder=""
                        register={register}
                        errors={errors}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Date is required!"
                            },
                            validate: {
                                isBefore,
                                message: "Date must be today or in the past"
                            }
                        }}
                    />
                    {/*<FormInputField*/}
                    {/*    name="timeRide"*/}
                    {/*    label="Time"*/}
                    {/*    type="time"*/}
                    {/*    register={register}*/}
                    {/*    errors={errors}*/}
                    {/*/>*/}
                </div>
            </article>
            <Button type="submit"
                    className='signin-button'
                    onClick={closeModal}>
                Add ride!
            </Button>
        </form>

    )
}

export default AddRide;