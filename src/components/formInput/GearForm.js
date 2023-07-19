import React, {useEffect, useState} from "react";
import FormInputField from "./FormInputField";
import Button from "../button/Button";
import FormInputSelect from "./FormInputSelect";

function GearForm({onSubmit, register, errors, closeModal, isEditing, initialValue}) {

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

    const bikePartOptions = [
        { label: "Chain", value: "CHAIN" },
        { label: "Cassette", value: "CASSETTE" },
        { label: "Front Tire", value: "FRONTTIRE" },
        { label: "Rear Tire", value: "REARTIRE" },
        { label: "Front Brake Pad", value: "FRONTBRAKEPAD" },
        { label: "Rear Brake Pad", value: "REARBRAKEPAD" }
    ];

    //TODO mijn velden worden niet gereset als ik post of onclose druk

    return (
        <form className='modal-wrapper' onSubmit={onSubmit}>
            <article className='form-wrapper-modal'>

                <div>
                    <FormInputSelect
                        name="partType"
                        label="Part type"
                        options={bikePartOptions}
                        placeholder="choose your type of bike part"
                        register={register}
                    />
                    <FormInputField
                        name="maxDistance"
                        label="Bike part durability"
                        type="number"
                        placeholder="1000.0"
                        register={register}
                        errors={errors}
                        value={formValue.maxDistance}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Maximum distance is required!",
                            }
                        }}
                        onChange={handleChange}
                    />

                    <FormInputField
                        name="installationDate"
                        label="Installation date"
                        type="datetime-local"
                        placeholder=""
                        register={register}
                        errors={errors}
                        value={formValue.installationDate}
                        onChange={handleChange}
                        validationRules={{
                            required: {
                                value: true,
                                message: "Installation date is required!",
                            }
                        }}
                    />
                </div>
            </article>
            {isEditing ? (
                <Button type="submit" className='signin-button' onClick={()=>{
                    console.log(formValue);
                }}>
                    Edit bike part!
                </Button>
            ) : (
                <Button type="submit" className='signin-button' onClick={closeModal}>
                    Add bike part!
                </Button>
            )}
        </form>

    )
}

export default GearForm;