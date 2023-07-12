import React from "react";
import './Button.css';


function Button({children, type, onClick, onMouseDown, onMouseUp,className, disabled}) {


    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
export default Button;