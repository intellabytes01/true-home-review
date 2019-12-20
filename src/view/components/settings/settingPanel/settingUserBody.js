import React from 'react';
import { END_POINT } from '../../../../constants/ApiEndPoints';
const SettingUserBody = ({ loading, loader, list, panelHeaderClass, Heading, clickEdit, clickDelete }) => {

    let dom = null
    // console.log(list);

    if (list.length && loading === false) {

        dom = list.map(item => {
            return <tr key={item.userID}>
                <td style={{ maxWidth: '120px' }} className="text-elipsis1"><strong>{item.firstName + " " + item.lastName}</strong></td>
                <td style={{ maxWidth: '120px' }} className="text-elipsis1">{item.email}</td>

                <td className="table-icon">
                    <span onClick={() => clickEdit && clickEdit({ id: item.userID, moduleName: END_POINT.MODULE_DATA.MODULES.USER })} className="cursor-pointer">
                        <i className="icon-edit"></i>
                    </span>
                    <span onClick={() => clickDelete && clickDelete({ context: "Users", id: item.userID, name: item.firstName + " " + item.lastName, module: END_POINT.DELETE_LISTDATA.MODULES.USERS })} className="cursor-pointer">
                        <i className="icon-Remove"></i>
                    </span>
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
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>

                </tr>
            </thead>
            <tbody>
                {dom}
            </tbody>
        </table>
    </div>
}
export default SettingUserBody


