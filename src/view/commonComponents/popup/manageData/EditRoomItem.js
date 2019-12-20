import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import { InputBox } from '../../formComponents';
import SelectBox from '../../formComponents/selectBox/SelectBox';
import { Formik } from 'formik';
import { VALIDATION_SCHEMA } from '../../../../constants/ValidationSchema';
import { END_POINT } from '../../../../constants/ApiEndPoints';
import SearchAbleSelect from '../../formComponents/searchableSelect/SearchableSelect';

const EditRoomItem = ({response,handleEdit, data, toggleEditRoomItem, editRoomItem,  options  }) => {
  
    // console.log(options);
    
  
  return  <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={editRoomItem} toggle={toggleEditRoomItem} style={{ maxWidth: '400px' }}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>Edit Section Item</h2>
                    </div>
                    <div className="popup-body p-4">
                    <span style={{color:`${response.isSuccess ? "green":"red"}`}} >{response.message}</span>
                    <Formik 
                    initialValues={
                        (data) ?{...data} :{
                        roomItemName:"",
                        roomName:"",
                      
                    }}
                    onSubmit={(values, formikBag)=>handleEdit({values,formikBag,moduleName:END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.ROOM_ITEM})}
                    validationSchema={VALIDATION_SCHEMA.ROOM_ITEM_ADD_UPDATE}
                    render={({values, handleSubmit, handleChange, setFieldTouched,setFieldValue,setFieldError, handleBlur, errors, touched})=>(
                        <form onSubmit={handleSubmit}>
                            <div className="pop-form-wrapper">
                                <div className="row">
                                {/* {JSON.stringify (values)} */}
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
                                                value={values.roomName}
                                                
                                                name="roomName"
                                                errorText={ touched.roomName && errors.roomName }
                                                // selctedValue={data & data}
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
                                            
                                            value={values.roomItemName}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ touched.roomItemName && errors.roomItemName}
                                            name="roomItemName"

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
}

export default EditRoomItem;