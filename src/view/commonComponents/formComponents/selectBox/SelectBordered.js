import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// import { countryOptions } from '../common'

const SelectBordered = ({ searchable, value, errorClass, errorText, name, placeholderText, options, handleChange, formWrapClass, labelClass, labelText }) => {


    return (
        <div className={formWrapClass}>
            <label className={labelClass}>{labelText}</label>
            <div className="wrapper-searchable">
                <Dropdown placeholder={placeholderText}
                    fluid
                    search={searchable && searchable}
                    selection
                    onChange={(event, value) => handleChange(name, value.value)}
                    value={value && value}
                    options={options}
                />
                <span className={errorClass}>{errorText}</span>
            </div>
        </div>
    )
}

export default SelectBordered

