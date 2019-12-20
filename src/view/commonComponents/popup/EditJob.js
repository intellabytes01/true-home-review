import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { InputBox, RadioButton } from '../formComponents';
import SearchAbleSelect from '../formComponents/searchableSelect/SearchableSelect';

const inspectorOption = [
    { value: 'Inspector_1', text: 'Inspector_1' },
    { value: 'Inspector_2', text: 'Inspector_2' },
    { value: 'Inspector_3', text: 'Inspector_3' }
];

const neighborhoodOption = [
    { value: 'Neigbhorhood_1', text: 'Neigbhorhood_1' },
    { value: 'Neigbhorhood_2', text: 'Neigbhorhood_2' },
    { value: 'Neigbhorhood_3', text: 'Neigbhorhood_3' }
];

const clientOption = [
    { value: 'Client_1', text: 'Client_1' },
    { value: 'Client_2', text: 'Client_2' },
    { value: 'Client_3', text: 'Client_3' }
];

const zoneOption = [
    { value: 'zone_1', text: 'zone_1' },
    { value: 'zone_2', text: 'zone_2' },
    { value: 'zone_3', text: 'zone_3' }
];

const buildersOption = [
    { value: 'Builder_1', text: 'Builder_1' },
    { value: 'Builder_2', text: 'Builder_2' },
    { value: 'Builder_3', text: 'Builder_3' },
    { value: 'Builder_4', text: 'Builder_4' }
];

const floorOption = [
    { value: 'Floor_1', text: 'Floor_1' },
    { value: 'Floor_2', text: 'Floor_2' },
    { value: 'Floor_3', text: 'Floor_3' }
];
const bedroomsOption = [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '3', text: '3' }
];

const EditJob = ({ toggleEditJob, editProperty }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={editProperty} toggle={toggleEditJob} className='modal-lg'>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>Edit Job</h2>
                    </div>
                    <div className="popup-body p-4">
                        <form>
                            <div className="pop-form-wrapper">
                                <div className="row">
                                    <div className="col-md-4 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Lot ID"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text" />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        {/* <DatePicker /> */}
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Review Date"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text" />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <RadioButton
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText=""
                                            type="radio"
                                            errorText=""
                                            errorClass="input-error-text"
                                            radioLabelClass="radioLabelClass"
                                            radioText="Scheduled"
                                        />

                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <RadioButton
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText=""
                                            type="radio"
                                            inputClass="radio-button"
                                            radioText="Proposed"
                                            radioLabelClass="radioLabelClass"
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="PO Number"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text" />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        {/* <SelectBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Inspector"
                                            selectClass="select-box form-control"
                                            value='TureHome'
                                            errorClass="input-error-text"
                                        /> */}
                                        <SearchAbleSelect labelText="Inspector"
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            options={inspectorOption}
                                            placeholderText="sgdf"

                                        />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <SearchAbleSelect
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Neighborhood"
                                            selectClass="select-box form-control"
                                            value='TureHome'
                                            errorClass="input-error-text"
                                            options={neighborhoodOption}
                                            placeholderText="Neighborhood"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 pl-2 pr-2">
                                        <SearchAbleSelect
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Client"
                                            selectClass="select-box form-control"
                                            value='TureHome'
                                            errorClass="input-error-text"
                                            placeholderText="Select Client"
                                            options={clientOption}
                                        />
                                    </div>
                                    <div className="col-md-6 pl-2 pr-2">
                                        <SearchAbleSelect
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Zone"
                                            selectClass="select-box form-control"
                                            value='TureHome'
                                            errorClass="input-error-text"
                                            placeholderText="Zone"
                                            options={zoneOption}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Street"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="City"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="State"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Zip"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <SearchAbleSelect
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Floors"
                                            selectClass="select-box form-control"
                                            value='TureHome'
                                            errorClass="input-error-text"
                                            placeholderText="Floor"
                                            options={floorOption}
                                        />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <SearchAbleSelect
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Bedrooms"
                                            selectClass="select-box form-control"
                                            value='TureHome'
                                            errorClass="input-error-text"
                                            placeholderText="bedrooms"
                                            options={bedroomsOption}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Square Feet"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Floors"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Bedrooms"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Bathrooms"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Basement"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="ID Code"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Section"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Lot"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Block"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-6 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="GPS Code"
                                            type="text"
                                            value=""
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pop-form-wrapper">
                                <div className="row margin-oposite">
                                    <div className="Add-more-field d-flex align-items-center">
                                        {/* <span className="d-block icon-add"></span>
                                        <span  className="d-block add-more-title">Add Builder</span> */}
                                        <SearchAbleSelect 
                                         formWrapClass="form-group"
                                         labelClass="form-field-label"
                                         labelText="Builders"
                                         selectClass="select-box form-control"
                                        //  value='TureHome'
                                        isMultiple={true}
                                         errorClass="input-error-text"
                                         placeholderText="Select builders"
                                        options={buildersOption} 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pop-form-wrapper text-center mt-4">
                                <ButtonPrimary btntext="Save" className="button-primary" />
                            </div>
                        </form>
                    </div>
                </ModalBody>
            </div>
        </Modal>
    </div>
);

export default EditJob;