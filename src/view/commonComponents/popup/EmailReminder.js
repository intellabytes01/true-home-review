import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { TextArea } from '../formComponents';
import SearchAbleSelect from '../formComponents/searchableSelect/SearchableSelect';

const inspectorOption = [
    { value: 'Inspector_1', text: 'Inspector_1' },
    { value: 'Inspector_2', text: 'Inspector_2' },
    { value: 'Inspector_3', text: 'Inspector_3' }
];

const lotIdOption = [
    { value: 'lot_ID_1', text: 'lot_ID_1' },
    { value: 'lot_ID_2', text: 'lot_ID_2' },
    { value: 'lot_ID_3', text: 'lot_ID_3' }
];



const EmailReminder = ({ toggleEmailReminder, emailReminder }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={emailReminder} toggle={toggleEmailReminder}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>Email Reminder</h2>
                    </div>
                    
                </ModalBody>
            </div>
        </Modal>
    </div>
);

export default EmailReminder;