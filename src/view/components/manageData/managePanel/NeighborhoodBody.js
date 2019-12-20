import React from 'react';
import { END_POINT } from '../../../../constants/ApiEndPoints';
import { UserContext } from './UserContext';
const NeighborhoodBody = ({ loader, loading, clickEdit, clickDelete, list }) => {

    let dom = null;

    //    console.log(list, list.length);

    if (list.length && loading === false) {

        dom = list.map(item => (
            <tr key={item.neighborhoodID}>
                <td style={{ maxWidth: '120px' }} className="text-elipsis1">{item.name}</td>
                <td style={{ maxWidth: '80px' }} className="text-elipsis1">{item.city}</td>
                <td style={{ maxWidth: '80px' }} className="text-elipsis1">{item.state}</td>
                <td style={{ maxWidth: '50px' }} className="text-elipsis1">{item.zip}</td>
                <td style={{ maxWidth: '85px' }} className="text-elipsis1">{item.neighborhood}</td>
                <td className="table-icon">
                    <UserContext.Consumer>
                        {(props) => {

                            return (+props.userType === 1) ? <>
                                <span onClick={() => clickEdit && clickEdit({ id: item.neighborhoodID, moduleName: END_POINT.MODULE_DATA.MODULES.NEIGHBORHOOD })} className="cursor-pointer">
                                    <i className="icon-edit"></i>
                                </span>
                                <span onClick={() => clickDelete && clickDelete({ context: "Neighborhood", id: item.neighborhoodID, name: item.name, module: END_POINT.DELETE_LISTDATA.MODULES.NEIGHBORHOOD })} className="cursor-pointer">
                                    <i className="icon-Remove"></i>
                                </span>
                            </>
                                : null
                        }}
                    </UserContext.Consumer>
                </td>
            </tr>))
    } else if (loading === true) {

        dom = loader
    } else {

        dom = <tr><td>No data found</td></tr>
    }

    return <>
        <div className="panel-body">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th colSpan="2">ID</th>
                    </tr>
                </thead>
                <tbody>
                    {dom}
                </tbody>
            </table>
        </div>
    </>
}
export default NeighborhoodBody


