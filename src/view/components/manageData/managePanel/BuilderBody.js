import React from 'react';
import { END_POINT } from '../../../../constants/ApiEndPoints';
import { UserContext } from './UserContext';
const BuilderBody = ({ loading, loader, clickEdit, clickDelete, list }) => {

    let dom = null

    if (list.length && loading === false) {

        dom = list.map(item => {
            return <tr key={item.userID}>
                <td style={{ maxWidth: '100px' }} className="text-elipsis1">{item.firstName + " " + item.lastName}</td>
                <td style={{ maxWidth: '100px' }} className="text-elipsis1">{item.phone}</td>
                <td style={{ maxWidth: '120px' }} className="text-elipsis1">{item.email}</td>
                <td className="table-icon">
                    <UserContext.Consumer>
                        {(props) => {

                            return (+props.userType === 1) ? <>
                                <span onClick={() => clickEdit && clickEdit({ id: item.userID, moduleName: END_POINT.MODULE_DATA.MODULES.BUILDER })} className="cursor-pointer">
                                    <i className="icon-edit"></i>
                                </span>
                                <span onClick={() => clickDelete && clickDelete({ context: "Builders", id: item.userID, name: item.firstName + " " + item.lastName, module: END_POINT.DELETE_LISTDATA.MODULES.BUILDERS })} className="cursor-pointer">
                                    <i className="icon-Remove"></i>
                                </span>
                            </> : null
                        }}
                    </UserContext.Consumer>
                </td>
            </tr>
        })
    } else if (loading === true) {

        dom = loader
    }
    else {

        dom = <tr><td>No data found</td></tr>
    }

    return <div className="panel-body">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th colSpan="2">Email</th>
                </tr>
            </thead>
            <tbody>
                {dom}
            </tbody>
        </table>
    </div>

}
export default BuilderBody


