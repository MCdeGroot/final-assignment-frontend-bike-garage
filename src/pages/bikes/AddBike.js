import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import FormInputField from "../../components/formInput/FormInputField";
import FormInputSelect from "../../components/formInput/FormInputSelect";
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import MessageModal from "../../components/modal/MessageModal";

function AddBike() {
    const {user} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    async function handleFormSubmit(data) {
        const storedToken = localStorage.getItem('token');
        setLoading(true)
        try {
            const response = await axios.post(`http://localhost:8080/bikes?username=${user.username}`, {
                brand: data.brand,
                model : data.model,
                name: data.name,
                groupSet : data.groupSet,
                bikeType : data.bikeType,
                frameNumber : data.frameNumber
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`
                }
            });
            console.log(response);
            navigate("/bikes")
        } catch (error) {
            setError(true);
            console.error(error);

        }
        setLoading(false);


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
                        {error === true &&
                        <MessageModal
                            message="Something went wrong!"
                            setError = {setError}
                        >
                        </MessageModal>
                        }
                        <article className='form-wrapper'>
                            <div className='form-title'>
                                <h3>Looks like someone got a little present!</h3>
                            </div>
                            <div className='form-input-items'>
                                <FormInputField
                                    name="brand"
                                    label="Brand * "
                                    type="text"
                                    placeholder="Tell me which beautiful brand this bike is from"
                                    register={register}
                                    errors={errors}
                                    defaultValue={null}
                                    validationRules={{
                                    required: {
                                        value: true,
                                        message: "Brand is required!",
                                    },
                                }}
                                />
                                <FormInputField
                                    name="model"
                                    label="Model"
                                    type="text"
                                    placeholder="Which model you bought?"
                                    register={register}
                                    errors={errors}
                                    defaultValue={null}
                                />
                                <FormInputField
                                    name="name"
                                    label="Nickname"
                                    type="text"
                                    placeholder="How do you want to call your beautiful ride?"
                                    register={register}
                                    errors={errors}
                                    defaultValue={null}
                                />
                                <FormInputField
                                    name="groupSet"
                                    label="Group set"
                                    type="text"
                                    placeholder="So what is  it gonna be Shimano, SRAM or Campagnolo"
                                    register={register}
                                    errors={errors}
                                    defaultValue={null}
                                />

                                <FormInputSelect
                                    name="bikeType"
                                    label="Bike type *"
                                    options={options}
                                    register={register}
                                />
                                <FormInputField
                                    name="frameNumber"
                                    label="frameNumber"
                                    type="text"
                                    placeholder="Please fill in your frame number"
                                    register={register}
                                    errors={errors}
                                    defaultValue={null}
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
