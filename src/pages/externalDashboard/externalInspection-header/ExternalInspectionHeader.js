import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import SelectBox from '../../../view/commonComponents/formComponents/selectBox/SelectBox';
import SearchBox from '../../../view/commonComponents/formComponents/searchBox/SearchBox';


// select option


const ExternalInspectionsHeader = React.forwardRef((props, ref) => {




    const allJobOption = [
        { value: '', text: 'All Jobs' },
        { value: 'week', text: 'Week' },
        { value: 'month', text: 'Month' },
        { value: 'year', text: 'Year' },
    ]

    return (<>
        <div className="inspections">
            <div className="">
                <div className="topHeader clearfix pl-5 pr-5">
                    <h2 className="external-inspection-heading">Inspections</h2>
                </div>
            </div>
            <div className="inspection-header clearfix">
                <div className="hide-on-condition">
                    <div className="inspection-filter-wrapper">
                        <a href="javascript:void(0)" className={`btn-toggle ${props.isCompleted === 0 ? "active" : ""} `} onClick={props.changeToScheduleList}>Scheduled</a>
                        <a href="javascript:void(0)" className={`btn-toggle ${props.isCompleted === 1 ? "active" : ""}  `} onClick={props.changeToCompleteList} >Completed</a>
                    </div>
                    <div className="inspection-btn-wrapper">
                        <ul>
                            <li className="mr-4">
                                <SearchBox value={props.filter.searchText} handleSearch={props.handleSearch} ref={ref} className='search-box' searchOuterClass='search-wrapper external-search' placeholder='Search' />
                            </li>
                            <li>
                                <SelectBox
                                    selectClass="wrapper-searchable transparent-select"
                                    placeholderText="All Jobs"
                                    options={allJobOption}
                                    searchable={false}
                                    value={props.filter.timePeriod}
                                    handleChange={props.handleTimeChange}
                                />

                            </li>

                            <li className="ml-3">
                                <i onClick={() => props.changeListView("grid")} className={`icon-grid icon-font-size cursor-pointer ${props.className === "grid" ? "active" : ""} `}></i>
                            </li>
                            <li className="ml-3">
                                <i onClick={() => props.changeListView("list")} className={`icon-list icon-font-size cursor-pointer ${props.className === "list" ? "active" : ""}`}></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </>)
})

export default ExternalInspectionsHeader