import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// import { countryOptions } from '../common'

const SelectBox = ({ searchable, value, selectClass, name, placeholderText, options, handleChange }) => {


    return (

        <div className={selectClass}>
            <Dropdown placeholder={placeholderText}
                fluid
                search={searchable && searchable}
                selection
                onChange={(event, value) => handleChange(name, value)}
                value={value && value}
                options={options}
            />
        </div>
    )
}

export default SelectBox

