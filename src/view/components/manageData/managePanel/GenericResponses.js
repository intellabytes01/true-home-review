import React from 'react';
import { END_POINT } from '../../../../constants/ApiEndPoints';
import { UserContext } from './UserContext';
const GenericResponses = ({ list, loader, loading, clickEdit, clickDelete }) => {

    let dom = null
    // console.log(list);

    if (list.length && loading === false) {

        dom = list.map(item => {
            return <tr key={item.a_ListGenericResponseID}>
                <td style={{ maxWidth: '120px' }} className="text-elipsis1">{item.defect_name}</td>
                <td style={{ maxWidth: '120px' }} className="text-elipsis1">{item.response}</td>
                <td className="table-icon">
                    <UserContext.Consumer>
                        {(props) => {

                            return (+props.userType === 1) ? <>
                                <span onClick={() => clickEdit && clickEdit({ id: item.a_ListGenericResponseID, moduleName: END_POINT.MODULE_DATA.MODULES.GENERIC })} className="cursor-pointer">
                                    <i className="icon-edit"></i>
                                </span>
                                <span onClick={() => clickDelete && clickDelete({ context: "Generic Responses", id: item.a_ListGenericResponseID, name: item.defect_name, module: END_POINT.DELETE_LISTDATA.MODULES.GENERIC })} className="cursor-pointer">
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
                    <th>Defect Name</th>
                    <th colSpan="2">Response</th>
                </tr>
            </thead>
            <tbody>
                {dom}
            </tbody>
        </table>
    </div>
}
export default GenericResponses


