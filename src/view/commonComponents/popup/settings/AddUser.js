import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import { InputBox } from '../../formComponents';
import SearchAbleSelect from '../../formComponents/searchableSelect/SearchableSelect';
import { Formik} from 'formik';
import { VALIDATION_SCHEMA } from '../../../../constants/ValidationSchema';
import { VALIDATE } from '../../../../constants/ValidationConst';

const zoneOptions = [
    {
        value: 'zone_1',
        text: 'Zone 1'
    },
    {
        value: 'zone_2',
        text: 'Zone 2'
    }
]

const AddUser = ({response,handleNew, toggleAddUser, addUser }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={addUser} toggle={toggleAddUser} style={{ maxWidth: '300px' }}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>Add New User</h2>
                    </div>
                    <div className="popup-body p-4">
                    <span style={{color:`${response.isSuccess ? "green":"red"}`}} >{response.message}</span>
                    <Formik 
                    initialValues={{
                        firstName:"",
                        lastName:"",
                        email:"",
                        password:"",
                        confirmPass:"",
                      
                    }}
                    validate={({ password, confirmPass }) => {

                        let errors = {}

                        if (password !== confirmPass) {
                            errors.confirmPass = VALIDATE.PASS_MATCH
                        }
                        return errors
                    }}
                    validateOnBlur={true}
                    onSubmit={handleNew}
                    validationSchema={VALIDATION_SCHEMA.USER_ADD}
                    render={({values, handleSubmit, handleChange, handleBlur, errors, touched})=>(
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
                                <div className="row" >
                                <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Email"
                                            type="text"
                                            
                                            value={values.email}
                                            name="email"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.email && errors.email }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Password"
                                            type="password"
                                            
                                            value={values.password}
                                            name="password"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.password && errors.password }

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Confirm Password"
                                            type="password"
                                            
                                            value={values.confirmPass}
                                            name="confirmPass"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.confirmPass && errors.confirmPass }

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

export default AddUser;