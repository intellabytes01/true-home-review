import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import { InputBox } from '../../formComponents';
import { VALIDATION_SCHEMA } from '../../../../constants/ValidationSchema';
import { END_POINT } from '../../../../constants/ApiEndPoints';
import { Formik } from 'formik';

const BuilderEdit = ({response,handleEdit, data, toggleBuilderEdit, builderEdit }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={builderEdit} toggle={toggleBuilderEdit} style={{ maxWidth: '300px' }}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>Edit Builder</h2>
                    </div>
                    <div className="popup-body p-4">
                    <span style={{color:`${response.isSuccess ? "green":"red"}`}} >{response.message}</span>
                    <Formik 
                    initialValues={ 
                       (data) ?{...data} :{
                        firstName:"",
                        lastName:"",
                        email:"",
                        phone:"",
                      
                    }}
                    onSubmit={(values, formikBag)=>handleEdit({values,formikBag,moduleName:END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.BUILDER})}
                    validationSchema={VALIDATION_SCHEMA.BUILDER_ADD_UPDATE}
                    render={({values, handleSubmit, handleChange, setFieldTouched,setFieldValue,setFieldError, handleBlur, errors, touched})=>(
                        <form onSubmit={handleSubmit}>
                            <div className="pop-form-wrapper">
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="First Name"
                                            type="text"
                                            
                                            value={values.firstName}
                                            name="firstName"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.firstName && errors.firstName }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Last Name"
                                            type="text"
                                            
                                            value={values.lastName}
                                            name="lastName"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.lastName && errors.lastName }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Phone"
                                            type="number"

                                            value={values.phone}
                                            name="phone"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.phone && errors.phone }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Email"
                                            type="email"
                                            
                                            value={values.email}
                                            name="email"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.email && errors.email }

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

export default BuilderEdit;