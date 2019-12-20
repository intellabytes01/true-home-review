import React from 'react';
import { END_POINT } from '../../../../constants/ApiEndPoints';
import { UserContext } from './UserContext';
const RoomItem = ({ list, loading, loader, clickEdit, clickDelete }) => {

    let dom = null
    // console.log(list);

    if (list.length && loading === false) {

        dom = list.map(item => {
            return <tr key={item.a_ListRoomItemID} >
                <td style={{ maxWidth: '120px' }} className="text-elipsis1">{item.roomItemName}</td>
                <td style={{ maxWidth: '120px' }} className="text-elipsis1">{item.roomName}</td>
                <td className="table-icon">
                    <UserContext.Consumer>
                        {(props) => {

                            return (+props.userType === 1) ? <>
                                <span onClick={() => clickEdit && clickEdit({ id: item.a_ListRoomItemID, moduleName: END_POINT.MODULE_DATA.MODULES.ROOM_ITEM })} className="cursor-pointer">
                                    <i className="icon-edit"></i>
                                </span>
                                <span onClick={() => clickDelete && clickDelete({ context: "Section Item", id: item.a_ListRoomItemID, name: item.roomItemName, module: END_POINT.DELETE_LISTDATA.MODULES.ROOM_ITEMS })} className="cursor-pointer">
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
                    <th>Section Item Name</th>
                    <th colSpan="2">Section Name</th>
                </tr>
            </thead>
            <tbody>
                {dom}
            </tbody>
        </table>
    </div>
}
export default RoomItem


