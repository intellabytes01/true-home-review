import React, { Component } from 'react';
import JobListing from './jobListing/JobListing';
import Counts from './countsComponent/Counts';
import DummyChart from '../../commonComponents/chart/chart';
import { connect } from 'react-redux';
import { GetDashboard } from '../../../store/api-actions/GetDashboard';
import { GetDashboardGraph } from '../../../store/api-actions/GetDashboardGraph';
import _moment from 'moment';
import _ from 'lodash';
const mapStateToProps = (state) => {

    return {
        report: state.dashboard.report,
        reportError: state.dashboard.error,

        graph: state.dashboardGraph.graph
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDashboard: (form) => dispatch(GetDashboard(form)),
    getDashboardGraph: (form) => dispatch(GetDashboardGraph(form))
})

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.months = {
            "1": "Jan",
            "2": "Feb",
            "3": "Mar",
            "4": "Apr",
            "5": "May",
            "6": "June",
            "7": "July",
            "8": "Aug",
            "9": "Sep",
            "10": "Oct",
            "11": "Nov",
            "12": "Dec"
        }
        this.state = {
            view: "grid",
            dropdownOpen: false,
            dashboard: {
                error: null,
                recentCompletedJobs: [],
                upComingJobs: [],
                counts: {
                    totalCompletedJob: 0,
                    totalScheduledJob: 0,
                    totalClients: 0,
                    totalCommunities: 0
                },

                graph: {
                    data: null,
                    error: null
                }
            }
        }
        this.toggleDropdownButton = this.toggleDropdownButton.bind(this);
    }


    componentDidMount() {

        let token = this.getToken()
        let form = new FormData()


        form.append('params[token]', token);
        form.append('params[filterType]', "");


        this.props.getDashboardGraph(form).then(res => {


            this.props.getDashboard(form)

        })

    }

    toggleDropdownButton() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleUpcomingRedirect = () => {

        this.props.history.push("/main/inspections/scheduled")
    }

    handleCompleteRedirect = () => {

        this.props.history.push("/main/inspections/completed")
    }

    componentWillReceiveProps(nextProps) {

        let { recentCompletedJobs, upComingJobs, ...rest } = nextProps.report;

        let { graph } = nextProps

        let dashboard = this.state.dashboard;


        if (nextProps.reportError) {

            dashboard.error = nextProps.reportError;

        } else {

            if (recentCompletedJobs && recentCompletedJobs.length) {

                dashboard.recentCompletedJobs = recentCompletedJobs;
            } else {

                dashboard.recentCompletedJobs = [];

            }

            if (upComingJobs && upComingJobs.length) {

                dashboard.upComingJobs = upComingJobs;
            } else {

                dashboard.upComingJobs = [];

            }

            dashboard.error = null;

            let { error, ...temp } = rest;

            dashboard.counts = { ...{}, ...temp }

        }

        if (graph.error) {

            dashboard.graph.data = []
        } else {

            let data  = _.cloneDeep(graph.data);
            let filterType = graph.filterType

            if (filterType === "month") {

                data = data.map(item => {

                    item.month = this.formatMonthName(item.timeCreated);

                    return item;
                })
            } else if (filterType === "year") {

                data = data.map(item => {

                    item.month = this.months[item.month] + " " + item.year

                    return item;

                })


            }else{

                data = data.map(item => {

                    item.month = this.formateDay(item.timeCreated)

                    return item;

                })

            }

            dashboard.graph.data = data

        }

        this.setState((prevState) => {

            return { dashboard }
        })

    }

    formatYearName = (date) => {


        return _moment(date).format("MMM YYYY")

    }

    formatMonthName = (date) => {


        return _moment(date).format("DD MMM")

    }

    formateDay = (d)=>{

        return _moment(d).format("DD")
    }

    handleDropdownChange = (event) => {

        // console.log( event.target.name, event.target.value);

        let form = new FormData();

        form.append("params[token]", this.getToken())
        form.append("params[filterType]", event.target.value)

        this.props.getDashboardGraph(form)
    }

    getToken = () => {

        let user = JSON.parse(localStorage.getItem("user"))

        if (user) {

            return user.token;
        } else {
            return ''
        }
    }

    getUser = () => {

        let user = JSON.parse(localStorage.getItem("user"))

        if (user) {

            return user;
        } else {
            return ''
        }

    }

    renderBadges = () => {

        let userType = null
        if (this.getUser()) {

            userType = this.getUser().userType;
        }

        if (userType && +userType !== 1) {

            return <>
                <div className="col-md-3">
                    <Counts count={+this.state.dashboard.counts['totalCompletedJob'] + +this.state.dashboard.counts['totalScheduledJob']} name="TOTAL JOBS" />
                </div>
                <div className="col-md-3">
                    <Counts count={this.state.dashboard.counts['totalCompletedJob']} name='COMPLETED JOBS' />
                </div>
                <div className="col-md-3">
                    <Counts count={this.state.dashboard.counts['totalScheduledJob']} name="SCHEDULED JOBS" />
                </div>
            </>
        } else {
            return <>
                <div className="col-md-3">
                    <Counts count={this.state.dashboard.counts['totalCompletedJob']} name='COMPLETED JOBS' />
                </div>
                <div className="col-md-3">
                    <Counts count={this.state.dashboard.counts['totalScheduledJob']} name="SCHEDULED JOBS" />
                </div>
            </>

        }

    }


    render() {

        let userType = null
        if (this.getUser()) {

            userType = this.getUser().userType;
        }


        return (
            <div className="dashboard">
                <div className="row m-0">
                    <div className="pl-1 pr-1 w-100 mb-3">
                        <div className="chart-wrapper">
                            <div className="clearfix mb-3">
                                <div className="float-left pl-5 ml-4">
                                    <h2 className="text-light">Average Review Score</h2>
                                </div>
                                <div className="float-right pr-4">
                                    <select onChange={this.handleDropdownChange} name="filter" className="selectbox cursor-pointer">
                                        <option value="">Weekly</option>
                                        <option value="month">Monthly</option>
                                        <option value="year">Yearly</option>
                                    </select>

                                </div>
                            </div>
                            <DummyChart width={1050} height={300} data={this.state.dashboard.graph.data} />
                        </div>
                    </div>
                </div>
                {/* {JSON.stringify(this.state.dashboard)} */}
                <div className="row m-0 p-4">
                    <div className="col-md-3">
                                <Counts count={this.state.dashboard.counts['totalCommunities']} name="NEIGHBORHOODS" />
                    </div>
                    {(userType && +userType === 1) ? <div className="col-md-3">
                        <Counts count={this.state.dashboard.counts['totalClients']} name="CLIENTS" />
                        {/* <i className="fa fa-th-large"></i> */}
                    </div> :null
                    }


                    {this.renderBadges()}
                </div>
                <div className="row m-0 pl-4 pr-4">
                    <div className="col-md-6">
                        <JobListing handleRedirect={this.handleUpcomingRedirect} arr={this.state.dashboard.upComingJobs} btnText={"See all Upcoming Jobs"} jobHeading="Upcoming Jobs" className={'button-primary btn-block'} />
                    </div>
                    <div className="col-md-6" >
                        <JobListing handleRedirect={this.handleCompleteRedirect} arr={this.state.dashboard.recentCompletedJobs} btnText={"See all Completed Jobs"} jobHeading="Recently Completed Jobs" className={'button-primary btn-block'} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard = connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Dashboard);