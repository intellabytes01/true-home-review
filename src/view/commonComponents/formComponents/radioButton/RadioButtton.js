import React from 'react';

const RadioButton = ({ formWrapClass, labelText, labelClass, type, name, value, inputClass, radioWrapper, radioLabelClass, radioText, errorText, errorClass }) => (
    <div className={formWrapClass}>
        <label className={labelClass}>{labelText}</label>
        <div className={radioWrapper}>
            <input type={type} name={name} value={value} checked className={inputClass} /><span className={radioLabelClass}>{radioText}</span>
        </div>
        <span className={errorClass}>{errorText}</span>
    </div>
);

export default RadioButton;