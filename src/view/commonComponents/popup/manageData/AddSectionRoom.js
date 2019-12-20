import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import { InputBox } from '../../formComponents';
import SelectBox from '../../formComponents/selectBox/SelectBox';
import { VALIDATION_SCHEMA } from '../../../../constants/ValidationSchema';
import { Formik } from 'formik';
import SearchAbleSelect from '../../formComponents/searchableSelect/SearchableSelect';
import { END_POINT } from '../../../../constants/ApiEndPoints';

const AddSectionRoom = ({response,handleNew, toggleAddSectionRoom, options, addSectionRoom }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={addSectionRoom} toggle={toggleAddSectionRoom} style={{ maxWidth: '400px' }}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>New Section Rooms</h2>
                    </div>
                    <div className="popup-body p-4">
                    <span style={{color:`${response.isSuccess ? "green":"red"}`}} >{response.message}</span>
                    <Formik 
                    initialValues={{
                        sectionName:"",
                        roomName:"",
                      
                    }}
                    onSubmit={(values, formikBag)=>handleNew({values,formikBag,moduleName:END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.SECTION_ROOM})}
                    validationSchema={VALIDATION_SCHEMA.SECTION_ROOM_ADD_UPDATE}
                    render={({values, handleSubmit, handleChange, setFieldTouched,setFieldValue,setFieldError, handleBlur, errors, touched})=>(
                        <form onSubmit={handleSubmit}>
                       
                            <div className="pop-form-wrapper">
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <SearchAbleSelect
                                        formWrapClass="form-group"
                                        placeholderText="Section Name"
                                        options={options}

                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                        setFieldError={setFieldError}
                                        setFieldTouched={setFieldTouched}
                                        name="sectionName"
                                        value={values.sectionName}

                                        errorText={ touched.sectionName && errors.sectionName}
                                        errorClass="input-error-text"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Room Name"
                                            type="text"
                                            
                                            value={values.roomName}
                                            name="roomName"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.roomName && errors.roomName }

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

export default AddSectionRoom;