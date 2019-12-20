import React from 'react';

const InputBox = ({name,handleChange,handleBlur, formWrapClass, labelText, labelClass, placeholder, inputClass, type,value, inputValue, errorText, errorClass }) => (
    <div className={formWrapClass}>
        <label className={labelClass}>{labelText}</label>
        <input 
        name={name} 
        onBlur={handleBlur && handleBlur} 
        onChange={handleChange && handleChange} 
        type={type} 
        placeholder={placeholder} 
        value={value && value} 
        className={inputClass} />
        <span className={errorClass}>{errorText}</span>
    </div>
);

export default InputBox;