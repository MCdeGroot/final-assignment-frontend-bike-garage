import React from "react";
import FormInputField from "./FormInputField";
import Button from "../button/Button";
import FormInputSelect from "./FormInputSelect";

function AddRide({onSubmit, register, errors, closeModal, userBikesData}) {

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
                    {/*<FormInputField*/}
                    {/*    name="date"*/}
                    {/*    label="Date"*/}
                    {/*    type="date"*/}
                    {/*    placeholder=""*/}
                    {/*    register={register}*/}
                    {/*    errors={errors}*/}
                    {/*    // validationRules={{*/}
                    {/*    //     required: {*/}
                    {/*    //         value: true,*/}
                    {/*    //         message: "Date is required!"*/}
                    {/*    //     }*/}
                    {/*    //     // ,*/}
                    {/*    //     // validate: {*/}
                    {/*    //     //     isBefore,*/}
                    {/*    //     //     message: "Date must be today or in the past"*/}
                    {/*    //     // }*/}
                    {/*    // }}*/}
                    {/*/>*/}
                    <FormInputField
                        name="averagePower"
                        label="Average power"
                        type="number"
                        placeholder="0.0"
                        register={register}
                        errors={errors}
                        validationRules={
                            {
                                required: {
                                    value: true,
                                    message: "Power input is required!"
                                }
                            }
                        }
                    />
                    <FormInputField
                        name="normalizedPower"
                        label="Normalized power"
                        type="number"
                        placeholder="0.0"
                        register={register}
                        errors={errors}
                    />
                    {/*<FormInputField*/}
                    {/*    name="timeRide"*/}
                    {/*    label="Duration"*/}
                    {/*    type="time"*/}
                    {/*    register={register}*/}
                    {/*    errors={errors}*/}
                    {/*/>*/}
                    <FormInputSelect
                        name="bikeId"
                        label="Bike"
                        options={options}
                        defaultValue={undefined}
                        placeholder = "choose your bike"
                        register={register}
                    />
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