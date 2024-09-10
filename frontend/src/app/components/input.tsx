import React from "react";
import { IinputProps } from "../../UI/Iinput";

const Input: React.FC<IinputProps> = ({  type, placeholder, id, value, onChange, className,name}) => {
    return (
        <div className={className}>

            <input 
                type={type} 
                placeholder={placeholder}
                id={id} 
                name={name}
                value={value} 
                onChange={onChange} 
                className={className}
              

            />
        </div>
    );
}

export default Input;