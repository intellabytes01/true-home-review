import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../buttons/ButtonPrimary';

const DeleteConfirmation = ({deleteData, deleteConfirm, toggleDeleteConfirmation, deleteConfirmation }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={deleteConfirmation} toggle={toggleDeleteConfirmation} style={{ maxWidth: '400px' }}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>

                    <div className="popup-body p-4">
                        <form>
                            <div className="pop-form-wrapper">
                                <div className="row">
                                    <div className="col-3">
                                        <i className="icon-warning-alert"></i>
                                    </div>
                                    <div className="col-9">
                                        <h2 className="heading-confirmation">Delete Entry</h2>
                                        <p>Are you Sure you want to remove <strong>{ deleteConfirm && deleteConfirm['name']}</strong> From <strong>{deleteConfirm && deleteConfirm['context']}</strong>?</p>
                                    </div>
                                </div>
                            </div>


                            <div className="pop-form-wrapper text-center mt-4 d-flex justify-content-around">
                                <ButtonPrimary btntext="Yes" type="button" onClick={deleteData} className="button-primary m-2" />
                                <ButtonPrimary btntext="Cancel" type="button" onClick={()=>toggleDeleteConfirmation({})} className="button-primary m-2" />
                            </div>
                        </form>
                    </div>
                </ModalBody>
            </div>
        </Modal>
    </div>
);

export default DeleteConfirmation;