import React from "react";
import './Button.css';


function Button({children, type, onClick, onMouseDown, onMouseUp,className}) {


    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            {children}
        </button>
    )
}
export default Button;