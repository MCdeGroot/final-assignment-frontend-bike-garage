import React from "react";
import "./FormInput.css"

function FormInputSelect({name, label, value, register, validationRules, options, defaultValue, placeholder}) {
    return (
        <>
            <div className='input-wrapper'>
                <label className='label' htmlFor={`${name}-field`}>{label}</label>
                <select className='input-field'
                        name={name}
                        id={`${name}-field`}
                        value={value}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        {...register(name, validationRules)}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default FormInputSelect;