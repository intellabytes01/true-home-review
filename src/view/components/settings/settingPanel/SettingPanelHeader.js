import React from 'react';
import SearchBox from '../../../commonComponents/formComponents/searchBox/SearchBox';
const SettingPanelHeader = React.forwardRef(({ panelHeaderClass, handleSearch, Heading, userCount, clickAdd }, ref) => {
    
       return <div className="panel-header">
            <ul className={panelHeaderClass}>
                <li>
                    <h2>{Heading}<span>({userCount})</span></h2>
                </li>
                <li className="ml-auto">
                    <SearchBox 
                    handleSearch={handleSearch}
                    className='search-box'
                    ref={ref}
                    searchOuterClass='search-wrapper' placeholder='Search' />
                </li>
                <li >
                    <span onClick={() => clickAdd && clickAdd()} className="cursor-pointer">
                        <i className="icon-add"></i>
                    </span>
                </li>
            </ul>
        </div>
    
})

export default SettingPanelHeader;