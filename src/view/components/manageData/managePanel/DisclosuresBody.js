import React from 'react';

import ReactLoading from 'react-loading';
import { END_POINT } from '../../../../constants/ApiEndPoints';
import { UserContext } from './UserContext';


const DisclosuresBody = ({ loader, loading, list, clickEdit, clickDelete }) => {


    let dom = null
    // console.log(list);

    if (list.length && loading === false) {

        dom = list.map(item => {
            return <tr key={item.a_ListDisclosureID}>
                <td style={{ maxWidth: '150px' }} className="text-elipsis1">{item.disclosure}</td>
                <td className="table-icon">
                    <UserContext.Consumer>
                        {(props) => {

                            return (+props.userType === 1) ? <>
                                <span onClick={() => clickEdit && clickEdit({ id: item.a_ListDisclosureID, moduleName: END_POINT.MODULE_DATA.MODULES.DISCLOSURE })} className="cursor-pointer">
                                    <i className="icon-edit"></i>
                                </span>
                                <span onClick={() => clickDelete && clickDelete({ context: "Disclosures", id: item.a_ListDisclosureID, name: item.disclosure, module: END_POINT.DELETE_LISTDATA.MODULES.DISCLOSURE })} className="cursor-pointer">
                                    <i className="icon-Remove"></i>
                                </span>
                            </> : null
                        }}
                    </UserContext.Consumer>
                </td>
            </tr>
        })
    }
    else if (loading === true) {

        dom = loader
    }
    else {

        dom = <tr><td>No data found</td></tr>
    }

    return <div className="panel-body">
        <table>
            <thead>
                <tr>
                    <th colSpan="2">Name</th>
                </tr>
            </thead>
            <tbody>
                {dom}
            </tbody>
        </table>
    </div>

}
export default DisclosuresBody


