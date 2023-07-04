import React from "react";
import "./FormInputField.css"

function FormInputField({name, label, type, placeholder, value, register, validationRules}) {
    return (
        <>
            <div>
                <label className='label' htmlFor={`${name}-field`}>{label}</label>
                <input className='input-field'
                       name={name}
                       type={type}
                       id={`${name}-field`}
                       placeholder={placeholder}
                       value={value}
                       {...register(name, validationRules)}
                />
            </div>
        </>
    )
}

export default FormInputField;