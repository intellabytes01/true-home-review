import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import { InputBox } from '../../formComponents';
import SelectBox from '../../formComponents/selectBox/SelectBox';
import { VALIDATION_SCHEMA } from '../../../../constants/ValidationSchema';
import { Formik } from 'formik';
import SearchAbleSelect from '../../formComponents/searchableSelect/SearchableSelect';
import { END_POINT } from '../../../../constants/ApiEndPoints';


const AddRoomItem = ({response,handleNew, toggleAddRoomItem, addRoomItem, options }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={addRoomItem} toggle={toggleAddRoomItem} style={{ maxWidth: '400px' }}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>New Section Item</h2>
                    </div>
                    <div className="popup-body p-4">
                    <span style={{color:`${response.isSuccess ? "green":"red"}`}} >{response.message}</span>
                    <Formik 
                    initialValues={{
                        roomItemName:"",
                        roomName:"",
                      
                    }}
                    onSubmit={(values, formikBag)=>handleNew({values,formikBag,moduleName:END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.ROOM_ITEM})}
                    validationSchema={VALIDATION_SCHEMA.ROOM_ITEM_ADD_UPDATE}
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
                                        name="roomName"
                                        
                                        // value={values.roomItemName}
                                        errorText={ touched.roomName && errors.roomName }
                                        errorClass="input-error-text"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Section Item Name"
                                            type="text"
                                            
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.roomItemName}
                                            name="roomItemName"
                                            errorText={ touched.roomItemName && errors.roomItemName}

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

export default AddRoomItem;