import React from 'react';
import ClientInfo from './ClientInfo';
const ClientCard = ({ }) => (
    <div className="ClientCard mb-2">
        <div className="cl-card-header position-relative">
            <ul className="list-unstyled m-0">
                <li><h6>Main Street Reality</h6></li>
                <li><span><strong>Edit</strong></span></li>
            </ul>
        </div>
        <div className="cl-card-body">
        <ClientInfo/>
        <ClientInfo/>
        </div>
    </div>
);
export default ClientCard;