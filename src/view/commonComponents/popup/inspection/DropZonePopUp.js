import React from 'react';
// import Dropzone from 'react-dropzone';
import classNames from 'classnames'
import { Modal, ModalBody } from 'reactstrap';
import ReactDropzone from "react-dropzone";
import LoadingOverlay from 'react-loading-overlay';
// import ReactDropzone from "react-dropzone";
import ButtonPrimary from '../../buttons/ButtonPrimary';
import { InputBox } from '../../formComponents';
import pdfIcon from '../../../../assets/pdf.svg'


const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
};

export const DropZonePopup = ({ planID, handleFloorTagChange, areImagesUploading, responseMsg, handleImages, removeImage, files, onPreviewDrop, dropzonePopup, toggleDropzone }) => {


    return <Modal isOpen={dropzonePopup} toggle={toggleDropzone} className='modal-lg'>
        <div className="app">
            <ModalBody>

                <div className="row">
                    <span
                        className="d-flex justify-content-center"
                        style={{ color: "green" }} >
                        {responseMsg ? "Uploaded successfully" : null}
                    </span>

                    <div className="col-md-12">
                        <div className="dropzone-wrapper">
                            <div className="row justify-content-center ">
                                {/* <div className=""> */}
                                    <InputBox
                                        formWrapClass="form-group"
                                        labelClass="form-field-label"
                                        labelText="Floor tag"
                                        type="text"

                                        value={planID}
                                        name="planID"
                                        handleChange={handleFloorTagChange}

                                        inputClass="form-control"
                                        errorClass="input-error-text" />
                                {/* </div> */}
                            </div>
                            {/* accept={["image/*"]} */}
                            <ReactDropzone
                            accept={["image/*",".pdf"]} 
                            onDrop={onPreviewDrop}
                            >
                                {
                                    ({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className="dropzone-area">
                                                <div className="select-area d-flex align-items-center justify-content-center">
                                                    Drop or Select the images
                                                                   </div>
                                                {files.length > 0 &&
                                                    <React.Fragment>
                                                        <div className="clearfix">
                                                            {files.map((file, index) => {
                                                               
                                                               if(file.type === "application/pdf")
                                                                    
                                                                return <div key={file.preview} className="dropzone-image">
                                                                        <img
                                                                            alt="Preview"
                                                                            key={file.preview}
                                                                            src={pdfIcon}
                                                                            style={previewStyle}
                                                                        />
                                                                        <span
                                                                            className="cross-btn"
                                                                            onClick={(event) => { event.stopPropagation(); removeImage(index) }}
                                                                            title="sdfgh">
                                                                            <i className="icon-Remove"></i>
                                                                        </span>
                                                                    </div>
                                                               else{

                                                                return <div key={file.preview} className="dropzone-image">
                                                                        <img
                                                                            alt="Preview"
                                                                            key={file.preview}
                                                                            src={file.preview}
                                                                            style={previewStyle}
                                                                        />
                                                                        <span
                                                                            className="cross-btn"
                                                                            onClick={(event) => { event.stopPropagation(); removeImage(index) }}
                                                                            title="sdfgh">
                                                                            <i className="icon-Remove"></i>
                                                                        </span>
                                                                    </div>
                                                               }     
                                                            })}
                                                        </div>
                                                    </React.Fragment>
                                                }
                                            </div>
                                        </div>
                                    )
                                }

                            </ReactDropzone>
                            <div className="d-flex justify-content-center mt-4" >
                                <ButtonPrimary
                                    type="button"
                                    onClick={handleImages}
                                    btntext="Upload Images"
                                    disabled={files && files.length === 0}
                                    className="button-primary" />
                            </div>

                        </div>
                    </div>
                </div>

            </ModalBody>

        </div>
    </Modal>
}