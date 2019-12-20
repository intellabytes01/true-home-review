import React, { Component } from 'react'
import AddNewJob from '../../../view/commonComponents/popup/AddNewJob';
import EmailReminder from '../../../view/commonComponents/popup/EmailReminder';
import ExternalInspectionsHeader from '../externalInspection-header/ExternalInspectionHeader';
import ExternalPropertyCard from '../externalPropertyCard/ExternalPropertyCard';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { GetExtJobs } from '../../../store/api-actions/GetExtJobs';
import { GetDashboardGraph } from '../../../store/api-actions/GetDashboardGraph';

import ReactPaginate from 'react-paginate';
// import SearchAbleSelect from '../../commonComponents/formComponents/searchableSelect/SearchableSelect';
const mapStateToProps = (state)=>({
    inspections:state.inspections,
    graph: state.dashboardGraph
})

const mapDispatchToProps = (dispatch)=>({ 
    getExtJobs:(form)=>dispatch(GetExtJobs( form)),
    getDashboardGraph:(form)=>dispatch(GetDashboardGraph(form)),
})


class ExternalScheduled extends Component {
    constructor(props) {
        super(props)
        this.searchBox = React.createRef();

        this.searchSource = null;
        this.state = {
            addNewPopup: false,
            view: "grid",
            emailReminder: false,
            isCompleted:0,

            filter: {
                isCompleted: 0,
                page: 1,
                searchText: "",
                timePeriod: '',
                selectedPage:0,
                pageSize:10
            },
        }
    }
    //add new job
    toggleAddNewJob = () => {
        this.setState({
            addNewPopup: !this.state.addNewPopup
        });
    }

    componentDidMount(){

        let { filter } = this.state;
        let form = new FormData()
        form.append('params[filterType]', "" );
        
        let form1 = new FormData()

        // form1.append('params[token]', this.getToken({key:"token"}))
        form1.append('params[page]', filter.page)
        form1.append("params[isCompleted]", filter.isCompleted)
        
        // this.props.getDashboardGraph(form).then(res=>{

            this.props.getExtJobs(form1)
        // })
        // console.log(this.props);
        
    }

    changeListView = (view) => {
        if (view === "list") {
            this.setState(() => ({ view: view }))
        } else if (view === "grid") {
            this.setState(() => ({ view: view }))
        }
    }

    changeToScheduleList=()=>{

        let { filter } = this.state 
         if(filter.isCompleted === 1){

            filter.isCompleted = 0
            filter.selectedPage = 0
            filter.pageSize = 0
            filter.page = 1;
            
            let form = new FormData()
            for (let key in filter) {

                form.append(`params[${key}]`, filter[key]);
            }
    
            this.props.getExtJobs(form)

            this.setState(()=>({filter}))
        }

    }

    changeToCompleteList = ()=>{

        let { filter } = this.state 
         if(filter.isCompleted === 0){

            filter.isCompleted = 1
            // FOR PAGINATION
            filter.selectedPage = 0
            filter.pageSize = 0
            // END 
            filter.page = 1;
            let form = new FormData()
            for (let key in filter) {

                form.append(`params[${key}]`, filter[key]);
            }
    
            this.props.getExtJobs(form)

            this.setState(()=>({filter}))
        }
    }

    handleSearch = (event) => {


        if(this.searchSource){

            clearTimeout(this.searchSource)
        }
        let searchText = event.target.value
        let filter = this.state.filter;

        filter.selectedPage = 0
        filter.page = 1
        let form = new FormData()

        if (searchText && searchText.trim()) {
            filter.searchText = searchText.trim()
        } else {
            filter.searchText = ""
        }

        for (let key in filter) {

            form.append(`params[${key}]`, filter[key]);
        }
        this.setState(() => ({ filter }))

       this.searchSource =  setTimeout(()=>{
            
            this.props.getExtJobs(form)
        },264)
    }

    handleTimeChange = (event, data) => {

        console.log(data.value);
        
        let filter = this.state.filter

        if (filter.timePeriod !== data.value) {

            filter.timePeriod = data.value
            let form = new FormData()
    
            for (let key in filter) {
    
                form.append(`params[${key}]`, filter[key]);
            }
            this.setState(() => ({ filter }))

            this.props.getExtJobs(form)
        }


    }

    handlePageNo = ({ selected }) => {

        let form = new FormData()
        let filter = this.state.filter

        if (selected) {

            filter.page = selected;
            filter.selectedPage = selected-1;
            
            // filter.selectedPage = selected
        }

        for (let key in filter) {

            form.append(`params[${key}]`, filter[key]);
        }

        this.props.getExtJobs(form)
    }

    toggleEmailReminder = () => {
        this.setState({
            emailReminder: !this.state.emailReminder
        });
    }


    render() {

        let dom = null

        let pagination = <ReactPaginate
                            pageCount={this.props.inspections.total}
                            // pageRangeDisplayed={this.state.filter.pageSize}
                            onPageChange={({ selected }) => {
                                // this.setState({ selected: selected }); 
                                localStorage.setItem("page_no", selected + 1)
                                this.handlePageNo({ selected: selected + 1 })
                            }
                            }
                            containerClassName="pagination-custom"
                            forcePage={(this.state.filter.selectedPage)} />

        
        if(this.props.inspections.loading){

            dom =  <div className="driver-loder">

                        <ReactLoading color="blue" type="spokes" />
                    </div>

        }else{

          dom = this.props.inspections.jobs.length === 0 ? <li style={{width:"100%"}} > <div className="d-flex justify-content-center"> No data found </div>  </li>  :this.props.inspections.jobs.map(item=>{

                return <li key={item.report.reportID}>
                                <ExternalPropertyCard type={2} job={item} toggleEmailReminder={this.toggleEmailReminder} />
                        </li>
            })


        }

        return (
            <div className="external-wrapper">
                <ExternalInspectionsHeader
                className={this.state.view}
                ref={this.searchBox} 
                filter= {this.state.filter}
                changeToScheduleList={this.changeToScheduleList}
                changeToCompleteList={this.changeToCompleteList}
                changeListView={this.changeListView }
                handleSearch={this.handleSearch}
                handleTimeChange={this.handleTimeChange}
                isCompleted={this.state.filter.isCompleted} />
                <div className="inspections">
                    <div className={`property-wrapper external-link property-${this.state.view}`}>
                        <ul className="clearfix">
                           {dom}
                        </ul>
                    </div>
                    <ReactPaginate
                            pageCount={this.props.inspections.total}
                            // pageRangeDisplayed={this.state.filter.pageSize}
                            onPageChange={({ selected }) => {
                                // this.setState({ selected: selected }); 
                                localStorage.setItem("page_no", selected + 1)
                                this.handlePageNo({ selected: selected + 1 })
                            }
                            }
                            containerClassName="pagination-custom"
                            forcePage={(this.state.filter.selectedPage)}
                             />
                </div>
                <AddNewJob toggleAddNewJob={this.toggleAddNewJob} addNewPopup={this.state.addNewPopup} />
                <EmailReminder toggleEmailReminder={this.toggleEmailReminder} emailReminder={this.state.emailReminder} />
            </div>
        )
    }
}
export default ExternalScheduled= connect(mapStateToProps, mapDispatchToProps)(ExternalScheduled);