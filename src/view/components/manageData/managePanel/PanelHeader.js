import React from 'react';
import SearchBox from '../../../commonComponents/formComponents/searchBox/SearchBox';
import ReactDropzone from "react-dropzone";
import { END_POINT } from '../../../../constants/ApiEndPoints';
import { UserContext } from './UserContext';


const PanelHeader = React.forwardRef(function ({ importCSV, moduleName, panelHeaderClass, handleSearch, Heading, clickAdd, userType }, ref) {

    // console.log(userType);

    return <div className="panel-header">
        <ul className={panelHeaderClass}>
            <li>
                <h2>{Heading}</h2>
            </li>
            <li className="ml-auto">
                <SearchBox handleSearch={handleSearch} ref={ref} className='search-box' searchOuterClass='search-wrapper' placeholder='Search' />
            </li>
            <UserContext.Consumer>
                {(props) => {

                    return (+props.userType === 1) ?<> <li>
                        {/* <span className="cursor-pointer">
                                    <i className="icon-CSV"></i> */}
                        {
                            importCSV && <ReactDropzone
                                accept=".csv"
                                onDrop={(event) => importCSV && importCSV(event, moduleName)}
                            >
                                {
                                    ({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <span className="cursor-pointer">
                                                <i className="icon-CSV"></i>
                                            </span>
                                        </div>
                                    )
                                }

                            </ReactDropzone>

                        }
                        {/* </span> */}
                    </li>
                        <li>
                            <span onClick={() => clickAdd && clickAdd()} className="cursor-pointer">
                                <i className="icon-add"></i>
                            </span>

                        </li></>
                        
                                     : null
                }
                }
            </UserContext.Consumer>
        </ul>
    </div>
})

export default PanelHeader;