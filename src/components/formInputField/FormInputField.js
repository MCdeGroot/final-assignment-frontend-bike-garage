import React from "react";

function FormInputField({name, label, type, value, register, validationRules}) {
    return (
        <>
            <label className='label' htmlFor={`${name}-field`}>{label}</label>
            <input className='input-field'
                   name={name}
                   type={type}
                   id={`${name}-field`}
                   value={value}
                   {...register(name, validationRules)}
            />
        </>
    )
}

export default FormInputField;