import React from 'react';
import { END_POINT } from '../../../../constants/ApiEndPoints';
import { UserContext } from './UserContext';
const TagsBody = ({ loading, loader, clickEdit, clickDelete, list }) => {


    let dom = null;

    if (list.length && loading === false) {

        dom = list.map(item => (
            <tr key={item.tagID} >
                <td style={{ maxWidth: '120px' }} className="text-elipsis1">{item.name}</td>
                <td className="table-icon">
                    <UserContext.Consumer>
                        {(props) => {

                            return (+props.userType === 1) ? <>
                                <span onClick={() => clickEdit && clickEdit({ id: item.tagID, moduleName: END_POINT.MODULE_DATA.MODULES.TAG })} className="cursor-pointer">
                                    <i className="icon-edit"></i>
                                </span>
                                <span onClick={() => clickDelete && clickDelete({ context: "Tags", id: item.tagID, name: item.name, module: END_POINT.DELETE_LISTDATA.MODULES.TAGS })} className="cursor-pointer">
                                    <i className="icon-Remove"></i>
                                </span>
                            </> : null
                        }}
                    </UserContext.Consumer>
                </td>
            </tr>))
    } else if (loading === true) {

        dom = loader

    }
    else {
        dom = <tr><td>Data not found</td></tr>
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
export default TagsBody


