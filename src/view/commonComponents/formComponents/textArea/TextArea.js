import React from 'react';

const TextArea = ({ formWrapClass, labelText, labelClass, placeholder, inputClass, errorText, errorClass }) => (
    <div className={formWrapClass}>
        <label className={labelClass}>{labelText}</label>
        <textarea placeholder={placeholder} className={inputClass} ></textarea>
        <span className={errorClass}>{errorText}</span>
    </div>
);
export default TextArea;