import React, { Component } from 'react'
import PropertyCard from '../propertyCard/PropertyCard';
import AddNewJob from '../../../commonComponents/popup/AddNewJob';
import EmailReminder from '../../../commonComponents/popup/EmailReminder';
// import SearchAbleSelect from '../../commonComponents/formComponents/searchableSelect/SearchableSelect';
import ReactLoading from 'react-loading';
import _callApi from '../../../../services/baseService';
import { END_POINT } from '../../../../constants/ApiEndPoints';

// import SearchAbleSelect from '../../commonComponents/formComponents/searchableSelect/SearchableSelect';


class CompletedJobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addNewPopup: false,
            view: "grid",
            emailReminder: false,

            
            jobs:[]
        }
    }
    //add new job
    toggleAddNewJob = () => {
        this.setState({
            addNewPopup: !this.state.addNewPopup
        });
    }

    componentDidMount() {

        setTimeout(()=>{
            
            let page_no = localStorage.getItem("comp_page_no")
            this.props.updateIt(1, page_no)
            console.log("CompletedJobs mounted ");
        })
            
    }

    componentWillReceiveProps(nextProps) {

        let { jobs } = nextProps;

        let temp= [ ...[], ...jobs ] ;
        // console.log("Scheduled========",jobs);
        
        temp = temp.map((item)=>{
            
            if(!item.report['reportID'] ){

                item.address = JSON.parse(item.address);
                item.inspector = JSON.parse(item.inspector);
                item.report = JSON.parse(item.report);
            }else{
                return item;
            }
            
            return item;
            
        })
        
        this.setState(() => ({ view: nextProps.className, jobs:temp }))
        // console.log(nextProps)
    }

   

    getUser=({key})=>{

        let user = JSON.parse( localStorage.getItem("user"))

        if(user){

            return user[key];
        }else{
            return ''
        }
    }



    render() {

        let dom = null

        // console.log(this.state.emailResponse);
        
        
        if(this.props.isLoading){

            dom =  <div className="driver-loder">

                        <ReactLoading color="blue" type="spokes" />
                    </div>

        }else{

          dom = this.state.jobs.length === 0 ? <li className="d-flex justify-content-center" > No data found </li>  :this.state.jobs.map(item=>{

                return <li key={item.report.reportID}>
                                <PropertyCard type={ +item.report.isComplete === 1 ?  1 : 0 } job={item} userType={this.getUser({key:"userType"}) } sendEmailReminder={this.props.sendEmailReminder} />
                        </li>
            })


        }
        
        return (
            <div>
                <div className="inspections light-background">
                    <div className={`property-wrapper property-${this.state.view}`}>
                        <ul className="clearfix">
                          {dom}
                        </ul>
                    </div>
                    {this.props.children}
                </div>
                {/* <AddNewJob  toggleAddNewJob={this.toggleAddNewJob} addNewPopup={this.state.addNewPopup} /> */}
                <EmailReminder 
                // toggleEmailReminder={this.toggleEmailReminder} 
                emailReminder={this.state.emailReminder} />
            </div>
        )
    }
}
export default CompletedJobs;