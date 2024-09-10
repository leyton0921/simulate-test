import React from "react";
import { ItextAreaProps } from "../../UI/ItextArea";

const TextArea: React.FC<ItextAreaProps> = ({ label, id, value, onChange}) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <textarea id={id} 
                value={value} 
                onChange={onChange} 
            />
        </div>
    );
}

export default TextArea;