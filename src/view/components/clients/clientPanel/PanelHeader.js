import React from 'react';
const PanelHeader = ({ panelHeaderClass, Heading, clickEdit, address }) => (
    <>
        <div className="panel-header">
            <ul className={panelHeaderClass}>
                <li>
                    <h2>{Heading}</h2>
                </li>
                <li>
                    <small className="">{address.street + ' '+address.city +', '+ address.state+' '+address.zip}</small>
                </li>
                <li></li>
                <li className="">
                    <span onClick={() => clickEdit && clickEdit()} className="cursor-pointer">
                        <i className="icon-edit"></i>
                    </span>
                    {/* <span onClick={() => clickAdd && clickAdd()}>
                        <i className="icon-add"></i>
                    </span> */}
                </li>
            </ul>
        </div>
    </>
);

export default PanelHeader;