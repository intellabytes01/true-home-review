import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import { InputBox } from '../../formComponents';
import { Formik, getIn } from 'formik';
import { VALIDATION_SCHEMA } from '../../../../constants/ValidationSchema';
import { END_POINT } from '../../../../constants/ApiEndPoints';

const NeighborhoodAdd = ({response,handleNew, toggleNeighborhoodAdd, neighborhoodAdd }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={neighborhoodAdd} toggle={toggleNeighborhoodAdd} style={{ maxWidth: '300px' }}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>New Neighborhood</h2>
                    </div>
                    <div className="popup-body p-4">
                    <div className="popup-body p-4">
                    <span style={{color:`${response.isSuccess ? "green":"red"}`}} >{response.message}</span>
                    <Formik 
                    initialValues={{
                        neighborhood:"",
                        name:"",
                        city:"",
                        state:"",
                        zip:"",
                      
                    }}
                    onSubmit={(values, formikBag)=>handleNew({values,formikBag,moduleName:END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.NEIGHBORHOOD})}
                    validationSchema={VALIDATION_SCHEMA.NEIGHBORHOOD_ADD_UPDATE}
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

                                            value={values.name}
                                            name="name"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.name && errors.name }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="City"
                                            type="text"

                                        

                                            value={values.city}
                                            name="city"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.city && errors.city }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="State"
                                            type="text"

                                            value={values.state}
                                            name="state"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.state && errors.state }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Zip"
                                            type="text"

                                            value={values.zip}
                                            name="zip"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.zip && errors.zip }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="ID"
                                            type="text"                                           

                                            value={values.neighborhood}
                                            name="neighborhood"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.neighborhood && errors.neighborhood }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                            </div>
                            <div className="pop-form-wrapper text-center mt-4">
                                <ButtonPrimary type="submit" btntext="Save" className="button-primary" />
                            </div>
                        </form>
                    )}
                        />
                        </div>
                    </div>
                </ModalBody>
            </div>
        </Modal>
    </div>
);

export default NeighborhoodAdd;