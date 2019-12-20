import React, { Component } from 'react';
import { CarouselItem } from 'reactstrap';
import mapImage from '../../../assets/images/mapimage.jpg';
import dummyImage from '../../../assets/images/no-image.png';
import { connect } from 'react-redux';
// import _callApi from '../../../../services/baseService';
import * as SHA1 from 'sha1';
import _moment from 'moment';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom';
import { DropZonePopup } from '../../../view/commonComponents/popup/inspection/DropZonePopUp';
import { END_POINT } from '../../../constants/ApiEndPoints';
import { GetAJob } from '../../../store/api-actions/GetAJob';
import FloorPlans from '../../../view/commonComponents/popup/FloorPlans';
import _callApi from '../../../services/baseService';

const mapStateToProps = (state) => {

    return {
        currentJob: state.inspections.currentJob,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAJob: (form) => dispatch(GetAJob({ form })),
})


class ExternalPropertyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "grid",
            plansPopup: false,
            activeIndex: 0,
            isChecked: true,
            editProperty: false,

            // FOR MULTIPLE IMAGES
            responseMsg: null,
            files: [],
            areImagesUploading: false,
            uploadedImages: [],
            dropzonePopup: false

        }

        this.togglePlansPopup = this.togglePlansPopup.bind(this);
        // floor plans carousel
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }
    toggleEditJob = () => {
        this.setState({
            editProperty: !this.state.editProperty
        });
    }

    toggleDropzone = () => {

        this.setState((preState) => ({ dropzonePopup: !preState.dropzonePopup }))
    }

    toggleCheck = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }


    // floor plans popups
    togglePlansPopup() {
        this.setState({
            plansPopup: !this.state.plansPopup
        });
    }

    changeListView = (view) => {
        if (view === "list") {
            this.setState(() => ({ view: view }))
        } else if (view === "grid") {
            this.setState(() => ({ view: view }))
        }
    }

    // floor carousel
    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.currentJob.data.floorplan.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.currentJob.data.floorplan.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    componentDidMount() {

        let reportID = localStorage.getItem("ex_in_re_po_ID");
        let form = new FormData();

        form.append("params[token]", this.getToken())
        form.append("params[reportID]", reportID)

        this.props.getAJob(form)
    }


    // FOR IMAGE DROPZONE
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

    printPDF = (activeIndex) => {

        //  console.log(this.props.currentJob.data);

        this.props.currentJob.data.floorplan.map((item, index) => {

            if (activeIndex === index) {

                this.printDiv(item.floorPlanID);

                // console.log(item.photo);
            }
        })

    }

    printDiv = (divName) => {
        var printContents = document.getElementById(divName).innerHTML;

        var myWindow = window.open('', '', 'width=3263,height=1393');
        myWindow.document.write(printContents);

        myWindow.document.close();
        myWindow.focus();
        myWindow.print();
        myWindow.close();
    }

    removeImage = (index) => {

        let { files } = this.state

        files.splice(index, 1)

        this.setState(() => ({ files }))
    }

    handleImages = () => {

        console.log(this.state.files, "hello");


        if (this.state.files) {

            let { uploadedImages } = this.state;
            this.setState(() => ({ areImagesUploading: true, dropzonePopup: false }))
            Promise.all(
                this.state.files.map(
                    (item, index) => {

                        return (async (data, i) => {
                            let res = await this.uploadImages(data);

                            return res
                        })(item, index)

                    }
                )
            ).then(res => {


                res.map((item, index) => {


                    if (item['data']['secure_url']) {

                        // console.log(item['data']['secure_url']);
                        uploadedImages.push(item.data.secure_url)
                    }

                })

                this.setState(() => ({ uploadedImages }))

                setTimeout(() => {

                    // console.log(uploadedImages);
                    this.nowUploadToKumoulous()
                })


            }).catch(() => this.setState(() => ({ areImagesUploading: false })))
        }
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
            "https://api.cloudinary.com/v1_1/sylab/image/upload",
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

    nowUploadToKumoulous = () => {

        let form = new FormData()

        form.append('params[token]', this.getToken())

        let reportID = localStorage.getItem("in_re_po_ID");
        form.append('params[reportID]', reportID)

        let { uploadedImages } = this.state

        // console.log("uploadedImages ",uploadedImages);
        let json = JSON.stringify(uploadedImages)

        form.append('params[photos]', json);

        _callApi(
            form,
            END_POINT.ADD_FLOOR_PLANS.END_POINT,
            END_POINT.ADD_FLOOR_PLANS.POST,
        ).then(res => {

            let { error = null, result = null } = res.data.payload;

            if (error) {

            } else {

                // this.setState(()=>({}))
                this.setState(() => ({ files: [], uploadedImages: [], responseMsg: true, areImagesUploading: false }))
                // localStorage.removeItem("_rep_ort_ID")


                let reportID = localStorage.getItem("in_re_po_ID");
                let form = new FormData();

                form.append("params[token]", this.getToken())
                form.append("params[reportID]", reportID)

                this.props.getAJob(form)
                // setTimeout(()=>{

                //     this.props.history.push('/main/inspections')
                // },2000)
            }
        }).catch(() => {

            this.props.history.push('/main/inspections')
        })
    }

    buildCsv = () => {

        let address = null
        let floorplan = []
        let inspector = null
        let report = null
        let sections = null
        let scores = null

        if (this.props.currentJob.data) {

            address = this.props.currentJob.data.address
            floorplan = this.props.currentJob.data.floorplan
            inspector = this.props.currentJob.data.inspector
            report = this.props.currentJob.data.report
            sections = this.props.currentJob.data.sections
            scores = this.props.currentJob.data.scores
        }

        const picked = (({ address, floorplan, inspector, report, sections, scores }) => {

            // console.log(expiredAt)
            return {
                "Address": (address) ? address.city + " " + address.state + " " + address.zip : "",
                "Report ID": report ? report.reportID : "",
                "Report Photo": report ? report.photo : "",
                "Scheduled Time": this.getDateFormat(report.scheduledTime),
                "Start Time": this.getDateFormat(report.startTime),
                "Score of dry wall": (scores) ? scores.drywall : "",
                "Score of wood work": (scores) ? scores.woodwork : "",

            }
        })(this.props.currentJob.data);

        this.downloadFile(picked);

        // }
    }

    getDateFormat = (d) => {

        if (d) {

            let arr = d.split('-');

            let date = +arr[0]
            let month = +arr[1] - 1
            let year = +arr[2]


            // console.log(arr);

            return date + "-" + month + "-" + year;
        } else {
            return ""
        }
    }

    downloadFile(data) {
        const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
        const header = Object.keys(data);
        let csv = header.map(fieldName => {
            return JSON.stringify(data[fieldName], replacer)

        }).join(",")

        let arr = []

        arr.push(csv)
        arr.unshift(header.join(","));
        let csvArray = arr.join("\r\n");

        var a = document.createElement("a");
        document.body.appendChild(a);
        var blob = new Blob([csvArray], { type: "text/csv" }),
            url = window.URL.createObjectURL(blob);

        console.log("blob", blob);
        console.log("url", url);

        a.href = url;
        a.download = `myFile-${new Date().toLocaleDateString()}.csv`;
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            // console.log("a", a);
            window.URL.revokeObjectURL(url);
            // console.log("a", "zsasas");
        }, 100);
    }

    editJob = ({ id }) => {

        localStorage.setItem("edit_in_re_po_id", id)
        let { history } = this.props
        // console.log(id);

        setTimeout(() => {

            history.push("/main/inspections/edit-job")

        })

        // "/main/inspections/edit-job"
    }

    getFormatedDate = (timeCreated)=>{

        let date = new Date(timeCreated);

        let d = date.getDate();
        let m = date.getMonth()+1
        let y = date.getFullYear()

        return d+"/"+m+"/"+y;
    }

    // componentWillReceiveProps(nextProps){    }

    getToken = () => {

        let user = JSON.parse(localStorage.getItem("user"))

        if (user) {

            return user.token;
        } else {
            return ''
        }
    }

    removeComma=(str)=>{

        if( str && str.substring(str.length-1,str.length) === ','){

          return  str.substring(0,str.length-1);
        }else{
            return "";
        }
    }

    // Edit


    render() {
        // const { activeIndex } = this.state;
        let address = null
        let floorplan = []
        let inspector = null
        let report = null
        let sections = null
        let scores = null
        let property = null
        let review_details = null
        let floorPlanID = null
        if (this.props.currentJob.data) {

            address = this.props.currentJob.data.address
            floorplan = this.props.currentJob.data.floorplan
            inspector = this.props.currentJob.data.inspector
            report = this.props.currentJob.data.report
            sections = this.props.currentJob.data.sections
            scores = this.props.currentJob.data.scores
            property = this.props.currentJob.data.property
            review_details = this.props.currentJob.data.review_details
            floorPlanID = this.removeComma(this.props.currentJob.data.floorPlanID)
        }

        const slides = floorplan.map((item) => {
            return (
                <CarouselItem
                    className="carouselImg text-center"
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={(item.floorPlanID) ? item.floorPlanID : Math.random()}
                >
                    <div id={item.floorPlanID} >

                        <img src={item.photo} alt={'photo not found'} className="img-fluid" />
                    </div>
                    {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
                </CarouselItem>
            );
        });
        return (
            <LoadingOverlay
                active={this.state.areImagesUploading}
                spinner
                text='Uploading images...'
            >
                <div className="inspections light-background">
                    <div className={`property-wrapper`}>
                        <ul className="clearfix">
                            <li>
                                <div className="property-card listing-wrapper p-3">
                                    <div className="property-detail-card  ">
                                        <div className="property-detail-header mb-2 clearfix">
                                            <div className="float-left">
                                                <h2>{report ? report.lotID : ""}</h2>
                                            </div>
                                            {/* <div className="float-right">
                                            <a href="javascript:void(0)" onClick={ report ? ()=>this.editJob({id:report.reportID}) :null } >
                                                <span  className="cursor-pointer d-flex align-items-center">
                                                    <i className="icon-edit pr-2"></i>
                                                    Edit
                                                </span>
                                            </a>
                                            </div> */}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="detailed-image-wrapper">
                                                    <img src={(report && report.photo) ? report.photo : dummyImage} className="img-fluid w-100" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-0">
                                                <div className="property-details-description pb-3">
                                                    <span className="detail-title pr-2">Review Date:</span>
                                                    <span className="details-description">10/12/2018</span>
                                                </div>
                                                <div className="property-details-description pb-3">
                                                    <span className="detail-title pr-2">PO Number:</span>
                                                    <span className="details-description">{report ? report.poID : ""}</span>
                                                </div>
                                                <div className="property-details-description">
                                                    <span className="detail-title pr-2">Street:</span>
                                                    <span className="details-description">{address ? address.street : ""}</span>
                                                </div>
                                                <div className="property-details-description">
                                                    <span className="detail-title pr-2">City/State/Zip:</span>
                                                    <span className="details-description">{address ? address.city + " " + address.state + " " + address.zip : ""}</span>
                                                </div>
                                                <div className="property-details-description pb-3">
                                                    <span className="detail-title pr-2">Neighborhood:</span>
                                                    <span className="details-description">Randolph</span>
                                                </div>
                                                <div className="property-details-description">
                                                    <span className="detail-title pr-2">Type:</span>
                                                    <span className="details-description">{report ? report.type : ""}</span>
                                                </div>
                                                <div className="property-details-description pb-3">
                                                    <span className="detail-title pr-2">Square feet:</span>
                                                    <span className="details-description">{ property ? property.squareFeet :""}</span>
                                                </div>
                                                <div className="property-details-description">
                                                    <span className="detail-title pr-2">Inspector:</span>
                                                    <span className="details-description">{(inspector) ? inspector.firstName + " " + inspector.lastName : ""}</span>
                                                </div>
                                                <div className="property-details-description pb-3">
                                                    <span className="detail-title pr-2">Score:</span>
                                                    <span className="details-description">85%</span>
                                                </div>
                                                <div className="property-details-description">
                                                    <span className="detail-title pr-2">Photo Taken:</span>
                                                    <span className="details-description"><em>10/12/2018 @ 7:00 p.m</em></span>
                                                </div>

                                                {/* <div className="mt-3 clearfix">
                                                    <div className="float-left w-50 d-flex align-items-center form-checkbox">
                                                        <input type="checkbox"
                                                            id="complete"
                                                            checked={this.state.isChecked}
                                                            onChange={this.toggleCheck}
                                                        />
                                                        <label htmlFor="complete">Complete</label>
                                                    </div>
                                                    <div className="float-left d-flex align-items-center form-checkbox">
                                                        <input type="checkbox" id="paid" />
                                                        <label htmlFor="paid">Paid</label>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="property-maps-location mt-3 pb-3 mb-3">
                                        <div className="row">
                                            <div className="col-md-4 border-right">
                                                <div className="pro-loaction-details clearfix mb-3">
                                                    <h2 className="mb-3">Location Details</h2>
                                                    <div className="float-left w-50">
                                                        <ul className="p-0 m-0">

                                                            <li>
                                                                <span className="detail-title_common">ID Code: </span>{property ? property.idCode : ""}
                                                        </li>
                                                            <li>
                                                                <span className="detail-title_common">Section: </span>{address ? address.section : ""}
                                                            </li>
                                                            <li>
                                                                <span className="detail-title_common">Lot: </span>{address ? address.lot : ""}
                                                            </li>
                                                            <li>
                                                                <span className="detail-title_common">Block: </span>{address ? address.block : ""}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="float-left w-50">
                                                        <ul className="p-0 m-0">
                                                            <li><span className="detail-title_common">Street: </span>{address ? address.street : ""}</li>
                                                            <li><span className="detail-title_common">Zone: </span>{address ? address.zoneID : ""}</li>
                                                            <li><span className="detail-title_common">GPS Code: </span>{(report) ? report.latitude + " " + report.longitude : ""}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="pro-home-detail">
                                                    <div className="pro-loaction-details listing-wrapper clearfix mb-3">
                                                        <h2 className="mb-3">Home Details</h2>
                                                        <div className="">
                                                            <ul className="p-0 m-0">
                                                            <li><span className="detail-title_common">Bedrooms: </span>{(property) ? property.bedrooms : ""}</li>
                                                                <li><span className="detail-title_common">Bathrooms: </span>{(property) ? property.bathrooms : ""}</li>
                                                                <li><span className="detail-title_common">Floors: </span>{(property) ? property['floors'] : ""}</li>
                                                                <li><span className="detail-title_common">Basement: </span>{(property) ? property.basement : ""}</li>
                                                                <li><span className="detail-title_common">Floor Plans: </span>{(floorPlanID)?floorPlanID :""}</li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8 pl-2">
                                                {/* <div className="clearfix  pl-1 pr-1">
                                                    <h2 className="mb-3 float-left">Floor Plans</h2>
                                                    <span onClick={this.toggleDropzone} className="float-right cursor-pointer d-flex align-items-center">
                                                        <i className="icon-add pr-2"></i>
                                                        <span>Add New</span>
                                                    </span>
                                                </div> */}
                                                <div className="map-listing">
                                                    <ul className="clearfix p-0 m-0" onClick={this.togglePlansPopup}>

                                                        {
                                                            (floorplan && floorplan.length) ?
                                                                floorplan.map(item => {

                                                                    return <li key={(item.photo) ? item.photo : Math.random()}>
                                                                        <img src={item.photo} className="img-fluid" alt="Floor Map" />
                                                                    </li>
                                                                }) : <p>No floor plans available</p>
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="property-review-detail">
                                        <div className="pro-loaction-details clearfix mb-3">
                                            <div className="clearfix">
                                                <h2 className="mb-3 float-left">Review Details</h2>
                                                <span onClick={(this.props.currentJob.data && this.props.currentJob.data.address) ? () => this.buildCsv() : null} className="float-right d-flex align-items-center cursor-pointer">
                                                    <i className="icon-list pr-1"></i>
                                                    <span>Download Report</span>
                                                </span>
                                            </div>
                                            <div className="review-detail-list-wrapper">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Start Date: </span>
                                                             {report ? this.getFormatedDate(report.timeCreated) :""}
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>End Date: </span>
                                                            HM
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Submission Number: </span>
                                                            {review_details ? review_details.submissionNumber :""}
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Form Version: </span>
                                                            {review_details ? review_details.form_version :""}
                                                            
                                                    </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Items Reviewed: </span>
                                                            {review_details ? review_details.total_items_reviewed :""}
                                                            
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Item Defect Count: </span>
                                                            {review_details ? review_details.total_defects :""}
                                                            
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Total Deductions: </span>
                                                            {review_details ? review_details.total_deduction :""}
                                                            
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Total Earned: </span>
                                                            {review_details ? review_details.total_earned :""}
                                                            
                                                    </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>IQ Defects:</span>
                                                            38
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>COS Defects: </span>
                                                            HM
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>CL Defects: </span>
                                                            HM
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>OP Defects: </span>
                                                            HM
                                                    </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Paint Score: </span>
                                                            6
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Drywall Score: </span>
                                                            HM
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Woodwork Score: </span>
                                                            HM
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Cleanliness Score: </span>
                                                            HM
                                                    </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Filed Review Score: </span>
                                                            {review_details ? review_details.filed_review_score :""}
                                                            
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Possible Quality Points:</span>
                                                            {review_details ? review_details.possible_quality_points :""}
                                                            
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Average Quality Score: </span>
                                                            {review_details ? review_details.avg_quality_score :""}
                                                            
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Earned Quality Score: </span>
                                                            {review_details ? review_details.earned_quality_score :""}
                                                            
                                                    </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Adjusted Possible Points: </span>
                                                            {review_details ? review_details.adjusted_possible_points :""}
                                                            
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Adjusted Earned Points: </span>
                                                            
                                                            {review_details ? review_details.adjusted_earned_points :""}
                                                    </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Adjusted Total Percent Score: </span>
                                                            {review_details ? review_details.adjusted_total_percentage_score :""}
                                                            
                                                    </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <DropZonePopup
                        areImagesUploading={this.state.areImagesUploading}
                        responseMsg={this.state.responseMsg}
                        files={this.state.files}
                        onPreviewDrop={this.onPreviewDrop}
                        dropzonePopup={this.state.dropzonePopup}
                        toggleDropzone={this.toggleDropzone}
                        handleImages={this.handleImages}
                        removeImage={this.removeImage} />
                    <FloorPlans
                        printPDF={this.printPDF}
                        slides={slides}
                        activeIndex={this.state.activeIndex}
                        next={this.next}
                        previous={this.previous}
                        togglePlansPopup={this.togglePlansPopup}
                        plansPopup={this.state.plansPopup} />
                    {/* Edit Job  popup*/}
                    {/* <EditJob toggleEditJob={this.toggleEditJob} editProperty={this.state.editProperty} /> */}
                </div>
            </LoadingOverlay>
        )
    }
}
export default ExternalPropertyDetail = connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(ExternalPropertyDetail);