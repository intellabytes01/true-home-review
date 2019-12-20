import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg'
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import DummyChart from '../../view/commonComponents/chart/chart';
import ExternalScheduled from './externalScheduled/ExternalScheduled';
import ExternalCompletedJobs from './externalComplete/ExternalComplete';
import ExternalPropertyDetail from './externalPropertyDetail/ExternalPropertyDetail';
import { GetDashboardGraph } from '../../store/api-actions/GetDashboardGraph';
import { GetExtJobs } from '../../store/api-actions/GetExtJobs';
import _moment from 'moment';
import { GetExtDashboardGraph } from '../../store/api-actions/GetExtDashboardGraph';

const mapStateToProps = (state)=>{

    return    {
           graph: state.dashboardGraph.graph
       }
}

const mapDispatchToProps = (dispatch)=>({ 
    getDashboardGraph:(form)=>dispatch(GetExtDashboardGraph(form))
})

class ExternalDashboard extends Component {

    constructor(props) {

        super(props)
        this.months = { 
            "1":"Jan", 
            "2":"Feb", 
            "3":"Mar", 
            "4":"Apr",
            "5":"May", 
            "6":"June", 
            "7":"July",
            "8":"Aug",
            "9":"Sep",
            "10":"Oct",
            "11":"Nov",
            "12":"Dec"}
        this.state = {
            activeView: 'grid',
            view: "grid",
            // startDate: null,
            addNewPopup: false,
            startDate: new Date(),
            endDate: new Date(),

            filter: {
                isCompleted: 0,
                page: 1,
                searchText: "",
                timePeriod: ''
            },

            graph:{
                data:null,
                error:null
            }

        }
    }

    componentDidMount(){

        // let { filter } = this.state;
        // let form = new FormData()
        // form.append('params[filterType]', "" );
        
        // let form1 = new FormData()

        // // form1.append('params[token]', this.getToken({key:"token"}))
        // form1.append('params[page]', filter.page)
        // form1.append("params[isCompleted]", filter.isCompleted)
        
        // // this.props.getDashboardGraph(form).then(res=>{

        //     this.props.getExtJobs(form1)
        // // })
        // // console.log(this.props);
        let form = new FormData()
        // form.append('params[token]', token );
        form.append('params[filterType]', "" );


        this.props.getDashboardGraph(form)
    }

    componentWillReceiveProps(nextProps){

        let  newGraph  =  _.cloneDeep( nextProps.graph);

        let { graph } =  this.state

        if(newGraph.error){

            graph.data = []
         }else{
   
           let { data, filterType } = newGraph
   
   
           if(filterType === "month"){
   
               data = data.map(item=>{
      
                   item.month = this.formatMonthName( item.timeCreated);
                       
                   return item;
               })
           }else if(filterType === "year"){
   
               data = data.map(item=>{
   
                   item.month = this.months[item.month] +" "+item.year
   
                   return item;
               })
           }
   
            graph.data = data
            
         }

         this.setState(()=>({graph}))
    }

    formatMonthName = (date)=>{

        return _moment(date).format("DD MMM")

    }

    handleDropdownChange = (event)=>{

        // console.log( event.target.name, event.target.value);

        let form = new FormData();

        // form.append("params[token]",this.getToken())
        form.append("params[filterType]", event.target.value)

        this.props.getDashboardGraph(form)
    }

    getToken = ({key}) =>{

        let user = JSON.parse( localStorage.getItem("user"))

        if(user){
            return user[key];
        }else{

            return '';
        }
    }

    render() {

        return (
            <div className="external-dashboard">
                <div className="">
                    <header className="text-center position-relative">
                        <Link to="/login" className="button-secondary external-to-login">Goto Log In</Link>
                        <img src={logo} alt="Truehome Review Logo" />
                    </header>
                    <div className="external-chart-wrapper">
                        <div className="external-chart-area">
                            <div className="clearfix mb-3">
                                <div className="float-left">
                                    <h2 className="text-light">Average Review Score</h2>
                                </div>
                                <div className="float-right d-flex">
                                    {/* <SelectBox placeholderText="select" /> */}

                                    <select onChange={this.handleDropdownChange} className="selectbox cursor-pointer">
                                        <option value="">Weekly</option>
                                        <option value="month">Monthly</option>
                                        <option value="year">Yearly</option>
                                    </select>

                                </div>
                            </div>
                            <DummyChart width={930} height={300}  data = {this.state.graph.data} />
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route path={`${this.props.match.path}`} exact={true} render={(props) => (
                            <ExternalScheduled {...props}  className={this.state.view}  />
                    )} />
                   
                    <Route path={`${this.props.match.path}/property-detail`} component={ExternalPropertyDetail} />
                    {/* <Redirect from={`${this.props.match.path}`} to={`${this.props.match.path}/scheduled`} /> */}
                    {/* <Route path="/main/inspections/scheduled" render={() => <p>Yeah!</p>} /> */}
                </Switch>
            </div>
        )
    }
}
export default ExternalDashboard= connect(mapStateToProps, mapDispatchToProps,null,{ pure: false })(ExternalDashboard);