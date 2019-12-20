import React, { Component } from 'react';
import { CarouselItem } from 'reactstrap';
import FloorPlans from '../../../commonComponents/popup/FloorPlans';
import EditJob from '../../../commonComponents/popup/EditJob';
import mapImage from '../../../../assets/images/mapimage.jpg';
import black_plus from '../../../../assets/images/black-plus.png';
import dummyImage from '../../../../assets/images/no-image.png';
import { connect } from 'react-redux';
import { GetAJob } from '../../../../store/api-actions/GetAJob';
import { END_POINT } from '../../../../constants/ApiEndPoints';
import { DropZonePopup } from '../../../commonComponents/popup/inspection/DropZonePopUp';
import _callApi from '../../../../services/baseService';
import * as SHA1 from 'sha1';
import _moment from 'moment';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DeleteConfirmation from '../../../commonComponents/popup/DeleteConfirmation';
import $ from 'jquery';

import pdfIcon from '../../../../assets/pdf.svg'


const mapStateToProps = (state) => {

    return {
        currentJob: state.inspections.currentJob,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAJob: (form) => dispatch(GetAJob({ form })),
})


class PropertyDetail extends Component {
    constructor(props) {
        super(props);
        this.file = React.createRef()
        this.state = {
            view: "grid",
            plansPopup: false,
            activeIndex: 0,
            // isChecked: true,

            checkboxes: {
                isPaid: false,
                isComplete: false
            },
            editProperty: false,

            // FOR MULTIPLE IMAGES
            responseMsg: null,
            files: [],
            areImagesUploading: false,
            uploadedImages: [],
            dropzonePopup: false,
            planID: "",

            choosenImage: {
                image: "",
                error: ""
            },

            deletePopup: {
                context: "Floor plans",
                floorPlanID: "",
                name: "this floor plan",
                deleteConfirmation: false
            },

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

    toggleDeleteConfirmation = (floor) => {

        let { deletePopup } = this.state

        deletePopup.deleteConfirmation = !deletePopup.deleteConfirmation

        if (floor && Object.keys(floor).length) {

            deletePopup.floorPlanID = floor.floorPlanID;
        } else {

            deletePopup.floorPlanID = ""
        }

        this.setState((preState) => ({ deletePopup }))
    }

    deleteData = () => {

        // this.setState(()=>({isLoading:true,deleteConfirmation:false}))

        let { deletePopup } = this.state
        let form1 = new FormData()

        form1.append("params[token]", this.getToken())
        form1.append("params[module]", "floorPlan")
        form1.append("params[id]", this.state.deletePopup.floorPlanID)
        _callApi(
            form1,
            END_POINT.DELETE_LISTDATA.END_POINT,
            END_POINT.DELETE_LISTDATA.POST
        ).then(res => {

            let { error, result } = res.data.payload;
            if (error) {
            } else {

                let reportID = localStorage.getItem("in_re_po_ID");
                let form = new FormData();

                form.append("params[token]", this.getToken())
                form.append("params[reportID]", reportID)

                this.props.getAJob(form)


            }

            if (deletePopup.deleteConfirmation) {

                this.toggleDeleteConfirmation()
            }

            this.setState(() => ({ isLoading: false }))

        }).catch((error) => {

            if (deletePopup.deleteConfirmation) {

                this.toggleDeleteConfirmation()
            }

            this.setState(() => ({ isLoading: false }))

        })
    }

    handleFile = async (e) => {



        if (e.target.files.length) {



            let form = new FormData()

            let time = new _moment().utc(new Date()).valueOf()

            let params = `timestamp=${time}` + `${END_POINT.CLOUDNARY.API_SECRET}`

            let auth = SHA1(params)

            let choosenImage = this.state.choosenImage

            // uploadedImage.progress = progress
            //    choosenImage.error = ""
            //    this.setState({  choosenImage })

            //  console.log(params)
            this.setState(() => ({ areImagesUploading: true }))

            let res = await this.uploadImages(e.target.files[0])

            choosenImage.image = res['data']['secure_url']
            //   console.log(res);
            this.setState(() => ({ choosenImage }))
            this.addReportPhoto(res['data']['secure_url'])

        }
    }

    addReportPhoto = (photo) => {

        let form = new FormData()

        form.append('params[token]', this.getToken('token'))
        let reportID = localStorage.getItem("in_re_po_ID");

        form.append('params[reportID]', reportID)
        form.append('params[photo]', photo)

        _callApi(
            form,
            END_POINT.ADD_REPORT_IMAGE.END_POINT,
            END_POINT.ADD_REPORT_IMAGE.POST,
        ).then(res => {

            let { error = null, result } = res.data.payload

            if (error) {

            } else {

                this.setState(() => ({ areImagesUploading: false }))

            }
        }).catch(() => {


        })
        // form.append('params[token]', this.getToken('token'))
    }

    toggleDropzone = () => {

        let { responseMsg, files, planID } = this.state

        responseMsg = ""
        files = [];
        planID = ""
        this.setState((preState) => ({ responseMsg, files, planID, dropzonePopup: !preState.dropzonePopup }))
    }

    toggleCheck = (event) => {

        // console.log(event.target.name);

        let { checkboxes } = this.state

        checkboxes[event.target.name] = event.target.checked
        this.setState({ checkboxes });

        let form = new FormData()

        let obj = { isComplete: 0, isPaid: 0 }

        if (checkboxes.isComplete) {
            obj.isComplete = 1
        } else {
            obj.isComplete = 0
        }

        if (checkboxes.isPaid) {
            obj.isPaid = 1
        } else {
            obj.isPaid = 0
        }
        let reportID = localStorage.getItem("in_re_po_ID");

        form.append('params[token]', this.getToken('token'))
        form.append('params[reportID]', reportID)
        form.append('params[isComplete]', obj.isComplete)
        form.append('params[isPaid]', obj.isPaid)
        _callApi(
            form,
            END_POINT.UPDATE_REPORT_STATUS.END_POINT,
            END_POINT.UPDATE_REPORT_STATUS.POST
        ).then(res => {

            let { error, result } = res.data.payload

            if (error) {

            } else {

                console.log(result);

            }
        })
    }

    printPDF = (activeIndex) => {

        //  console.log(this.props.currentJob.data);
        let jspdf = new jsPDF();
        // jspdf.addHTML(printContents);

        this.props.currentJob.data.floorplan.map((item, index) => {


            if (activeIndex === index) {

                let type = item.photo.slice(item.photo.lastIndexOf(".") + 1, item.photo.length);

                if (type === "pdf") {

                    this.printPdf(item);

                } else {

                    this.printImage(item.floorPlanID);
                }
            }
        })

    }

    printPdf = (item) => {

        var a = document.createElement("a");
        document.body.appendChild(a);

        a.href = item.photo;
        a.target = "blank"
        a.download = `myFile-${new Date().toLocaleDateString()}.pdf`;
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);

        }, 100);

    }

    printImage = (id) => {
        var printContents = document.getElementById(id);
        html2canvas(printContents,
            { useCORS: true }).then((canvas) => {

                let imgData = canvas.toDataURL('image/jpeg')

                const pdf = new jsPDF();

                setTimeout(() => {

                    pdf.addImage(imgData, 'JPEG', 15, 40, 180, 160);
                    pdf.save(`report_of_${_moment().format("MM-DD-YYYY LTS")}.pdf`);
                })
            })
    }

    downloadReport = (id) => {

        axios.get(`http://52.44.81.237/truehomereview/index.php?home_id=${id}`).then(function(res){
                var doc = new jsPDF(); 
            
                console.log(res)
                // let el = document.getElementById("report")
                let popup = window.open('', '_blank', 'width=300,height=300')
                popup.document.open();
                popup.document.write(res.data)

                popup.onclick =()=>{

                    console.log(popup.document.body)

                    doc.fromHTML(popup.document.body, "100%", "100%", {
                        'width': 170,
                        
                        },(res)=>{
    
                            console.log(res)
                            doc.save(`${_moment().format("DD/MM/YYYY hh:mm:ss")}.pdf`);
    
                            // el.innerHTML=''
                        });
                }
                // popup.document.close()
                
        })

//         fetch("http://52.44.81.237/truehomereview/index.php?home_id=440", {
//         method: "GET", // *GET, POST, PUT, DELETE, etc.
//         mode: "no-cors", // no-cors, cors, *same-origin
//         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//             "Content-Type": "application/json",
//             // "Content-Type": "application/x-www-form-urlencoded",
//         },
//         redirect: "follow", // manual, *follow, error
//         referrer: "no-referrer", // no-referrer, *client
//         // body data type must match "Content-Type" header
//     })
//     .then(response =>{ 
//         // console.log("response",response);
//         return response.json()
// // console.log(response) });
// //         let iframe = React.createElement('iframe', { src: "http://52.44.81.237/truehomereview/index.php?home_id=432", style: "visibility:hidden;display:none" })

// //         iframe.onload = function () { alert('myframe is loaded'); }; // before setting 'src'
// //         document.body.appendChild(iframe); // add it to wherever you need it in the document

//     }).then(response=>{
//         var doc = new jsPDF(); 

//         doc.fromHTML(response, 15, 15, {
//             'width': 170,
                
//             });
//     doc.save('sample-file.pdf');
//     })
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

        let reportID = localStorage.getItem("in_re_po_ID");
        let form = new FormData();

        form.append("params[token]", this.getToken())
        form.append("params[reportID]", reportID)

        this.props.getAJob(form)
    }

    componentWillReceiveProps(nextProps) {

        let { data } = nextProps.currentJob;

        let { checkboxes } = this.state
        if (data) {

            let { report } = data

            if (report.isComplete === "1") {

                checkboxes.isComplete = true
            } else {
                checkboxes.isComplete = false

            }

            if (report.isPaid === "1") {

                checkboxes.isPaid = true
            } else {
                checkboxes.isPaid = false

            }

            this.setState(() => ({ checkboxes }))
        }
    }


    // FOR IMAGE DROPZONE
    onPreviewDrop = (files) => {

        if (files && this.state.files.length + files.length < 50) {

            let arr = files.map(file => {

                return Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            })
            this.setState({
                files: this.state.files.concat(arr),
            });
        }
    }

    removeImage = (index) => {

        let { files } = this.state

        files.splice(index, 1)

        this.setState(() => ({ files }))
    }

    handleImages = () => {


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

    buildCsv = () => {

        let address = null
        let floorplan = []
        let inspector = null
        let report = null
        let sections = null
        let scores = null
        let review_details = null;

        if (this.props.currentJob.data) {

            address = this.props.currentJob.data.address
            floorplan = this.props.currentJob.data.floorplan
            inspector = this.props.currentJob.data.inspector
            report = this.props.currentJob.data.report
            sections = this.props.currentJob.data.sections
            scores = this.props.currentJob.data.scores
        }

        const picked = (({ address, floorplan, inspector, report, sections, scores, review_details }) => {

            // console.log(expiredAt)
            return {
                "Address": (address) ? address.city + " " + address.state + " " + address.zip : "",
                "Report ID": report ? report.reportID : "",
                "Report Photo": report ? report.photo : "",
                "Scheduled Time": this.getDateFormat(report.scheduledTime),
                "Start Time": this.getDateFormat(report.startTime),
                "Score of dry wall": (scores) ? scores.drywall : "",
                "Score of wood work": (scores) ? scores.woodwork : "",
                "adjusted_earned": (review_details) ? review_details.adjusted_earned : "",
                "adjusted_total": (review_details) ? review_details.adjusted_total : "",
                "adjusted_total_percent": (review_details) ? review_details.adjusted_total_percent : "",
                "average_quality": (review_details) ? review_details.average_quality : "",
                "cl_defects": (review_details) ? review_details.cl_defects : "",
                "cleanliness": (review_details) ? review_details.cleanliness : "",
                "cos_defects": (review_details) ? review_details.cos_defects : "",
                "defect_count": (review_details) ? review_details.defect_count : "",
                "drywall": (review_details) ? review_details.drywall : "",
                "earned_quality": (review_details) ? review_details.earned_quality : "",
                "filed_review": (review_details) ? review_details.filed_review : "",
                "form_version": (review_details) ? review_details.form_version : "",
                "iq_defects": (review_details) ? review_details.iq_defects : "",
                "items_reviewed": (review_details) ? review_details.items_reviewed : "",
                "op_defects": (review_details) ? review_details.op_defects : "",
                "paint": (review_details) ? review_details.paint : "",
                "possible_quality_score": (review_details) ? review_details.possible_quality_score : "",
                "submissionNumber": (review_details) ? review_details.submissionNumber : "",
                "total_defect_deduction": (review_details) ? review_details.total_defect_deduction : "",
                "total_earned": (review_details) ? review_details.total_earned : "",
                "woodwork": (review_details) ? review_details.woodwork : "",

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

    // downloadReport=()=>{

    //      let iframe = React.createElement('iframe',{src:"http://52.44.81.237/truehomereview/index.php?home_id=432", style: "visibility:hidden;display:none"})


    // }

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

    nowUploadToKumoulous = () => {

        let form = new FormData()

        form.append('params[token]', this.getToken())

        let reportID = localStorage.getItem("in_re_po_ID");

        let planID = this.state['planID']
        if (planID && planID.trim()) {

            form.append('params[planID]', planID)
        }
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

    editJob = ({ id }) => {

        localStorage.setItem("edit_in_re_po_id", id)
        let { history } = this.props
        // console.log(id);

        setTimeout(() => {

            history.push("/main/inspections/edit-job")

        })

        // "/main/inspections/edit-job"
    }

    handleFloorTagChange = (event) => {

        this.setState({ [event.target.name]: event.target.value })
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

    removeComma = (str) => {

        if (str && str.substring(str.length - 1, str.length) === ',') {

            return str.substring(0, str.length - 1);
        } else {
            return "";
        }
    }

    // Edit


    render() {
        // const { activeIndex } = this.state;
        let user = JSON.parse(localStorage.getItem("user"))
        let address = null
        let floorplan = []
        let inspector = null
        let report = null
        let sections = null
        let score = null
        let scores = null;
        let property = null
        let review_details = null
        let floorPlanID = null
        if (this.props.currentJob.data) {

            address = this.props.currentJob.data.address
            score = this.props.currentJob.data.score
            floorplan = this.props.currentJob.data.floorplan
            inspector = this.props.currentJob.data.inspector
            report = this.props.currentJob.data.report
            sections = this.props.currentJob.data.sections
            scores = this.props.currentJob.data.scores
            property = this.props.currentJob.data.property
            review_details = this.props.currentJob.data.review_details
            floorPlanID = this.removeComma(this.props.currentJob.data.floorPlanID)

            report.photo = (report.photo) ? report.photo.split(',')[0] : '';
        }

        const slides = floorplan.map((item) => {

            let type = item.photo.slice(item.photo.lastIndexOf(".") + 1, item.photo.length);

            let card = null;
            if (type === "pdf") {

                card = <img id={item.floorPlanID} src={pdfIcon} alt={'photo not found'} className="h-100" />
            } else {

                card = <img id={item.floorPlanID} src={item.photo} alt={'photo not found'} className="h-100" />
            }
            return (
                <CarouselItem
                    className="carouselImg"
                    onExiting={this.onExiting}
                    onExited={this.onExited}

                    key={(item.floorPlanID) ? item.floorPlanID : null}
                >

                    <div className="carousel-image-wrapper">

                        {card}

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
                                            {user && +user.userType === 1 ?
                                                <div className="float-right">
                                                    <a href="javascript:void(0)" onClick={report ? () => this.editJob({ id: report.reportID }) : null} >
                                                        <span className="cursor-pointer d-flex align-items-center">
                                                            <i className="icon-edit pr-2"></i>
                                                            Edit
                                                </span>
                                                    </a>
                                                </div> : null
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="positive-relative detailed-image-wrapper">
                                                    <img src={this.state.choosenImage.image ? this.state.choosenImage.image : (report && report.photo) ? report.photo : dummyImage} alt="" />
                                                    <input accept="image/*" style={{ display: "none" }} type="file" onChange={(e) => {
                                                        // if(e.target.type)
                                                        // console.log(e.target.files[0]);
                                                        if (e.target.files && e.target.files.length && e.target.files[0].type.includes('image'))
                                                            this.handleFile(e)
                                                    }} ref={node => this.file = node} />

                                                    {user && +user.userType === 1 ?
                                                        <div onClick={() => this.file.click()} id="cloudnary-upload" className="new-photo over-new-photo  add-icon-position" >
                                                            <i className="icon-add"></i>
                                                        </div>
                                                        : null
                                                    }

                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-0">
                                                <div className="property-details-description pb-3">
                                                    <span className="detail-title pr-2">Review Date:</span>
                                                    <span className="details-description">{report ? report.scheduledTime : ""}</span>
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
                                                    <span className="detail-title pr-2">Neighborhood</span>
                                                    <span className="details-description">{(address) ? address.neighborhood : ""}</span>
                                                </div>
                                                <div className="property-details-description">
                                                    <span className="detail-title pr-2">Type:</span>
                                                    <span className="details-description">{report ? report.type : ""}</span>
                                                </div>
                                                <div className="property-details-description pb-3">
                                                    <span className="detail-title pr-2">Square feet:</span>
                                                    <span className="details-description">{property ? property.squareFeet : ""}</span>
                                                </div>
                                                <div className="property-details-description">
                                                    <span className="detail-title pr-2">Inspector:</span>
                                                    <span className="details-description">{(inspector) ? inspector.firstName + " " + inspector.lastName : ""}</span>
                                                </div>
                                                <div className="property-details-description pb-3">
                                                    <span className="detail-title pr-2">Score:</span>
                                                    <span className="details-description">{report ? report.score : ""}</span>
                                                </div>


                                                {user && +user.userType === 1 ?

                                                    <div className="mt-3 clearfix">
                                                        <div className="float-left w-50 d-flex align-items-center form-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                id="complete"
                                                                name="isComplete"
                                                                checked={this.state.checkboxes.isComplete}
                                                                onChange={this.toggleCheck}
                                                            />
                                                            <label htmlFor="complete">Complete</label>
                                                        </div>
                                                        <div className="float-left d-flex align-items-center form-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                id="paid"
                                                                checked={this.state.checkboxes.isPaid}
                                                                name="isPaid"
                                                                onChange={this.toggleCheck}
                                                            />
                                                            <label htmlFor="paid">Paid</label>
                                                        </div>
                                                    </div> : null
                                                }
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
                                                            <li><span className="detail-title_common">Zone: </span>{report ? report.zoneID : ""}</li>
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
                                                                <li><span className="detail-title_common">Floor Plans: </span>{(floorPlanID) ? floorPlanID : ""}</li>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8 pl-2">
                                                <div className="clearfix  pl-1 pr-1">
                                                    <h2 className="mb-3 float-left">Floor Plans</h2>
                                                    {user && +user.userType === 1 ?

                                                        <span onClick={this.toggleDropzone} className="float-right cursor-pointer d-flex align-items-center">
                                                            <i className="icon-add pr-2"></i>
                                                            <span>Add New</span>
                                                        </span>
                                                        : null
                                                    }
                                                </div>
                                                <div className="map-listing">
                                                    {
                                                        (floorplan && floorplan.length) ?
                                                            <ul className="clearfix p-0 m-0" onClick={this.togglePlansPopup}>

                                                                {floorplan.map(item => {

                                                                    let type = item.photo.slice(item.photo.lastIndexOf(".") + 1, item.photo.length);

                                                                    // console.log(file);
                                                                    if (type === "pdf") {

                                                                        return <li key={(item.floorPlanID) ? item.floorPlanID : ""} className="mb-2">
                                                                            <img src={pdfIcon} className="img-fluid" alt="Floor Map" />

                                                                            {(user && +user.userType === 1) ?

                                                                                <span
                                                                                    className="cross-btn"
                                                                                    onClick={(event) => { event.stopPropagation(); this.toggleDeleteConfirmation(item) }}
                                                                                    title="sdfgh">
                                                                                    <i className="icon-Remove"></i>
                                                                                </span>
                                                                                : null
                                                                            }
                                                                        </li>
                                                                    } else {
                                                                        return <li key={(item.floorPlanID) ? item.floorPlanID : ""} className="mb-2">
                                                                            <img src={item.photo} className="img-fluid" alt="Floor Map" />

                                                                            {(user && +user.userType === 1) ?

                                                                                <span
                                                                                    className="cross-btn"
                                                                                    onClick={(event) => { event.stopPropagation(); this.toggleDeleteConfirmation(item) }}
                                                                                    title="sdfgh">
                                                                                    <i className="icon-Remove"></i>
                                                                                </span>
                                                                                : null
                                                                            }
                                                                        </li>
                                                                    }
                                                                })
                                                                }
                                                            </ul>
                                                            : <p>No floor plans available</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {user && report ?
                                        <div className="property-review-detail">
                                            <div className="pro-loaction-details clearfix mb-3">
                                                <div className="clearfix">
                                                    <h2 className="mb-3 float-left">Review Details</h2>
                                                    <a target="blank" href={`http://52.44.81.237:8065/inspectionReview?home_id=${report ? report.reportID : ""}`}> 
                                                    <span onClick={(this.props.currentJob.data && this.props.currentJob.data.address) ? () => null: null} className="float-right d-flex align-items-center cursor-pointer">
                                                        <i className="icon-list pr-1"></i>
                                                        <span>Download Report</span>
                                                    </span> 
                                                    </a>
                                            </div>


                                            <div className="review-detail-list-wrapper">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Start Date: </span>
                                                            {report ? report["startTime"] : ""}
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>End Date: </span>
                                                            {report ? report["endTime"] : ""}
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Submission Number: </span>
                                                            {review_details ? review_details.submissionNumber : ""}
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Form Version: </span>
                                                            {review_details ? review_details.form_version : ""}

                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Items Reviewed: </span>
                                                            {review_details ? review_details.items_reviewed : ""}

                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Item Defect Count: </span>
                                                            {review_details ? review_details.defect_count : ""}

                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Total Deductions: </span>
                                                            {review_details ? review_details.total_defect_deduction : ""}

                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Total Earned: </span>
                                                            {review_details ? review_details.total_earned : ""}

                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>IQ Defects:</span>
                                                            {review_details ? review_details.iq_defects : ""}
                                                        </label>
                                                    </div>

                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>COS Defects: </span>
                                                            {review_details ? review_details.cos_defects : ""}
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>CL Defects: </span>
                                                            {review_details ? review_details.cl_defects : ""}
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>OP Defects: </span>
                                                            {review_details ? review_details.op_defects : ""}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Paint Score: </span>
                                                            {review_details ? review_details.paint : ""}
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Drywall Score: </span>
                                                            {review_details ? review_details.drywall : ""}
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Woodwork Score: </span>
                                                            {review_details ? review_details.woodwork : ""}
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Cleanliness Score: </span>
                                                            {review_details ? review_details.cleanliness : ""}
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Filed Review Score: </span>
                                                            {review_details ? review_details.filed_review : ""}

                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Possible Quality Points:</span>
                                                            {review_details ? review_details.possible_quality_score : ""}

                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Average Quality Score: </span>
                                                            {review_details ? review_details.average_quality : ""}

                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Earned Quality Score: </span>
                                                            {review_details ? review_details.earned_quality : ""}

                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Adjusted Possible Points: </span>
                                                            {review_details ? review_details.adjusted_possible_points : ""}

                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Adjusted Earned Points: </span>

                                                            {review_details ? review_details.adjusted_earned : ""}
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Adjusted Total Percent Score: </span>
                                                            {review_details ? review_details.adjusted_total_percent : ""}

                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <label>
                                                            <span>Adjusted Total Points: </span>
                                                            {review_details ? review_details.adjusted_total : ""}

                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    : null}
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
                        // FOR FLOOR TAG INPUT BOX
                        handleFloorTagChange={this.handleFloorTagChange}
                        planID={this.state['planID']}
                        // END
                        removeImage={this.removeImage} />
                    <FloorPlans
                        printPDF={this.printPDF}
                        slides={slides}
                        activeIndex={this.state.activeIndex}
                        next={this.next}
                        previous={this.previous}
                        togglePlansPopup={this.togglePlansPopup}
                        plansPopup={this.state.plansPopup} />

                    <DeleteConfirmation
                        deleteConfirmation={this.state.deletePopup.deleteConfirmation}
                        deleteConfirm={this.state.deletePopup}
                        toggleDeleteConfirmation={this.toggleDeleteConfirmation}
                        deleteData={this.deleteData}
                    />
                    <EditJob toggleEditJob={this.toggleEditJob} editProperty={this.state.editProperty} />
                </div>
            </LoadingOverlay>
        )
    }
}
export default PropertyDetail = connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(PropertyDetail);