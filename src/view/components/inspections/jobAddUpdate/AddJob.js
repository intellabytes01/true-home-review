import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import ButtonPrimary from '../../../commonComponents/buttons/ButtonPrimary';
import { InputBox, } from '../../../commonComponents/formComponents';
import SearchAbleSelect from '../../../commonComponents/formComponents/searchableSelect/SearchableSelect';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import SearchableMultipleSelect from '../../../commonComponents/formComponents/searchableSelect/SearchableMultipleSelect'
import _moment from 'moment';
import axios from 'axios';
import * as SHA1 from 'sha1';
import ReactDropzone from "react-dropzone";
import { END_POINT } from '../../../../constants/ApiEndPoints';
import LoadingOverlay from 'react-loading-overlay';
import _callApi from '../../../../services/baseService';
import { VALIDATE } from '../../../../constants/ValidationConst';
import { GoogleMapComponent } from '../../../commonComponents/google-map/GoogleMap';
import { VALIDATION_SCHEMA } from '../../../../constants/ValidationSchema';
import SelectBox from '../../../commonComponents/formComponents/selectBox/SelectBox';
import SelectBordered from '../../../commonComponents/formComponents/selectBox/SelectBordered';
import pdfIcon from '../../../../assets/pdf.svg';

const previewStyle = {
    display: 'inline',
    width: 100,
    height: 100,
};


class AddJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: {},
            geoCoder: {},
            address: null,

            toggleForm: true,

            uploadedImages: [],
            responseMsg: null,
            files: [],
            addressLatLng: {
                longitude: null,
                latitude: null
            },
            // FOR UPLOADING MEDIA WE WILL GET IT WHEN FORM HAS BEEN SUBMITTED
            reportID: "",
            // END

            individualDropdown: {
                clients: [],
                inspectors: [],
                neighborhoods: [],
                types: []
            },

            depDropdown: {
                builders: [],
                zones: []
            },

            jobAddResponse:{
                isSuccess:false,
                message:""
            },

            areImagesUploading: false,
            isDropdownFetching: false,

        }
    }

    componentWillReceiveProps(nextprops) {

        // console.log(nextprops);

    }
    componentDidMount() {

        // console.log(this.props)

        let reportID = localStorage.getItem("add_rep_ort_ID")

        if (reportID) {

            this.setState(() => ({ reportID }))
        }
        this.getIndividualDropdown()
    }

    handleFloorTagChange = (event) => {

        this.setState({ [event.target.name]: event.target.value })
    }

    componentWillUnmount() {

        localStorage.removeItem("add_rep_ort_ID")
    }

    getIndividualDropdown = () => {

        _callApi({},
            END_POINT.INDIVIDUAL_DROPDOWN.END_POINT,
            END_POINT.INDIVIDUAL_DROPDOWN.POST,
        ).then(res => {

            let { error = null, result = null } = res.data.payload

            if (error) {

            } else {

                let { individualDropdown } = this.state

                console.log(result);
                
                individualDropdown = { ...individualDropdown, ...result }

                individualDropdown.clients = individualDropdown.clients.map(item => ({key:Math.random(), value: item.clientID, text: item.companyName }))
                individualDropdown.types = individualDropdown.types.map(item => ({key:Math.random(), value: item.name, text: item.name }))
                individualDropdown.inspectors = individualDropdown.inspectors.map(item => ({key:Math.random(), value: item.userID, text: item.firstName + " " + item.lastName }))
                individualDropdown.neighborhoods = individualDropdown.neighborhoods.map(item => ({key:Math.random(), value: item.neighborhood, text: item.neighborhood }))
                this.setState(() => ({ individualDropdown }))

            }
        })
    }

    // THIS METHOD WILL BE CALLED IF USER SELECT A CLIENT FROM DROPDOWN WHILE CREATING A NEW JOB
    handleDepDropdown = (value) => {

        // console.log(value);

        this.setState(() => ({ isDropdownFetching: true }))

        let form = new FormData()
        form.append("params[clientID]", value)

        _callApi(
            form,
            END_POINT.CLIENT_DEP_DROPDOWN.END_POINT,
            END_POINT.CLIENT_DEP_DROPDOWN.POST,
        ).then(res => {

            let { error, result } = res.data.payload

            let { depDropdown } = this.state

            if (error) {

                depDropdown.builders = []
                depDropdown.zones = []

            } else {

                depDropdown = { ...depDropdown, ...result }

                depDropdown.builders = depDropdown.builders.map(item => ({key:Math.random(), value: item.userID, text: item.firstName + " " + item.lastName }))
                depDropdown.zones = depDropdown.zones.map(item => ({key:Math.random(), value: item.a_ListZoneID, text: item.Zone }))
            }

            this.setState(() => ({ isDropdownFetching: false, depDropdown }))
        })
    }

    onPreviewDrop = (files) => {

        if (files && this.state.files.length + files.length < 50) {

            let arr = files.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
            this.setState({
                files: this.state.files.concat(arr),
            });
        }
    }
    onMapMounted = (ref) => {
        const { maps } = window.google;
        let geoCoder = new maps.Geocoder()

        this.setState(() => ({ maps, geoCoder }))
    }


    handleSearchBox = (location) => {

        // console.log(location);
        let { addressLatLng } = this.state

        addressLatLng.latitude = location.lat()
        addressLatLng.longitude = location.lng()

        this.setState(() => ({ addressLatLng }))
    }

    handleMarkerDrag = (event) => {
        let latLng = { lat: event.latLng.lat(), lng: event.latLng.lng() }

        let { addressLatLng } = this.state

        addressLatLng = { latitude: latLng.lat, longitude: latLng.lng }

        this.setState(() => ({ addressLatLng }))

        if (this.state.geoCoder) {

            this.state.geoCoder.geocode({ 'location': latLng }, (results, status) => {

                if (results && results.length) {

                    document.getElementById("searchBox").value = results[0].formatted_address
                }
            })
        }
    }

    handleNewJob = (values, formikBag) => {

        // console.log(values);
        let data = cloneDeep(values);

        // console.log(data === values);

        let { addressLatLng, jobAddResponse } = this.state

        let report = data.report;
        let address = data.address;
        let property = data.property;
        let builders = data.builders;

        report.latitude = addressLatLng.latitude
        report.longitude = addressLatLng.longitude

        report.scheduledTime = _moment(report.scheduledTime).format("MM-DD-YYYY").toString()

        report = JSON.stringify(report)
        address = JSON.stringify(address)
        property = JSON.stringify(property)
        builders = JSON.stringify(builders)

        console.log(report, address, property, builders);

        let form = new FormData()
        form.append('params[token]', this.getToken())

        form.append('params[report]', report)
        form.append('params[address]', address)
        form.append('params[property]', property)
        form.append('params[builders]', builders)
        _callApi(
            form,
            END_POINT.INSPECTION_JOB_CREATE_UPDATE.END_POINT,
            END_POINT.INSPECTION_JOB_CREATE_UPDATE.POST,
        ).then(res => {

            let { error = null, result = null } = res.data.payload

            // console.log(error, result);

            if (error) {

                jobAddResponse.isSuccess = false
                jobAddResponse.message = error.message
            } else if (result) {

                localStorage.setItem("add_rep_ort_ID", result.reportID)
                this.setState(() => ({ toggleForm: false, reportID: result.reportID }))

            }

            this.setState(()=>({jobAddResponse}))

            this.clearJobAddResponse()


        }).catch(()=>{

             jobAddResponse.isSuccess = false
             jobAddResponse.message = "Something went wrong"

             this.setState(()=>({jobAddResponse}))

             this.clearJobAddResponse()
        })
    }

    clearJobAddResponse = ()=>{

        let { jobAddResponse } = this.state
        jobAddResponse.isSuccess = false
        jobAddResponse.message = ""


        setTimeout(()=>{

            this.setState(()=>({jobAddResponse}))
        }, 2000)

    }
    removeImage = (index) => {

        let { files } = this.state

        files.splice(index, 1)

        this.setState(() => ({ files }))
    }

    handleImages = () => {

        if (this.state.files) {

            let { uploadedImages } = this.state;
            this.setState(() => ({ areImagesUploading: true }))
            Promise.all(
                this.state.files.map(
                    (item, index) => {

                        return (async (data, i) => {
                            let res = await this.uploadImages(data);

                            // console.log(res, i);

                            return res
                        })(item, index)

                    }
                )
            ).then(res => {

                // console.log(res);

                res.map((item, index) => {

                    if (item['data']['secure_url'])
                        uploadedImages.push(item.data.secure_url)


                })

                this.setState(() => ({ uploadedImages }))

                setTimeout(() => {

                    this.nowUploadToKumoulous()
                })


            }).catch(() => this.setState(() => ({ areImagesUploading: false })))
        }
    }

    nowUploadToKumoulous = () => {

        let form = new FormData()

        form.append('params[token]', this.getToken())
        form.append('params[reportID]', this.state.reportID)
        let json = JSON.stringify(this.state.uploadedImages)
        form.append('params[photos]', json);

        if(this.state['planID'] && this.state['planID'].trim()){

            form.append('params[planID]', this.state['planID'].trim())
            // form.append('params[reportID]', )
        } 
        

        _callApi(
            form,
            END_POINT.ADD_FLOOR_PLANS.END_POINT,
            END_POINT.ADD_FLOOR_PLANS.POST,
        ).then(res => {

            let { error = null, result = null } = res.data.payload;

            if (error) {

            } else {

                // this.setState(()=>({}))
                this.setState(() => ({ responseMsg: true, areImagesUploading: false }))

                localStorage.removeItem("add_rep_ort_ID")
                setTimeout(() => {

                    this.props.history.push('/main/inspections')
                }, 1000)
            }
        }).catch(() => {

            this.props.history.push('/main/inspections')
        })
    }


    uploadImages = (file) => {

        let form = new FormData()
        let time = new _moment().utc(new Date()).valueOf()
        let params = `timestamp=${time}` + `${END_POINT.CLOUDNARY.API_SECRET}`
        let auth = SHA1(params)
        form.append("file", file)
        form.append("timestamp", time)
        form.append("api_key", END_POINT.CLOUDNARY.API_KEY)
        form.append("signature", auth)

        return axios.post(
            "https://api.cloudinary.com/v1_1/true-home-review-llc/image/upload",
            form,
            {
                onUploadProgress: (ProgressEvent => {

                    let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100)

                    // console.log(progress)

                })
            }
        ).then(res => {

            let { secure_url } = res.data

            return res;
        }, error => {

            return error
        })
    }

    getToken = () => {

        let user = JSON.parse(localStorage.getItem("user"))

        if (user) {
            return user.token;
        } else {

            return '';
        }

        // return user.token;
    }


    render() {


        let date = new Date()

        return (
            <>
                <LoadingOverlay
                    active={this.state.areImagesUploading}
                    spinner
                    text='Loading your content...'
                >
                    <div className="inspections light-background">
                        <div className="add-new-job popup-wrapper">
                            <div className="add-new-job-inner pop-form-wrapper">
                                <div className="popup-header text-center pt-3">
                                    <h2> {this.state.toggleForm && !this.state.reportID ? "Add New Job" : "Upload Images"} </h2>
                                </div>
                                <div className="popup-body p-4">

                                    {(this.state.toggleForm && !this.state.reportID) ?
                                        <Formik
                                            initialValues={{

                                                report: {
                                                    userID: null,
                                                    clientID: null,
                                                    scheduledTime: null,
                                                    type: null,
                                                    zoneID: null,
                                                    poID: null,
                                                    lotID: null,
                                                    longitude: null,
                                                    latitude: null
                                                },

                                                address: {
                                                    street: null,
                                                    city: null,
                                                    state: null,
                                                    zip: null,
                                                    section: null,
                                                    block: null,
                                                    neighborhood: null,
                                                    lot: null
                                                },
                                                property: {
                                                    squareFeet: null,
                                                    bedrooms: null,
                                                    bathrooms: null,
                                                    floors: null,
                                                    basement: null,
                                                    idCode: null,

                                                },
                                                builders: [],

                                            }}

                                            validationSchema={VALIDATION_SCHEMA.JOB}
                                            onSubmit={(values, formikBag) => {

                                                if ((this.state.addressLatLng.latitude && this.state.addressLatLng.longitude)) {

                                                    this.handleNewJob(values, formikBag)
                                                }else{

                                                    formikBag.setSubmitting(false)
                                                }
                                            }
                                            }
                                            render={({ values, errors, handleSubmit,isSubmitting, handleChange, handleBlur, setFieldValue, setFieldError, setFieldTouched, touched, submitCount }) => (
                                                <form onSubmit={handleSubmit} >
                                                    <span className="d-flex justify-content-center" style={{ color: "red" }} > {!this.state.addressLatLng.latitude && submitCount >= 1 ? "Please select a location" : null}</span>
                                                    <span className="d-flex justify-content-center" style={{ color: "red" }} > {!this.state.jobAddResponse.isSuccess ? this.state.jobAddResponse.message : null }</span>
                                                    <div className="row">
                                                        <div className="col-md-7">
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
                                                                            errorText={getIn(touched, `report.lotID`) && getIn(errors, `report.lotID`)}
                                                                            inputClass="form-control"
                                                                            errorClass="input-error-text" />
                                                                    </div>
                                                                    <div className="col-md-6 pl-2 pr-2">
                                                                        {/* <DatePicker /> */}
                                                                        <div className="form-group" >
                                                                            <label className="form-field-label">Review Date</label>
                                                                            <DatePicker
                                                                                selected={values.report.scheduledTime}
                                                                                // value= { event.fromDate }
                                                                                onChange={(value) => {
                                                                                    setFieldValue("report.scheduledTime", value)
                                                                                }}
                                                                                onBlur={handleBlur}
                                                                                // showTimeSelect
                                                                                // timeFormat="h:mm aa"
                                                                                // dateFormat="MM / d / yyyy h:mm aa"
                                                                                dateFormat="MM / d / yyyy"
                                                                                // timeCaption="time"
                                                                                name={`report.scheduledTime`}
                                                                                className="form-control "
                                                                                minDate={date}

                                                                                // minTime={(getCurrentDate(values.report.scheduledTime) === date.getDate())? date: new Date(date.getFullYear() , 1, 1, 0,0,0 )}
                                                                                // timeIntervals={10}
                                                                                // maxTime={  new Date(date.getFullYear() , date.getMonth(), date.getDate(), 23,59,59 ) }
                                                                                disabledKeyboardNavigation
                                                                                onKeyDown={(e) => { e.nativeEvent.preventDefault() }}
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
                                                                            errorText={getIn(touched, `report.poID`) && getIn(errors, `report.poID`)}

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
                                                                                options={this.state.individualDropdown.inspectors}

                                                                                handleBlur={handleBlur}
                                                                                handleChange={handleChange}
                                                                                setFieldValue={setFieldValue}
                                                                                setFieldError={setFieldError}
                                                                                setFieldTouched={setFieldTouched}
                                                                                name="report.userID"
                                                                                errorText={getIn(touched, `report.userID`) && getIn(errors, `report.userID`)}

                                                                                placeholderText="sgdf"
                                                                                isMultiple={false}
                                                                                errorClass="input-error-text"
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4 pl-2 pr-2">
                                                                        <SearchAbleSelect
                                                                            labelText="Neighborhood"
                                                                            formWrapClass="form-group"
                                                                            labelClass="form-field-label"
                                                                            options={this.state.individualDropdown.neighborhoods}
                                                                            // selectClass="select-box form-control"

                                                                            handleBlur={handleBlur}
                                                                            handleChange={handleChange}
                                                                            setFieldValue={setFieldValue}
                                                                            setFieldError={setFieldError}
                                                                            setFieldTouched={setFieldTouched}
                                                                            name="address.neighborhood"
                                                                            errorText={getIn(touched, `address.neighborhood`) && getIn(errors, `address.neighborhood`)}

                                                                            placeholderText="Neighborhood"
                                                                            isMultiple={false}
                                                                            errorClass="input-error-text"
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

                                                                            isMultiple={false}
                                                                            // FOR DROPDOWN FETCHING
                                                                            callApi={true}
                                                                            handleDepDropdown={this.handleDepDropdown}
                                                                            isLoading={this.state.isDropdownFetching}
                                                                            // END
                                                                            value={values.report.clientID}
                                                                            setFieldValue={setFieldValue}
                                                                            name="report.clientID"
                                                                            setFieldError={setFieldError}
                                                                            errorText={getIn(touched, `report.clientID`) && getIn(errors, `report.clientID`)}
                                                                            errorClass="input-error-text"
                                                                            placeholderText="Select Client"
                                                                            options={this.state.individualDropdown.clients}
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

                                                                            options={this.state.depDropdown.zones}
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
                                                                            errorText={getIn(touched, `address.street`) && getIn(errors, `address.street`)}
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
                                                                            errorText={getIn(touched, `address.city`) && getIn(errors, `address.city`)}
                                                                            errorClass="input-error-text"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-5 pl-2 pr-2">
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
                                                                            errorText={getIn(touched, `address.state`) && getIn(errors, `address.state`)}
                                                                            errorClass="input-error-text"
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4 pl-2 pr-2">
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
                                                                            errorText={getIn(touched, `address.zip`) && getIn(errors, `address.zip`)}
                                                                            errorClass="input-error-text"
                                                                        />
                                                                    </div>



                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-3 pl-2 pr-2">
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
                                                                    <div className="col-md-3 pl-2 pr-2">
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
                                                                    <div className="col-md-3 pl-2 pr-2">
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
                                                                            errorText={getIn(touched, `property.bedrooms`) && getIn(errors, `property.bedrooms`)}
                                                                            errorClass="input-error-text"
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-3 pl-2 pr-2">
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
                                                                            errorText={getIn(touched, `property.bathrooms`) && getIn(errors, `property.bathrooms`)}
                                                                            errorClass="input-error-text"
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4 pl-2 pr-2">
                                                                        <SelectBordered
                                                                            formWrapClass="form-group"
                                                                            labelClass="form-field-label"
                                                                            inputClass="form-control"
                                                                            options={[{ key: "1", value: "1", text: "Yes" }, { key: "0", value: "0", text: "No" }]}
                                                                            value={values.property.basement}
                                                                            handleChange={setFieldValue}
                                                                            searchable={false}
                                                                            name="property.basement"
                                                                            placeholderText="Basement"
                                                                            labelText="Basement"
                                                                            errorClass="input-error-text"
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4 pl-2 pr-2">
                                                                        {/* <SearchAbleSelect
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

                                                                            options={this.state.individualDropdown.types}
                                                                        /> */}
                                                                        <SearchAbleSelect
                                                                            formWrapClass="form-group"
                                                                            labelClass="form-field-label"
                                                                            labelText="Type"
                                                                            selectClass="select-box form-control"

                                                                            value={values.report.type}
                                                                            errorClass="input-error-text"
                                                                            placeholderText="Type"
                                                                            isMultiple={false}

                                                                            name="report.type"
                                                                            setFieldValue={setFieldValue}
                                                                            setFieldTouched={setFieldTouched}
                                                                            errorText={getIn(touched, `report.type`) && getIn(errors, `report.type`)}

                                                                            options={this.state.individualDropdown.types}
                                                                        />
                                                                    </div>

                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-3 pl-2 pr-2">
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
                                                                            errorText={getIn(touched, `address.section`) && getIn(errors, `address.section`)}
                                                                            errorClass="input-error-text"
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-3 pl-2 pr-2">
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
                                                                            errorText={getIn(touched, `address.lot`) && getIn(errors, `address.lot`)}
                                                                            errorClass="input-error-text"
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-3 pl-2 pr-2">
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
                                                                            errorText={getIn(touched, `address.block`) && getIn(errors, `address.block`)}
                                                                            errorClass="input-error-text"
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-3 pl-2 pr-2">
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
                                                                            errorText={getIn(touched, `property.idCode`) && getIn(errors, `property.idCode`)}
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
                                                                            errorText={getIn(touched, `builders`) && getIn(errors, `builders`)}

                                                                            placeholderText="Select builders"
                                                                            options={this.state.depDropdown.builders}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="map-card">
                                                                        <GoogleMapComponent
                                                                            handleSearchBox={this.handleSearchBox}
                                                                            onMapMounted={this.onMapMounted}
                                                                            handleMarkerDrag={this.handleMarkerDrag}
                                                                            address={this.state.address}
                                                                            isPolygonShown={false}
                                                                            // handleInput={this.handleInput}
                                                                            isMarkerShown={true} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="pop-form-wrapper text-center mt-4">
                                                        <ButtonPrimary 
                                                        disabled={ isSubmitting}
                                                        btntext="Save" 
                                                        type="submit" 
                                                        className="button-primary" />
                                                    </div>
                                                </form>
                                            )}

                                        /> : <div className="row">
                                            <span
                                                className="d-flex justify-content-center"
                                                style={{ color: "green" }} >
                                                {this.state.responseMsg ? "Uploaded successfully" : null}
                                            </span>
                                            <div className="col-md-12">
                                                <div className="row justify-content-center ">
                                                    {/* <div className=""> */}
                                                    <InputBox
                                                        formWrapClass="form-group"
                                                        labelClass="form-field-label"
                                                        labelText="Floor tag"
                                                        type="text"

                                                        value={this.state['planID']}
                                                        name="planID"
                                                        handleChange={this.handleFloorTagChange}

                                                        inputClass="form-control"
                                                        errorClass="input-error-text" />
                                                    {/* </div> */}
                                                </div>
                                                <div className="dropzone-wrapper">
                                                    <ReactDropzone
                                                        accept={["image/*",".pdf"]} 
                                                        onDrop={this.onPreviewDrop}
                                                    >
                                                        {
                                                            ({ getRootProps, getInputProps }) => (
                                                                <div {...getRootProps()}>
                                                                    <input {...getInputProps()} />
                                                                    <div className="dropzone-area">
                                                                        <div className="select-area d-flex align-items-center justify-content-center">
                                                                            Drop or Select the images
                                                                   </div>
                                                                        {this.state.files.length > 0 &&
                                                                            <React.Fragment>
                                                                                <div className="clearfix">
                                                                                    {this.state.files.map((file, index) => {
                                                                                      
                                                                                      if(file.type == "application/pdf"){
                                                                                      
                                                                                    return  <div key={file.preview} className="dropzone-image">
                                                                                        <img
                                                                                            alt="Preview"
                                                                                            key={file.preview}
                                                                                            src={pdfIcon}
                                                                                            style={previewStyle}
                                                                                        />
                                                                                        <span
                                                                                            className="cross-btn"
                                                                                            onClick={(event) => { event.stopPropagation(); this.removeImage(index) }}
                                                                                            title="sdfgh">
                                                                                            <i className="icon-Remove"></i>
                                                                                        </span>
                                                                                    </div>
                                                                                      }
                                                                                      return  <div key={file.preview} className="dropzone-image">
                                                                                            <img
                                                                                                alt="Preview"
                                                                                                key={file.preview}
                                                                                                src={file.preview}
                                                                                                style={previewStyle}
                                                                                            />
                                                                                            <span
                                                                                                className="cross-btn"
                                                                                                onClick={(event) => { event.stopPropagation(); this.removeImage(index) }}
                                                                                                title="sdfgh">
                                                                                                <i className="icon-Remove"></i>
                                                                                            </span>
                                                                                        </div>
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
                                                        onClick={this.handleImages}
                                                        btntext="Upload Images"
                                                        className="button-primary" />

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
            </>
        )
    }
}
export default AddJob = withRouter(AddJob);