import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { InputBox, RadioButton } from '../formComponents';
import SearchAbleSelect from '../formComponents/searchableSelect/SearchableSelect';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { VALIDATE } from '../../../constants/ValidationConst';
import _moment from 'moment';
import SearchableMultipleSelect from '../formComponents/searchableSelect/SearchableMultipleSelect';


const inspectorOption = [
    { value: 'Inspector_1', text: 'Inspector_1' },
    { value: 'Inspector_2', text: 'Inspector_2' },
    { value: 'Inspector_3', text: 'Inspector_3' }
];

const buildersOption = [
    { value: 'Builder_1', text: 'Builder_1' },
    { value: 'Builder_2', text: 'Builder_2' },
    { value: 'Builder_4', text: 'Builder_4' },
    { value: 'Builder_5', text: 'Builder_5' },
    { value: 'Builder_6', text: 'Builder_6' },
    { value: 'Builder_7', text: 'Builder_7' },
    { value: 'Builder_8', text: 'Builder_8' },
    { value: 'Builder_9', text: 'Builder_9' },
    { value: 'Builder_10', text: 'Builder_10' },
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

const AddNewJob = ({toggleDropzone,depDropdown, individualDropdown,isLoading, toggleAddNewJob, addNewPopup, handleNewJob, handleDepDropdown }) => {
   
    let  date = new Date()
    
   
  return <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={addNewPopup} toggle={ ()=> toggleAddNewJob({toggleOpCloseAndimagePopup:1})} className='modal-lg'>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>Add New Job</h2>
                    </div>
                    <div className="popup-body p-4">
                    <Formik 
                    initialValues={{

                        report:{
                            userID:null,
                            clientID:null,
                            scheduledTime:null,
                            type:[],
                            zoneID:[],
                            poID:null,
                            lotID:null,
                            longitude:43.454533434,
                            latitude:43.454533434
                        },

                        address:{
                            street:null,
                            city:null,
                            state:null,
                            zip:null,
                            section:null,
                            block:null,
                            neighborhood:[],
                            lot:null
                        },
                        property:{
                            squareFeet:null,
                            bedrooms:null,
                            bathrooms:null,
                            floors:null,
                            basement:null,
                            idCode:null,

                        },
                        builders:[],

                        photos:[]
                    }}
                    validationSchema={Yup.object().shape({
                        
                        report: Yup.object().shape({
                            scheduledTime:Yup.date().nullable(true).required("From date is required"),
                            type:Yup.string().nullable(true)
                            // .required('Type is required')
                            ,
                            zoneID:Yup.string().nullable(true)
                            // .required('Zone is required')
                            ,
                            poID:Yup.string().nullable(true).required('PO number is required').max(255, VALIDATE.NAME_MAX),
                            lotID:Yup.string().nullable(true).required('Lot id is required').max(255, VALIDATE.NAME_MAX),
                            clientID:Yup.string().nullable(true).required('Client Id is required'),
                            userID:Yup.string().nullable(true).required('Inspector is required')
                            }),

                        address:Yup.object().shape({
                            street:Yup.string().nullable(true).required('Street is required').max(255, VALIDATE.NAME_MAX), 
                            city:Yup.string().nullable(true).required('City is required').max(255, VALIDATE.NAME_MAX),
                            state:Yup.string().nullable(true).required('State is required').max(255, VALIDATE.NAME_MAX),
                            zip:Yup.string().nullable(true).required('Zip is required').max(255, VALIDATE.NAME_MAX),
                            section:Yup.string().nullable(true).required('Section is required').max(255, VALIDATE.NAME_MAX),
                            block:Yup.string().nullable(true).required('Block is required').max(255, VALIDATE.NAME_MAX),
                            neighborhood:Yup.string().nullable(true).required('Neighborhood is required'),
                            lot:Yup.string().nullable(true).required('Lot is required').max(255, VALIDATE.NAME_MAX)
                        }),

                        property: Yup.object().shape({
                            squareFeet:Yup.string().nullable(true).required('SquareFeet is required').max(255, VALIDATE.NAME_MAX),
                            bedrooms:Yup.string().nullable(true).required('Bedrooms is required').max(255, VALIDATE.NAME_MAX),
                            bathrooms:Yup.string().nullable(true).required('Bathrooms is required').max(255, VALIDATE.NAME_MAX),
                            floors:Yup.string().nullable(true).required('Floors is required').max(255, VALIDATE.NAME_MAX),
                            basement:Yup.string().nullable(true).required('Basement is required').max(255, VALIDATE.NAME_MAX),
                            idCode:Yup.string().nullable(true).required('IdCode is required').max(255, VALIDATE.NAME_MAX),
                        }),

                        builders:Yup.array().nullable(true).required('Builders are required')
                       
                    })}
                    onSubmit={handleNewJob}
                    render={({ values, errors, handleSubmit, handleChange, handleBlur, setFieldValue,setFieldError,setFieldTouched, touched })=>(
                        <form onSubmit={handleSubmit} >
                       
                            <div className="pop-form-wrapper border-bottom">
                                <div className="row">
                                    <div className="col-md-4 pl-2 pr-2">
                                        <InputBox
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Lot ID"
                                            type="text"
                                            value={values.report.lotID}
                                            name="report.lotID"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ getIn(touched, `report.lotID`) && getIn(errors, `report.lotID`)}
                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                    <div className="col-md-6 ">
                                        {/* <DatePicker /> */}
                                        <div className="form-group" >
                                        <label>&nbsp;</label>
                                        <DatePicker
                                            selected={values.report.scheduledTime}
                                            // value= { event.fromDate }
                                            onChange={(value) => {
                                                setFieldValue( "report.scheduledTime",value)
                                            }}
                                            onBlur={handleBlur}
                                            // showTimeSelect
                                            // timeFormat="h:mm aa"
                                            // dateFormat="MM / d / yyyy h:mm aa"
                                            dateFormat="MM / d / yyyy"
                                            // timeCaption="time"
                                            name={`report.scheduledTime`}
                                            className="form-control "
                                            minDate={ date }
                                            // minTime={(getCurrentDate(values.report.scheduledTime) === date.getDate())? date: new Date(date.getFullYear() , 1, 1, 0,0,0 )}
                                            // timeIntervals={10}
                                            // maxTime={  new Date(date.getFullYear() , date.getMonth(), date.getDate(), 23,59,59 ) }
                                            disabledKeyboardNavigation
                                            onKeyDown={(e)=>{e.nativeEvent.preventDefault()}}
                                        />
                                        
                                        <span className='input-error-text'>{getIn(touched, `report.scheduledTime`) && getIn(errors, `report.scheduledTime`)}</span>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 pl-2 pr-2">
                                        <InputBox
                                            value={values.report.poID}
                                            name="report.poID"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            errorText={ getIn(touched, `report.poID`) && getIn(errors, `report.poID`) }
                                  
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="PO Number"
                                            type="text"
                                            inputClass="form-control"
                                            errorClass="input-error-text" />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                       
                                        <div className="form-group">
                                            <SearchAbleSelect 
                                                labelText="Inspector"
                                                formWrapClass="form-group"
                                                labelClass="form-field-label"
                                                options={individualDropdown.inspectors}
                                                
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                setFieldValue={setFieldValue}
                                                setFieldError={setFieldError}
                                                setFieldTouched={setFieldTouched}
                                                name="report.userID"
                                                errorText={ getIn(touched, `report.userID`) && getIn(errors, `report.userID`)}
                                                
                                                placeholderText="sgdf"
                                                isMultiple={false}
                                                errorClass="input-error-text"
                                            />
                                           
                                        </div>
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <SearchAbleSelect
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Neighborhood"
                                            selectClass="select-box form-control"
                                            value='TureHome'
                                            name="address.neighborhood"
                                            setFieldTouched={setFieldTouched}
                                            setFieldValue={setFieldValue}
                                            errorText={getIn(touched, `address.neighborhood`) && getIn(errors, `address.neighborhood`)}
                                            errorClass="input-error-text"
                                            options={individualDropdown.neighborhoods}
                                            placeholderText="Neighborhood"
                                            isMultiple={false}
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
                                            isMultiple={false}
                                            // FOR DROPDOWN FETCHING
                                            callApi={true}
                                            handleDepDropdown={handleDepDropdown}
                                            isLoading={isLoading}
                                            // END

                                            setFieldValue={setFieldValue}
                                            name="report.clientID"
                                            errorClass="input-error-text"
                                            placeholderText="Select Client"
                                            options={individualDropdown.clients}
                                        />
                                    </div>
                                    <div className="col-md-6 pl-2 pr-2">
                                        <SearchAbleSelect
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Zone"
                                            selectClass="select-box form-control"
                                            errorClass="input-error-text"
                                            placeholderText="Zone"
                                            isMultiple={false}

                                            name="report.zoneID"
                                            setFieldValue={setFieldValue}
                                            setFieldTouched={setFieldTouched}
                                            errorText={getIn(touched, `report.zoneID`) && getIn(errors, `report.zoneID`)}

                                            options={depDropdown.zones}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 pl-2 pr-2">
                                        <InputBox
                                            value={values.address.street}
                                            name="address.street"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Street"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={ getIn(touched, `address.street`) && getIn(errors, `address.street`) }
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <InputBox
                                            value={values.address.city}
                                            name="address.city"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="City"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={ getIn(touched, `address.city`) && getIn(errors, `address.city`)}
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.address.state}
                                            name="address.state"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="State"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={ getIn(touched, `address.state`) && getIn(errors, `address.state`) }
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.address.zip}
                                            name="address.zip"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Zip"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={ getIn(touched, `address.zip`) && getIn(errors, `address.zip`)   }
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <SearchAbleSelect
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Floor Plan"
                                            selectClass="select-box form-control"
                                            value='TureHome'
                                            errorClass="input-error-text"
                                            placeholderText="Floor"
                                            isMultiple={false}

                                            
                                            options={floorOption}
                                        />
                                    </div>
                                    <div className="col-md-4 pl-2 pr-2">
                                        <SearchAbleSelect
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Type"
                                            selectClass="select-box form-control"
                                            value='TureHome'
                                            errorClass="input-error-text"
                                            placeholderText="bedrooms"
                                            isMultiple={false}

                                            name="report.type"
                                            setFieldValue={setFieldValue}
                                            setFieldTouched={setFieldTouched}
                                            errorText={getIn(touched, `report.type`) && getIn(errors, `report.type`)}

                                            options={individualDropdown.types}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.property.squareFeet}
                                            name="property.squareFeet"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Square Feet"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={getIn(touched, `property.squareFeet`) && getIn(errors, `property.squareFeet`)}
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.property.floors}
                                            name="property.floors"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Floors"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={getIn(touched, `property.floors`) && getIn(errors, `property.floors`)}
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.property.bedrooms}
                                            name="property.bedrooms"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Bedrooms"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={ getIn(touched, `property.bedrooms`) && getIn(errors, `property.bedrooms`)}
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.property.bathrooms}
                                            name="property.bathrooms"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Bathrooms"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={getIn(touched, `property.bathrooms`) && getIn(errors, `property.bathrooms`)  }
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.property.basement}
                                            name="property.basement"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Basement"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={getIn(touched, `property.basement`) && getIn(errors, `property.basement`)  }
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.property.idCode}
                                            name="property.idCode"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="ID Code"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={getIn(touched, `property.idCode`) && getIn(errors, `property.idCode`)  }
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.address.section}
                                            name="address.section"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Section"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={getIn(touched, `address.section`) && getIn(errors, `address.section`)  }
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.address.lot}
                                            name="address.lot"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Lot"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={ getIn(touched, `address.lot`) && getIn(errors, `address.lot`)  }
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    <div className="col-md-2 pl-2 pr-2">
                                        <InputBox
                                            value={values.address.block}
                                            name="address.block"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="Block"
                                            type="text"
                                            inputClass="form-control"
                                            errorText={ getIn(touched, `address.block`) && getIn(errors, `address.block`)}
                                            errorClass="input-error-text"
                                        />
                                    </div>
                                    {/* <div className="col-md-6 pl-2 pr-2">
                                        <InputBox
                                            value={values.report.latitude}
                                            name="gpsCode"
                                            handleChange={handleChange}
                                            formWrapClass="form-group"
                                            labelClass="form-field-label"
                                            labelText="GPS Code"
                                            type="text"
                                            inputClass="form-control"
                                            errorText=""
                                            errorClass="input-error-text"
                                        />
                                    </div> */}
                                </div>
                            </div>
                            <div className="pop-form-wrapper">
                                <div className="row margin-oposite">
                                    <div className="Add-more-field d-flex align-items-center">
                                        {/* <span className="d-block icon-add"></span>
                                        <span  className="d-block add-more-title">Add Builder</span> */}
                                        <SearchableMultipleSelect 
                                        formWrapClass="form-group"
                                        labelClass="form-field-label"
                                        labelText="Builders"
                                        selectClass="select-box form-control"
                                        isMultiple={true}
                                        errorClass="input-error-text"
                                        
                                        name="builders"
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}
                                        value={values.builders}
                                        errorText={getIn(touched, `builders`) && getIn(errors, `builders`) }

                                        placeholderText="Select builders"
                                        options={depDropdown.builders} 
                                        />
                                    </div>
                                </div>
                            </div>
                           

                            <div className="pop-form-wrapper text-center mt-4">
                                <ButtonPrimary btntext="Save" type="submit" className="button-primary" />
                            </div>

                            <div className="row">

                            <ButtonPrimary onClick={toggleDropzone} btntext="upload images" type="button" className="button-primary" />
                            
                            </div>
                        </form>
                    )}

                    />
                    </div>
                </ModalBody>
            </div>
        </Modal>
    </div>
}

function getCurrentDate(d){

    let date
    let temp = new Date()
    
    if(d){
        
        date  = _moment(d, "MM / DD / YYYY h:mm a")
        
       return date.get("date")
    }else{

        return temp.getDate()
    }

}

export default AddNewJob;