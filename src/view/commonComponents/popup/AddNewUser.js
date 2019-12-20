import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { InputBox } from '../formComponents';

const AddNewUser = ({ toggleAddNewUser, addNewUser }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={addNewUser} toggle={toggleAddNewUser} style={{ maxWidth: '300px' }}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>Add New User</h2>
                    </div>
                    <div className="popup-body p-4">
                        <form>
                            <div className="pop-form-wrapper">
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Name"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText="Error Text"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Email"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText="Error Text"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Password"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText="Error Text"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Confirm Password"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText="Error Text"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                            </div>

                            <div className="pop-form-wrapper text-center mt-2">
                                <ButtonPrimary btnText="Save" className="button-primary" />
                            </div>
                        </form>
                    </div>
                </ModalBody>
            </div>
        </Modal>
    </div>
);

export default AddNewUser;