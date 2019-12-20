import React from 'react';
// import Dropzone from 'react-dropzone';
import classNames from 'classnames'
import { Modal, ModalBody } from 'reactstrap';
import ReactDropzone from "react-dropzone";
import { InputBox } from '../formComponents';


const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
  };

export const DropZonePopup =({files,onPreviewDrop,onDrop,floorTag,handleFloorTagChange,dropzonePopup,toggleDropzone})=>{

   return <Modal isOpen={dropzonePopup} toggle={ ()=> toggleDropzone()} className='modal-lg'>
            <div className="app">
            <ModalBody>

                    <h2>Image Previews</h2>
                    <div className="row">
                                    <div className="col-md-12 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Name"
                                            type="text"

                                            value={floorTag}
                                            name="floorTag"
                                            handleChange={handleFloorTagChange}

                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                    </div>
                    <ReactDropzone
                    accept="image/*"
                    onDrop={onPreviewDrop}
                    >
                    {
                        ({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p><i className="icon-CSV"></i></p>
                            </div>
                        )
                    }
                    
                    </ReactDropzone>
                    {files.length > 0 &&
                    <React.Fragment>
                        <h3>Previews</h3>
                        {files.map((file) => (
                        <img
                            alt="Preview"
                            key={file.preview}
                            src={file.preview}
                            style={previewStyle}
                        />
                        ))}
                    </React.Fragment>
                    }
        </ModalBody>

      </div>
        </Modal>
}