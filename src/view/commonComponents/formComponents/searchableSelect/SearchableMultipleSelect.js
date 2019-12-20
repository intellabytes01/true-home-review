

import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// import { countryOptions } from '../common'

const SearchableMultipleSelect = ({callApi,setFieldTouched,handleDepDropdown,isLoading, value,setFieldValue,setFieldError ,name, handleBlur, handleChange, options, placeholderText, formWrapClass, labelText, labelClass, errorClass, errorText, isMultiple  }) => {
    
   
    return (
        <div className={formWrapClass}>
            <label className={labelClass}>{labelText}</label>
            <div className="wrapper-searchable">
            {/* {JSON.stringify(value)} */}
                <Dropdown placeholder={placeholderText}
                    fluid
                    search
                    multiple={isMultiple}
                    selection
                    onChange={(event,value)=>{
                        if(callApi && setFieldValue && value.value){

                            handleDepDropdown(value.value)
                        }
                        if(setFieldValue){

                            setFieldValue(name,value.value)
                        }
                        
                    }}
                    onBlur={(event,value)=>{

                        if(setFieldTouched){
                            setFieldTouched(name,true,true) // MAKE FIELD TOUCHED TO SHOW ERRORS
                        }
                    }}
                    value={ value &&  value}
                    loading={ callApi && isLoading }
                    disabled={callApi && isLoading}
                    options={options} />
            </div>
            <span className={errorClass}>{errorText}</span>
        </div>
    )
}

export default SearchableMultipleSelect

