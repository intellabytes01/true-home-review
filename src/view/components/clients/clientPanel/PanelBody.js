import React from 'react';
const PanelBody = ({ sendInvite, resMsg, bkey, panelHeaderClass, users, contacts, Heading, clickEdit, clickDelete, type }) => (
    <>
        <div className="panel-body" key={bkey}>
            <table>
                <thead>
                    <tr>
                        <th className="w-30">User Name</th>
                        <th className="w-20">Title</th>
                        <th className="w-20">Phone</th>
                        <th className="w-20">Email</th>
                        <th className="w-10">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(item => {

                        return <tr key={item.userID}>
                            <td className="w-30">
                                <div className="text-elipsis" title={item.firstName + " " + item.lastName} >
                                    {item.firstName + " " + item.lastName}
                                </div>
                            </td>
                            <td className="w-20">{item.title}</td>
                            <td className="w-20">{item.phone}</td>
                            <td className="w-20">{item.email}</td>
                            {(type === 1) ? <td className="w-10"> <a onClick={() => sendInvite(item.userID)} href="javascript:void(0)" >Send Invite</a> </td> : null}

                        </tr>
                    })}

                </tbody>
                <thead>
                    <tr>
                        <th className="w-30">Contact Name</th>
                        <th className="w-20">Title</th>
                        <th className="w-20">Phone</th>
                        <th className="w-30" colSpan="2">Email</th>

                    </tr>
                </thead>
                <tbody>

                    {contacts && contacts.map(item => {

                        return <tr>
                            <td className="w-30"><div className="text-elipsis" title={item.name}>{item.name}</div></td>
                            <td className="w-20">{item.title}</td>
                            <td className="w-20">{item.phone}</td>
                            <td className="w-20" colSpan="2">{item.email}</td>
                            {(type === 2) ? <td className="w-10"> <a href="javascript:void(0)" >Send Invite</a> </td> : null}
                        </tr>
                    })}

                </tbody>
            </table>

            <table>

            </table>
        </div>
    </>
);
export default PanelBody


