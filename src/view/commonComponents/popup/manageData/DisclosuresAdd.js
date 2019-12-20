import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import { InputBox } from '../../formComponents';
import { VALIDATION_SCHEMA } from '../../../../constants/ValidationSchema';
import { Formik } from 'formik';
import { END_POINT } from '../../../../constants/ApiEndPoints';

const DisclosuresAdd = ({response, handleNew, toggleDisclosuresAdd, disclosuresAdd }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={disclosuresAdd} toggle={toggleDisclosuresAdd} style={{ maxWidth: '300px' }}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>New Disclosures</h2>
                    </div>
                    <div className="popup-body p-4">
                    <span style={{color:`${response.isSuccess ? "green":"red"}`}} >{response.message}</span>
                    <Formik 
                    initialValues={{
                        disclosure:"",
                      
                    }}
                    onSubmit={(values, formikBag)=>handleNew({values,formikBag,moduleName:END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.DISCLOSURE})}
                    validationSchema={VALIDATION_SCHEMA.DISCLOSURE_ADD_UPDATE}
                    render={({values, handleSubmit, handleChange, handleBlur, errors, touched})=>(
                        <form onSubmit={handleSubmit}>
                            <div className="pop-form-wrapper">
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">

                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Name"
                                            type="text"
                                            
                                            value={values.disclosure}
                                            name="disclosure"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.disclosure && errors.disclosure }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>

                                </div>

                            </div>


                            <div className="pop-form-wrapper text-center mt-4">
                                <ButtonPrimary type="submit" btntext="Save" className="button-primary" />
                            </div>
                        </form>)}
                        />
                    </div>
                </ModalBody>
            </div>
        </Modal>
    </div>
);

export default DisclosuresAdd;