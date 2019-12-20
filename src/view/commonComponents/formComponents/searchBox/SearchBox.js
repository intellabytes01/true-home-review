import React from 'react';

const SearchBox = React.forwardRef(({ type, placeholder, value, className, searchOuterClass, handleSearch }, ref ) => {
    
    return <div className={searchOuterClass}>
        {/* <label className={labelClass}>{labelText}</label> if Require please un-comment the label  */}
        <input 
        type={ type && type} 
        ref={ ref && ref} 
        onChange={handleSearch && handleSearch} 
        placeholder={placeholder && placeholder} 
        value={value && value} 
        className={className && className} />
        {/* <span className={errorClass}>{errorText}</span> if Require please un-comment the error span */}
    </div>
})

export default SearchBox;