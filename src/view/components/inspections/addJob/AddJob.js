import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ButtonPrimary from '../../../commonComponents/buttons/ButtonPrimary';
import { InputBox, RadioButton } from '../../../commonComponents/formComponents';
import SearchAbleSelect from '../../../commonComponents/formComponents/searchableSelect/SearchableSelect';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
// import { VALIDATE } from '../../../constants/ValidationConst';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import { compose, withProps, lifecycle } from "recompose"
import SearchableMultipleSelect from '../../../commonComponents/formComponents/searchableSelect/SearchableMultipleSelect'
import _moment from 'moment';
import ReactDropzone from "react-dropzone";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const _ = require("lodash");



const previewStyle = {
    display: 'block'
};

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCvkL4miOBTPwk2BxTKpampmMIjwQfG6f4&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, margin: "10px 10px" }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                bounds: null,
                center: {
                    lat: 41.9, lng: -87.624
                },
                onMapMounted: ref => {
                    refs.map = ref;
                    this.props.onMapMounted(ref)
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;


                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const { google } = window
                    const bounds = new google.maps.LatLngBounds();
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));

                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.props.handleSearchBox(nextCenter)
                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // refs.map.fitBounds(bounds);
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(props => {

    let { google } = window;

    return <> <GoogleMap
        defaultZoom={8}
        center={props.center}
        ref={props.onMapMounted}
        options={{
            fullscreenControl: false, mapTypeControlOptions: {
                style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: window.google.maps.ControlPosition.TOP_CENTER
            }
        }}
    >
    </GoogleMap>
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Search address"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    marginTop: `60px`,
                    marginLeft: `45px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
                id="searchBox"
            />
        </SearchBox>
        {props.isMarkerShown && (
            <Marker position={props.center} draggable={true} onDragEnd={props.handleMarkerDrag} />
        )}
    </>
});


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

class AddJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            map: {},
            geoCoder: {},
            address: null
        }
    }

    componentWillReceiveProps(nextprops) {

        // console.log(nextprops);

    }
    componentDidMount() {

        // console.log(this.props)
    }

    onMapMounted = (ref) => {
        const { maps } = window.google;
        let geoCoder = new maps.Geocoder()

        this.setState(() => ({ maps, geoCoder }))
    }

    onPreviewDrop = (files) => {

        let arr = files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))
        this.setState({
            files: this.state.files.concat(arr),
        });
    }

    handleSearchBox = (location) => {
        console.log(location);
    }

    handleMarkerDrag = (event) => {
        let latLng = { lat: event.latLng.lat(), lng: event.latLng.lng() }

        if (this.state.geoCoder) {

            this.state.geoCoder.geocode({ 'location': latLng }, (results, status) => {

                document.getElementById("searchBox").value = results[0].formatted_address
            })
        }
    }
    check = () => {
        console.log('check');
    }

    render() {

        return (
            <>
                <div className="inspections light-background">
                    <div className="add-new-job popup-wrapper">
                        <div className="add-new-job-inner pop-form-wrapper">
                            <div className="popup-header text-center pt-3">
                                <h2>Add New Job</h2>
                            </div>
                            <div className="popup-body p-4">
                                <form>
                                    <div className="row">
                                        <div className="col-sm-7">
                                            <div className="pop-form-wrapper border-bottom">
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

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 pl-2 pr-2">
                                                        <SearchAbleSelect labelText="Inspector"
                                                            formWrapClass="form-group"
                                                            labelClass="form-field-label"
                                                            options={inspectorOption}
                                                            placeholderText="sgdf"
                                                            value='TureHome'
                                                        />
                                                    </div>

                                                    <div className="col-md-4 pl-2 pr-2">
                                                        <SearchAbleSelect
                                                            formWrapClass="form-group"
                                                            labelClass="form-field-label"
                                                            labelText="Neighborhood"
                                                            value='TureHome'
                                                            options={neighborhoodOption}
                                                            placeholderText="Neighborhood"
                                                        />
                                                    </div>
                                                    <div className="col-md-4 pl-2 pr-2">
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
                                                </div>
                                                <div className="row">

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
                                                            labelText="Floor Plan"
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
                                                            labelText="Type"
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
                                                        <span className="d-block icon-add"></span>
                                                        <span className="d-block add-more-title">Add Builder</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pop-form-wrapper text-center mt-4">
                                                <ButtonPrimary btntext="Save" className="button-primary" />
                                            </div>
                                        </div>

                                        <div className="col-sm-5">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="map-card">
                                                        <MyMapComponent
                                                            handleSearchBox={this.handleSearchBox}
                                                            onMapMounted={this.onMapMounted}
                                                            handleMarkerDrag={this.handleMarkerDrag}
                                                            address={this.state.address}
                                                            // handleInput={this.handleInput}
                                                            isMarkerShown={true} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* dropzone component starts here */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="dropzone-wrapper">
                                                <ReactDropzone
                                                    accept="image/*"
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
                                                                                {this.state.files.map((file) => (
                                                                                    <div className="dropzone-image">
                                                                                        <img
                                                                                            alt="Preview"
                                                                                            key={file.preview}
                                                                                            src={file.preview}
                                                                                            style={previewStyle}
                                                                                        />
                                                                                        <span className="cross-btn" onClick={(event) => { event.stopPropagation(); this.check() }} title="sdfgh">
                                                                                            <i className="icon-Remove"></i>
                                                                                        </span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </React.Fragment>
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                </ReactDropzone>

                                            </div>
                                        </div>
                                    </div>
                                    {/* dropzone component ends here */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default AddJob;