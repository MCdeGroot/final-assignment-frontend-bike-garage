import React from "react";
import "./FormInput.css"

function FormInputField({name, label, type, placeholder, value, register, validationRules, errors, onChange}) {

    return (
        <>
            <div>
                <label className='label' htmlFor={`${name}-field`}>{label}</label>
                <input className='input-field'
                       name={name}
                       type={type}
                       id={`${name}-field`}
                       placeholder={placeholder}
                       value={value !== null ? value : ""}
                       {...register(name, validationRules)}
                       onChange={onChange}
                />
                    {errors[name] && <p className="error">{errors[name].message}</p>}
            </div>

        </>
    )
}

export default FormInputField;