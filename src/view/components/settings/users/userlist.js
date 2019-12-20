import React from 'react';
import ButtonPrimary from '../../../commonComponents/buttons/ButtonPrimary';
import MaterialIcon from 'material-icons-react';
const UserList = ({ toggleAddNewUser }) => (
    <div className="user-crud-section">
        <div className="user-crud-header  border-bottom">
            <div className="row pb-2">
                <div className="col-md-4 text-left">
                    <span className="usercount">
                        <h5><span className="count">8</span><span>Users</span></h5>
                    </span>
                </div>
                <div className="col-md-8 text-right">
                    <ButtonPrimary btnText={'Add New'} className={'button-primary'} onClick={toggleAddNewUser} />
                </div>
            </div>
        </div>
        <ul className="list-unstyled">
            <li>
                <span className="user-name">javier Washingtop</span>
                <span className="user-email"><strong className="email">javierwashington@truhome.com</strong></span>
                <span className="trash">
                    <MaterialIcon icon="close" />
                </span>
            </li>
            <li>
                <span className="user-name">javier Washingtop</span>
                <span className="user-email"><strong className="email">javierwashington@truhome.com</strong></span>
                <span className="trash">
                    <MaterialIcon icon="close" />
                </span>
            </li>
            <li>
                <span className="user-name">javier Washingtop</span>
                <span className="user-email"><strong className="email">javierwashington@truhome.com</strong></span>
                <span className="trash">
                    <MaterialIcon icon="close" />
                </span>
            </li>
            <li>
                <span className="user-name">javier Washingtop</span>
                <span className="user-email"><strong className="email">javierwashington@truhome.com</strong></span>
                <span className="trash">
                    <MaterialIcon icon="close" />
                </span>
            </li>
        </ul>
    </div>
);

export default UserList;