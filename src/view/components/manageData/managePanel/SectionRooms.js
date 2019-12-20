import React from 'react';
import { END_POINT } from '../../../../constants/ApiEndPoints';
import { UserContext } from './UserContext';
const SectionRooms = ({ list, loading, loader, clickEdit, clickDelete }) => {

    let dom = null
    // console.log(list);

    if (list.length && loading === false) {

        dom = list.map(item => {
            return <tr key={item.a_ListSectionRoomID}>
                <td style={{ maxWidth: '80px' }} className="text-elipsis1">{item.sectionName}</td>
                <td style={{ maxWidth: '80px' }} className="text-elipsis1">{item.roomName}</td>
                <td className="table-icon">
                    <UserContext.Consumer>
                        {(props) => {

                            return (+props.userType === 1) ? <>
                                <span onClick={() => clickEdit && clickEdit({ id: item.a_ListSectionRoomID, moduleName: END_POINT.MODULE_DATA.MODULES.SECTION_ROOM })} className="cursor-pointer">
                                    <i className="icon-edit"></i>
                                </span>
                                <span onClick={() => clickDelete && clickDelete({ context: "Section Rooms", id: item.a_ListSectionRoomID, name: item.sectionName, module: END_POINT.DELETE_LISTDATA.MODULES.SECTION_ROOMS })} className="cursor-pointer">
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
                    <th>Section Name</th>
                    <th colSpan="2">Room Name</th>
                </tr>
            </thead>
            <tbody>
                {dom}
            </tbody>
        </table>
    </div>
}
export default SectionRooms


