import React from "react";
import './Button.css';


function Button({children, type, onClick, className}) {


    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default Button;