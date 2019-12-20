import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

// import ButtonPrimary from '../../commonComponents/buttons/ButtonPrimary';
import SearchBox from '../../commonComponents/formComponents/searchBox/SearchBox';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import _moment from 'moment';
import ReactPaginate from 'react-paginate';
import CompletedJobs from './completed/CompletedJobs';
import SelectBox from '../../commonComponents/formComponents/selectBox/SelectBox';
import PropertyDetail from './propertyDetail/PropertyDetail';
import ScheduledJobs from './scheduled/ScheduledJobs';
// import AddNewJob from '../../commonComponents/popup/AddNewJob';
import { GetInspectionJobs } from '../../../store/api-actions/GetInspectionJobs';
import { END_POINT } from '../../../constants/ApiEndPoints';
import _callApi from '../../../services/baseService';
import { DropZonePopup } from '../../commonComponents/popup/DropZonePopup';
import AddJob from './jobAddUpdate/AddJob';
import EditJob from './jobAddUpdate/EditJob';

const allJobOption = [
    { value: '', text: 'All Jobs' },
    { value: 'week', text: 'Week' },
    { value: 'month', text: 'Month' },
    { value: 'year', text: 'Year' },
]

// select option
const mapStateToProps = (state) => ({
    jobs: state.inspections.jobs,
    jobsError: state.inspections.error,
    loading: state.inspections.loading,
    total: state.inspections.total,
})

const mapDispatchToProps = (dispatch) => ({
    getInspections: (form) => dispatch(GetInspectionJobs(form)),
})


class Inspections extends Component {
    constructor(props) {
        super(props);

        this.searchBox = React.createRef();

        this.state = {

            files: [],
            activeView: 'grid',
            view: "grid",

            emailResponse: {
                sent: false,
                msg: ""
            },
            // startDate: null,
            now: _moment(),
            addNewPopup: false,
            dropzonePopup: false,
            selectedDate: {
                startDate: "",
                sd: null,
                ed: null,
                endDate: "",
            },
            filter: {
                isCompleted: 0,
                page: 1,
                neighborhood: "",
                type: "",
                fromDate: "",
                toDate: "",
                searchText: "",
                timePeriod: '',
                selected: 0,

            },
            // IT IS FOR CANCEL LAST N-1 SEARCHING REQUEST 
            cancelRequest: null,
            // 
            jobs: [],
            jobsError: false,
            dropdownValues: {
                neighborhoods: [],
                types: []
            },
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
            isDropdownFetching: false,
            // =========for pagination =================//
            pageSize: 0,
            totalPage: 0,
            // =============END======================= //
            isLoading: true,

            update: null,
        }

    }

    componentDidMount() {

        localStorage.removeItem("page_no")


        this.setState((preState) => {

            let selectedDate = preState.selectedDate;
            let filter = preState.filter
            // DATE TO SHOW 
            // selectedDate.startDate = this.formatDate(date, 0)
            // selectedDate.endDate = this.formatDate(date, 1)

            //DATE TO SEND IN API
            filter.fromDate = "";
            filter.toDate = "";

            return { selectedDate, filter }
        })

        window.scrollTo(0, 0);

        let form1 = new FormData()

        form1.append('params[token]', this.getToken())
        form1.append('params[page]', 1)

        let form2 = new FormData()


        //  form.append('params[fromDate]', sd )
        //  form.append('params[toDate]', ed )

        this.getIndividualDropdown()

        //  this.props.getInspections(form1)
        this.loadFilterDropdown()
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

                individualDropdown = { ...individualDropdown, ...result }

                individualDropdown.clients = individualDropdown.clients.map(item => ({ key: Math.random(), value: item.clientID, text: item.companyName }))
                individualDropdown.inspectors = individualDropdown.inspectors.map(item => ({ key: Math.random(), value: item.userID, text: item.firstName + " " + item.lastName }))
                individualDropdown.neighborhoods = individualDropdown.neighborhoods.map(item => ({ key: Math.random(), value: item.neighborhood, text: item.neighborhood }))
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

    cancelRequest = (source) => {

        this.setState({ cancelRequest: source });

    }

    loadJobs = (form, shouldCancel) => {


        this.toggleLoader(true)
        if (shouldCancel) {

            _callApi(
                form,
                END_POINT.INSPECTION_JOBS.END_POINT,
                END_POINT.INSPECTION_JOBS.POST,
                this.cancelRequest).then(res => {

                    let { result = null, error = null } = res.data.payload
                    //  console.log(res.data.payload); 

                    let arr = [];
                    let totalPage = 0;

                    if (error) {

                        this.toggleLoader(false)


                    } else {
                        let total = Math.ceil(+result.total / 10);

                        arr = result.data
                        totalPage = total;

                    }
                    this.setState(() => ({ jobs: arr, totalPage, isLoading: false }))

                }).catch((error) => { this.toggleLoader(false) })
        } else {

            _callApi(
                form,
                END_POINT.INSPECTION_JOBS.END_POINT,
                END_POINT.INSPECTION_JOBS.POST,
                null).then(res => {

                    let { result = null, error = null } = res.data.payload
                    //  console.log(res.data.payload); 

                    let arr = [];
                    let totalPage = 0;
                    if (error) {

                        this.toggleLoader(false)

                    } else {

                        let total = Math.ceil(+result.total / 10);

                        arr = result.data
                        totalPage = total;

                    }
                    this.setState(() => ({ jobs: arr, totalPage, isLoading: false }))

                }).catch((error) => { this.toggleLoader(false) })
        }
    }

    toggleLoader = (isLoading) => {

        this.setState(() => ({ isLoading }))

    }

    loadFilterDropdown = (form) => {

        _callApi(
            form,
            END_POINT.INSPECTION_DROPDOWN.END_POINT,
            END_POINT.INSPECTION_DROPDOWN.POST).then(res => {
                console.log("======DROPDOWN", res.data.payload);
                let { result, error } = res.data.payload

                let dropdownValues = this.state.dropdownValues;

                if (error) {


                    dropdownValues.types = []
                    dropdownValues.neighborhoods = []

                } else {

                    dropdownValues.types = result.types.map(item => ({key:Math.random(), value: item.name, text: item.name }))

                    dropdownValues.types.splice(0, 0, { value: "", text: "Show All" })

                    dropdownValues.neighborhoods = result.neighborhoods.map(item => ({key:Math.random() ,value: item.neighborhood, text: item.neighborhood }))

                    dropdownValues.neighborhoods.splice(0, 0, { value: "", text: "Show All" })

                    this.setState(() => ({ dropdownValues }))
                }

            })
    }


    //add new job
    toggleAddNewJob = ({ toggleOpCloseAndimagePopup }) => {

        if (toggleOpCloseAndimagePopup === 1) {

            this.setState({
                addNewPopup: !this.state.addNewPopup,
            });

        } else if (toggleOpCloseAndimagePopup === 2) {

            this.setState({
                addNewPopup: !this.state.addNewPopup
            });

        }
    }

    changeListView = (view) => {
        if (view === "list") {
            this.setState(() => ({ view: view }))
        } else if (view === "grid") {
            this.setState(() => ({ view: view }))
        }
    }

    handlePageNo = ({ selected }) => {

        let form = new FormData()
        let filter = this.state.filter

        let searchText = filter.searchText
        form.append("params[token]", this.getToken())

        if (selected) {
            filter.page = selected;
            filter.selected = selected - 1
        }
        // ==========================HERE SEARCH INPUT this.searchInput is a reference to input box================== //

        // this.setState(() => ({
        //         totalPage: 0,
        //         selected:0,
        //         pageSize:0
        //     }))

        for (let key in filter) {

            if (key === 'searchText' && searchText ) {

                form.append(`params[${key}]`, searchText.trim());

            }else{

                form.append(`params[${key}]`, filter[key]);
            }
        }

        this.loadJobs(form)

    }

    handleDateEvent = (event, picker) => {

        let searchText = this.searchBox.current.value;
        let selectedDate = this.state.selectedDate
        let filter = this.state.filter;
        // DATE TO SEND IN API
        // filter.fromDate = _moment(picker.startDate).format("YYYY-MM-DD").toString()
        filter.fromDate = _moment(picker.startDate).format("YYYY-MM-DD").toString()
        filter.toDate = _moment(picker.endDate).format("YYYY-MM-DD").toString()


        // UPDATE LIST
        let form = new FormData()

        form.append('params[token]', this.getToken())
        form.append('params[page]', filter.page)
        form.append("params[isCompleted]", filter.isCompleted)
        form.append('params[fromDate]', filter.fromDate)
        form.append('params[toDate]', filter.toDate)
        form.append("params[neighborhood]", filter.neighborhood)
        form.append("params[type]", filter.type)
        //  form.append("params[]")
        //  form.append("params[]")
        if (searchText && searchText.trim()) {

            filter.searchText = searchText.trim()

            form.append('params[searchText]', filter.searchText)
        } else {

            filter.searchText = ""
            form.append('params[searchText]', '')

        }

        this.setState((preState) => {

            // DATE TO SHOW 
            selectedDate.startDate = this.formatDate(picker.startDate, 0)
            selectedDate.endDate = this.formatDate(picker.endDate, 1)

            return { ...preState, ...{ selectedDate }, ...{ filter } }
        })
        this.loadJobs(form)


        //  console.log(this.searchBox);
    }

    handleSearch = (event) => {

        let searchText = this.searchBox.current.value

        let filter = this.state.filter;
        // console.log(event.target.value, this.searchBox.current.value);

        if (this.state.cancelRequest) {

        }
        let form = new FormData()

        form.append('params[token]', this.getToken())

        
        filter.searchText = searchText
        
        if (searchText && searchText.trim()){

            searchText = searchText.trim()
        }
        else{

            searchText = ""
        }
            
        // } else {
        //     filter.searchText = ""
        // }

        filter.page = 1;
        filter.selected = 0

        for (let key in filter) {

            if (key === 'searchText' && searchText ) {

                form.append(`params[${key}]`, searchText);

            } else {

                form.append(`params[${key}]`, filter[key]);
            }
        }
        this.setState(() => ({ filter }))

        this.loadJobs(form, true)
    }

    handleTimeChange = (event, data) => {

        let filter = this.state.filter

        let searchText = this.searchBox.current.value

        if (filter.timePeriod !== data.value) {

            filter.timePeriod = data.value
        }

        let form = new FormData()

        form.append('params[token]', this.getToken())

        for (let key in filter) {

            if (key === 'searchText' && searchText ) {

                form.append(`params[${key}]`, searchText.trim());

            } else{

                form.append(`params[${key}]`, filter[key]);
            }
        }
        // this.setState(() => ({ filter }))

        this.loadJobs(form, true)

        this.setState(() => ({ filter }))
    }


    handleTypesChange = (event, data) => {

        // console.log(event.target.value);
        let filter = this.state.filter;
        let searchText = this.searchBox.current.value

        if (filter.type !== data.value) {

            filter.type = data.value

            let form = new FormData();

            form.append('params[token]', this.getToken())

            for (let key in filter) {

                if (key === 'searchText' && searchText ) {

                    form.append(`params[${key}]`, searchText.trim());
    
                }else{

                    form.append(`params[${key}]`, filter[key])
                }
            }

            this.loadJobs(form)

            this.setState(() => ({ filter }))
        }


    }

    handleNChange = (event, data) => {

        // console.log(data.value);

        let filter = this.state.filter;

        let searchText = this.searchBox.current.value
        
        if (filter.neighborhood !== data.value) {

            filter.neighborhood = data.value

            let form = new FormData();

            form.append('params[token]', this.getToken())

            for (let key in filter) {
                if (key === 'searchText' && searchText ) {

                    form.append(`params[${key}]`, searchText.trim());
    
                }else{

                    form.append(`params[${key}]`, filter[key])
                }
            }

            this.loadJobs(form)

            this.setState(() => ({ filter }))
        }
    }


    formatDate = (date, type) => {

        if (type === 0) {

            return _moment(date).format("MM/DD/YYYY")
        } else if (type === 1) {

            return _moment(date).endOf("day").format("MM/DD/YYYY")
        }
    }

    getToken = () => {

        let user = JSON.parse(localStorage.getItem("user"))

        if (user) {
            return user.token;
        } else {

            return '';
        }

    }

    changeJobList = (path, isCompleted) => {

        let filter = this.state.filter;

        filter.isCompleted = isCompleted

        localStorage.removeItem("comp_page_no")
        localStorage.removeItem("incomp_page_no")
        
        filter.selected = 0;
        filter.timePeriod = ""
        filter.type =""


        this.setState(() => ({ filter }));

        if (isCompleted === 0) {
            let form = new FormData()

            form.append('params[token]', this.getToken())
            form.append('params[page]', 1)
            form.append('params[isCompleted]', 0)
            form.append("params[neighborhood]", filter.neighborhood)
            form.append("params[fromDate]", filter.fromDate)
            form.append("params[toDate]", filter.toDate)
            form.append("params[searchText]", filter.searchText)
            form.append("params[type]", filter.type)

            this.loadJobs(form, false)
        } else if (isCompleted === 1) {

            let form = new FormData()

            form.append('params[token]', this.getToken())
            form.append('params[page]', 1)
            form.append('params[isCompleted]', 1)
            form.append("params[neighborhood]", filter.neighborhood)
            form.append("params[fromDate]", filter.fromDate)
            form.append("params[toDate]", filter.toDate)
            form.append("params[searchText]", filter.searchText)
            form.append("params[type]", filter.type)

            this.loadJobs(form, false)
        }

        setTimeout(() => {

            this.props.history.push(path)
        }, 100)
    }

    handleNewJob = (values, formikBag) => {

        console.log(values);

    }

    updateIt = (type, page_no) => {

        this.setState(() => ({
            totalPage: 0,
            selected: 0,
            pageSize: 0
        }))
        let { selectedDate, dropdownValues, filter } = this.state

        // this.searchBox.current.value = ""
        selectedDate.endDate = ""
        selectedDate.startDate = ""

        filter.fromDate = ""
        filter.toDate = ""
        filter.isCompleted = type;
        filter.searchText = "";
        filter.neighborhood = ""
        filter.page = 1
        filter.type = ""
        filter.selected = 0
        filter.timePeriod = ""


        let form = new FormData()

        form.append('params[token]', this.getToken())

        
        if(page_no){
            form.append('params[page]', page_no)
            filter.selected = +page_no-1
        }else{

            form.append('params[page]', 1)
        }
        
        
        form.append('params[isCompleted]', filter.isCompleted)
        // form.append("params[token]", this.getToken())
        this.loadJobs(form)

        this.setState(() => ({ update: Math.random(), filter, selectedDate }))
    }

    toggleDropzone = () => {

        this.setState((preState) => ({ dropzonePopup: !preState.dropzonePopup }))
    }


    onPreviewDrop = (files) => {

        let arr = files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))
        this.setState({
            files: this.state.files.concat(arr),
        });
    }

    sendEmailReminder = ({ reportID, clientID }) => {
        // this.setState({
        //     emailReminder: !this.state.emailReminder
        // });

        let form = new FormData()

        form.append("params[token]", this.getUser({ key: 'token' }))
        form.append("params[reportID]", reportID)
        form.append("params[clientID]", clientID)
        // console.log(reportID,clientID);

        _callApi(
            form,
            END_POINT.SETTINGS_CLIENTS.END_POINTS.SEND_REMINDER,
            END_POINT.SETTINGS_CLIENTS.POST
        ).then(res => {

            let { error = null, result = null } = res.data.payload

            let { emailResponse } = this.state

            // console.log(error);

            if (error) {

                emailResponse.sent = false;
                emailResponse.msg = error.message;

            } else {

                emailResponse.sent = true;
                emailResponse.msg = "Email reminder is successfully sent";


            }

            this.setState(() => ({ emailResponse }))


            setTimeout(() => {

                emailResponse.sent = false
                emailResponse.msg = ""
                this.setState(() => ({ emailResponse }))
            }, 2000)
        })


    }

    getUser = ({ key }) => {

        let user = JSON.parse(localStorage.getItem("user"))

        if (user) {

            return user[key];
        } else {
            return ''
        }

    }

    componentWillUnmount(){

        localStorage.removeItem("page_no")
    }


    render() {

        let { isCompleted } = this.state.filter
        let pagination = <ReactPaginate
            pageCount={this.state.totalPage}
            pageRangeDisplayed={this.state.pageSize}
            onPageChange={({ selected }) => {
                // this.setState({ selected: selected });
                if(isCompleted){

                    localStorage.setItem("comp_page_no", selected + 1)
                }else{

                    localStorage.setItem("incomp_page_no", selected + 1)
                } 
                this.handlePageNo({ selected: selected + 1 })
            }}
            containerClassName="pagination-custom"
            forcePage={this.state.filter.selected} />

        // const { selectedOption } = this.state;

        return (
            <>
                {(this.props.location.pathname !== "/main/inspections/property-detail" && this.props.location.pathname !== "/main/inspections/edit-job" && this.props.location.pathname !== "/main/inspections/add-new-job") ?
                    <div className="inspections light-background position-relative">
                        <div className="header">

                            <div className="topHeader clearfix">
                                <div className="float-left">
                                    <ul className="list-inline list-unstyled">
                                        <li className="list-inline-item date-picker-wrapper">
                                            <DateRangePicker startDate={this.state.now} endDate={this.state.now} onHide={this.handleDateEvent} >
                                                <input
                                                    className="rounded-date-picker text-center cursor-pointer"
                                                    readOnly={true}
                                                    placeholder="select date range"
                                                    value={
                                                        (this.state.selectedDate.startDate && this.state.selectedDate.endDate) ?
                                                            " " + this.state.selectedDate.startDate + "  " + this.state.selectedDate.endDate
                                                            : ""} />
                                            </DateRangePicker>
                                        </li>
                                        <li className="list-inline-item ">
                                            <SelectBox
                                                selectClass="wrapper-searchable transparent-select"
                                                placeholderText="Neighborhood"
                                                searchable={true}
                                                options={this.state.dropdownValues.neighborhoods}
                                                handleChange={this.handleNChange}
                                                value={this.state.filter.neighborhood}
                                            />
                                        </li>
                                        <li className="list-inline-item">
                                            <SelectBox
                                                selectClass="wrapper-searchable transparent-select"
                                                placeholderText="Type"
                                                searchable={true}
                                                options={this.state.dropdownValues.types}
                                                handleChange={this.handleTypesChange}
                                                value={this.state.filter.type}
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div className="float-right">
                                    <SearchBox value={this.state.filter.searchText} handleSearch={this.handleSearch} ref={this.searchBox} className='search-box' searchOuterClass='search-wrapper' placeholder='Search' />
                                </div>
                            </div>
                        </div>
                        <div className="inspection-header clearfix">
                            <div className="hide-on-condition">
                                <div className="inspection-filter-wrapper">
                                    <a onClick={() => this.changeJobList(`/main/inspections/scheduled`, 0)} href="javascript:void(0)" className={this.props.location.pathname === "/main/inspections/scheduled" ? `btn-toggle active` : "btn-toggle"}>Scheduled</a>
                                    <a onClick={() => this.changeJobList(`/main/inspections/completed`, 1)} href="javascript:void(0)" className={this.props.location.pathname === "/main/inspections/completed" ? `btn-toggle active` : "btn-toggle"}>Completed</a>
                                </div>
                                <div className="inspection-btn-wrapper">
                                    <ul>
                                        <li>
                                            <SelectBox
                                                selectClass="wrapper-searchable transparent-select"
                                                placeholderText="All Jobs"
                                                options={allJobOption}
                                                value={this.state.filter.timePeriod}
                                                searchable={false}
                                                handleChange={this.handleTimeChange}
                                            />

                                        </li>
                                        <li className="ml-3">
                                            {+this.getUser({ "key": "userType" }) === 1 ? <Link to={`${this.props.match.path}/add-new-job`} className="button-primary">Add Job</Link> : null}
                                            {/* <ButtonPrimary btntext={'Add New'} className={'button-primary'} onClick={() => this.toggleAddNewJob({ toggleOpCloseAndimagePopup: 1 })} /> */}
                                        </li>
                                        <li className="ml-3">
                                            <i onClick={() => this.changeListView("grid")} className={`icon-grid icon-font-size cursor-pointer ${this.state.view === "grid" ? "active" : ""} `}></i>
                                        </li>
                                        <li className="ml-3">
                                            <i onClick={() => this.changeListView("list")} className={`icon-list icon-font-size cursor-pointer ${this.state.view === "list" ? "active" : ""}`}></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <div style={this.state.emailResponse.sent ?
                                {
                                    backgroundColor: "green",
                                    position: "fixed",
                                    width: "100vw",
                                    top: "0",
                                    color: "white",
                                    left: "0",
                                    zIndex: "1000",
                                    fontSize: "17px"
                                } :
                                {
                                    backgroundColor:"red",
                                    position:"fixed",
                                    width:"100vw",
                                    top:"0", 
                                    color:"white",
                                    left:"0", 
                                    zIndex:"1000",
                                   fontSize:"17px"
                                }} className="row justify-content-center" >   <span  > {this.state.emailResponse.msg}  </span></div>
                        </div>
                    </div> : null
                }
                <Switch>
                    <Route path={`${this.props.match.path}/scheduled`} exact={true} render={(props) => (
                        <ScheduledJobs updateIt={this.updateIt} jobs={this.state.jobs} sendEmailReminder={this.sendEmailReminder} {...props} className={this.state.view} isLoading={this.state.isLoading} >
                            {pagination}
                        </ScheduledJobs>)} />
                    <Route path={`${this.props.match.path}/completed`} exact={true} render={(props) => (
                        <CompletedJobs updateIt={this.updateIt} jobs={this.state.jobs} {...props} className={this.state.view} isLoading={this.state.isLoading} >
                            {pagination}
                        </CompletedJobs>)} />
                    <Route path={`${this.props.match.path}/property-detail`} component={PropertyDetail} />
                    {+this.getUser({ "key": "userType" }) === 1 ? <Route path={`${this.props.match.path}/add-new-job`} render={() => <AddJob updateIt={this.updateIt} />} /> : null}
                    {+this.getUser({ "key": "userType" }) === 1 ? <Route path={`${this.props.match.path}/edit-job`} render={() => <EditJob updateIt={this.updateIt} />} /> : null}
                    <Redirect from={`${this.props.match.path}`} to={`${this.props.match.path}/scheduled`} />
                    {/* <Route path="/main/inspections/scheduled" render={() => <p>Yeah!</p>} /> */}
                </Switch>
                {/* <AddNewJob
                    isLoading={this.state.isDropdownFetching}
                    depDropdown={this.state.depDropdown}
                    individualDropdown={this.state.individualDropdown}
                    handleDepDropdown={this.handleDepDropdown}
                    toggleAddNewJob={this.toggleAddNewJob}
                    handleNewJob={this.handleNewJob}
                    addNewPopup={this.state.addNewPopup}
                    toggleDropzone={this.toggleDropzone} /> */}

                <DropZonePopup files={this.state.files} onDrop={this.onDrop} onPreviewDrop={this.onPreviewDrop} dropzonePopup={this.state.dropzonePopup} toggleDropzone={this.toggleDropzone} />


            </>

        )
    }
}
export default Inspections
// = connect(mapStateToProps, mapDispatchToProps)(Inspections)