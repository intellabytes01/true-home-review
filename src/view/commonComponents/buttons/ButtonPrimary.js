import React from 'react';
const ButtonPrimary = ({type, btntext,disabled, className, onClick }) => (
    <button 
    btntext={btntext} 
    type={type}
    disabled={ (disabled)? true:false} 
    className={className} 
    onClick={() => onClick && onClick()} >
    {btntext}
    
    </button>
);

export default ButtonPrimary;