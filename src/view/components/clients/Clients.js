import React, { Component } from 'react';
import { connect } from 'react-redux';
import PanelHeader from './clientPanel/PanelHeader';
import PanelBody from './clientPanel/PanelBody';
import SearchBox from '../../commonComponents/formComponents/searchBox/SearchBox';
import ButtonPrimary from '../../commonComponents/buttons/ButtonPrimary';
// import AccordionNested from './accordion/AccordionNested';
import ReactLoading from 'react-loading';

import cloneDeep from 'lodash/cloneDeep';
import EditClient from '../../commonComponents/popup/client/EditClient';
import AddNewClient from '../../commonComponents/popup/client/AddClient';
import AssociatedNeigbhorhood from './associatedNeighborhood/AssociatedNeigbhorhood';
import { InputBox } from '../../commonComponents/formComponents';
import _callApi from '../../../services/baseService';
import { END_POINT } from '../../../constants/ApiEndPoints';
import { GetClientsData } from '../../../store/api-actions/GetClientsData';
import { ClientsActions } from '../../../store/actions/ClientsActions';
import LoadingOverlay from 'react-loading-overlay';
import { Collapse } from 'reactstrap';
import EditJob from '../../commonComponents/popup/EditJob';
import ReactPaginate from 'react-paginate';


const mapStateToProps = (state) => {

    return {
        list: state.clients.list,
        total: state.clients.total,
        error: state.clients.error,
        loading: state.clients.loading
    }
}

const mapDispatchToProps = (dispatch) => ({
    getClients: (form) => dispatch(GetClientsData(form)),
    resetClients: () => dispatch(ClientsActions.FailedClientData({})),
})

class Clients extends Component {
    constructor(props) {
        super(props);

        this.loader = <div className="driver-loder d-flex justify-content-center "> <ReactLoading color="blue" type="spokes" /> </div>
        this.state = {
            editClient: false,
            addClient: false,
            zones: [],
            contacts: [],
            users: [],
            //====== CLIENTS DATA====== //
            clients: [],
            loading: null,
            collapse: false,
            // =========END============//

            // DATA TO UPDATE
            sendInviteResponse:{
                isInvited:false,
                message:""
            },
            addUpdateClientResponse:{
                isSuccess:false,
                message:""
            },

            builders:[],
            clientDataToUpdate: {},

            filter: {
                page: 1,
                searchText: "",
                selected: 0
            },
        }
    }

    componentDidMount() {

        let form = new FormData()

        form.append('params[token]', this.getToken())
        form.append('params[page]', 1);

        this.props.getClients(form);

        let form1 = new FormData()

        // form1.append('params[token]', this.getToken())
        form1.append('params[module]', "builder");

        this.getSectionDropdowns(form1)
        this.props.getClients(form);

    }

    getSectionDropdowns=(form)=>{

        let { builders } = this.state
        _callApi(
            form, END_POINT.MANAGEDATA_DROPDOWNS.END_POINT,
            END_POINT.MANAGEDATA_DROPDOWNS.POST,
        ).then(res=>{

            let { error, result } = res.data.payload

            if( error){
                
            }else{

                builders = result.map(item=>({ key:Math.random() ,value:item.userID,text:item.firstName+" "+item.lastName}))
                this.setState(()=>({builders}))
                
            }
        }).catch(error=>{

        })

    }

    componentWillReceiveProps(nextProps) {

        let { error, list, total, loading } = nextProps

        if (error) {

            this.setState(() => ({ clients: [], }))

        } else {

            console.log(list);


            this.setState(() => ({ clients: list, }))

        }

    }

    addUpdateClient = (values, formikBag) => {

        let data = { ...{}, ...values }
        let form = new FormData()

        form.append('params[token]', this.getToken())
        for (let key in data) {

            data[key] = JSON.stringify(data[key])
            form.append(`params[${key}]`, data[key])
        }

        // console.log(data);

        _callApi(form,
            END_POINT.CLIENT_ADD_UPDATE.END_POINT,
            END_POINT.CLIENT_ADD_UPDATE.POST).then(res => {

                let { error, result } = res.data.payload
                let { addUpdateClientResponse } = this.state
                if (error) {

                    addUpdateClientResponse.isSuccess = false;
                    addUpdateClientResponse.message = error.message

                    this.setState(()=>({addUpdateClientResponse}))

                } else {

                    let form = new FormData()

                    form.append('params[token]', this.getToken())
                    form.append('params[page]', 1);

                    this.props.getClients(form);
                    if (this.state.editClient) {
    
                        this.toggleEditClient()
                    }else if(this.state.addClient){
    
                        this.toggleAddClient()
                    }
                }

                setTimeout(()=>{

                    addUpdateClientResponse.isSuccess = false
                    addUpdateClientResponse.message = ""

                    this.setState(()=>({addUpdateClientResponse}))

                },2000)
            }).catch(() => {

                if (this.state.editClient) {

                    this.toggleEditClient()
                }else if(this.state.addClient){

                    this.toggleAddClient()
                }
            })

    }


    toggle = event => {
        const id = event.target.getAttribute('id');
        this.setState(state => ({ [id]: !state[id] }));
    }

    toggleEditClient = () => {
        this.setState({
            editClient: !this.state.editClient,
            zones: [],
            contacts: [],
            users: []
        });
    }

    toggleAddClient = () => {
        this.setState({
            addClient: !this.state.addClient,
            zones: [],
            contacts: [],
            users: []
        });
    }



    getToken = () => {


        let user = JSON.parse(localStorage.getItem("user"))

        if (user) {

            return user.token;
        } else {
            return '';
        }
    }

    toggleEditJob = () => {
        this.setState({
            editProperty: !this.state.editProperty
        });
    }

    toggleMainAcc = (index) => {

        let { clients } = this.state

        clients[index].isCollapse = !clients[index].isCollapse

        this.setState(() => ({ clients }))

    }

    toggleNAcc = (index, key, subindex) => {

        let { clients } = this.state

        clients[index][key][subindex].isCollapse = !clients[index][key][subindex].isCollapse;

        this.setState(() => ({ clients }))
    }

    toggleAddAcc = (index, key, subindex, subkey, ssindex) => {

        let { clients } = this.state

        clients[index][key][subindex][subkey][ssindex].isCollapse = !clients[index][key][subindex][subkey][ssindex].isCollapse;

        this.setState(() => ({ clients }))

    }

    sendInvite = (userID) => {

        // console.log(userID);
        let form = new FormData()
        form.append('params[token]', this.getToken())
        form.append('params[userID]', userID);

        this.setState({ loading: true })
        _callApi(
            form,
            END_POINT.SETTINGS_CLIENTS.END_POINTS.SEND_INVITE,
            END_POINT.SETTINGS_CLIENTS.POST
        ).then(res => {

            let { error, result } = res.data.payload
            let { sendInviteResponse } = this.state
            if (error) {

                sendInviteResponse.isInvited = false;
                sendInviteResponse.message = error.message
            } else {

                // console.log(error, result);
                sendInviteResponse.isInvited = true;
                sendInviteResponse.message = "Invitation is successfully sent"

            }
            
            this.setState({ loading: false,sendInviteResponse })
            
            sendInviteResponse.isInvited = false;
            sendInviteResponse.message = ""

            setTimeout(()=>{

            this.setState({ sendInviteResponse })

            },2000)
        }).catch(()=>{

            
            this.setState({ loading: false})

        })

    }

    getClientData = ({ id }) => {

        let form = new FormData()
        form.append('params[token]', this.getToken())
        form.append('params[clientID]', id);

        this.setState({ loading: true })
        _callApi(
            form,
            END_POINT.CLIENT_DETAIL_BY_ID.END_POINT,
            END_POINT.CLIENT_DETAIL_BY_ID.POST
        ).then(res => {

            let { error, result } = res.data.payload
            let { clientDataToUpdate } = this.state
            if (error) {

            } else {

                console.log(error, result);
                if (result && !result.contacts && !(result.contacts instanceof Array)) {

                    result.contacts = []
                }
                if (result && !result.users && !(result.users instanceof Array)) {

                    result.users = []
                }
                if (result && !result.zones && !(result.zones instanceof Array)) {

                    result.zones = []
                }

                clientDataToUpdate = { ...{}, ...result, }

            }

            this.setState({ loading: false, clientDataToUpdate, editClient: true })

        })
    }

    passDownNhoods = ({ neighborhoods, clientID, isCollapse, index }) => {




        return <div className="associated-community" key={clientID ? clientID : index}>
            {
                <div style={{ marginBottom: '1rem' }} >
                    <div className="associated-header" >
                        <i
                            className="material-icons float-left cursor-pointer"
                            onClick={() => this.toggleMainAcc(index)}
                            data-event={index}>
                            {isCollapse === false ? "arrow_drop_up" : "arrow_drop_down"} </i>
                        Associated Neighborhood
                            </div>
                    <Collapse isOpen={isCollapse}>

                        <div>
                            <div className="addresses">
                                {neighborhoods.map((item, nIndex) => {
                                    return (<div className="addresses-accordion" key={item.neighborhood}>
                                        <div
                                            className="addresses-header"
                                            onClick={() => this.toggleNAcc(index, `neighborhoods`, nIndex)}
                                            data-event={nIndex}>
                                            <i
                                                className="material-icons float-left cursor-pointer"
                                                // onClick={()=>this.toggleNAcc(index,`neighborhoods`,nIndex)}
                                                data-event={index}>
                                                {item.isCollapse === false ? "arrow_drop_up" : "arrow_drop_down"}</i>
                                            {item.neighborhood}
                                        </div>
                                        <Collapse isOpen={item.isCollapse}>

                                            <div className="builder-wrapper" >
                                                {item['properties'] && (item['properties'] instanceof Array) && item.properties.map((subItem, pIndex) => {

                                                    let addr = subItem.address

                                                    let temp = cloneDeep(addr);
                                                    // console.log(typeof address, address);

                                                    // if(!address['lot']){

                                                    let address = JSON.parse(temp);
                                                    // }
                                                    return (
                                                        <div className="builder-accordion panel" key={address.addressID} >
                                                            <div className="panel-header" >
                                                                <ul className="list-unstyled m-0 d-flex align-items-center justify-content-between w-100">
                                                                    <li className="clearfix">
                                                                        <i onClick={() => this.toggleAddAcc(index, `neighborhoods`, nIndex, `properties`, pIndex)} data-event={index} className="material-icons float-left cursor-pointer">{subItem.isCollapse === false ? "arrow_drop_up" : "arrow_drop_down"}</i>
                                                                        <h2 className="float-left pt-1">{address.lot}</h2>
                                                                    </li>
                                                                    <li>
                                                                        <small>{address.street + ' ' + address.city + ', ' + address.state + ' ' + address.zip}</small>
                                                                    </li>
                                                                    <li>
                                                                        <span
                                                                            className="cursor-pointer"
                                                                        // onClick={this.toggleEditJob}
                                                                        >
                                                                            {/* <i className="icon-edit"></i>
                                                                            <span className="edit-text">Edit</span> */}
                                                                        </span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <Collapse isOpen={subItem.isCollapse}>
                                                                <div className="panel-body">
                                                                    <table>
                                                                        <thead>
                                                                            <th>Contact Name</th>
                                                                            <th>Position </th>
                                                                            <th>Phone</th>
                                                                            <th>Email</th>
                                                                        </thead>
                                                                        <tbody>
                                                                            {subItem['builders'] && (subItem['builders'] instanceof Array) && subItem.builders.map(builder => {
                                                                                return <tr key={builder.userID} >
                                                                                    <td>{builder.firstName + " " + builder.lastName}</td>
                                                                                    <td>{builder.title}</td>
                                                                                    <td>{builder.phone}</td>
                                                                                    <td>{builder.email}</td>
                                                                                </tr>
                                                                            })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </Collapse>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        </Collapse>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </Collapse>
                </div>
            }
        </div>
    }

    loopThroughClients = () => {

        let { clients } = this.state

        return clients.map((item, index) => {

            return <div className="panel" key={item.clientID}>
                <PanelHeader
                    clickEdit={() => this.getClientData({ id: item.clientID })}
                    address={item}
                    panelHeaderClass="list-unstyled m-0 d-flex align-items-center justify-content-between w-100"
                    Heading={item.companyName} />
                <PanelBody sendInvite={this.sendInvite} bkey={item.clientID} users={item.users} contacts={item.contacts} type={1} />
                {/* <AssociatedNeigbhorhood {...item} index={index} /> */}
                {item['neighborhoods'] && item['neighborhoods'] instanceof Array && this.passDownNhoods({ ...item, index })}
            </div>
        })
    }

    handleSearch = (event) => {

        let searchText = event.target.value
        let filter = this.state.filter;
        // console.log(event.target.value, this.searchBox.current.value);

        if (this.state.cancelRequest) {

        }
        let form = new FormData()

        form.append('params[token]', this.getToken())


        // if (searchText && searchText.trim()) {
            filter.searchText = searchText
        // } else {
            // filter.searchText = ""
        // }

        for (let key in filter) {

            if( key === 'searchText' && filter[key] && filter[key].trim() ){

                form.append(`params[${key}]`, filter[key]);

            }else{

                form.append(`params[${key}]`, filter[key]);
            }
        }
        this.setState(() => ({ filter }))

        this.props.getClients(form);
    }

    handlePageNo = ({ selected }) => {

        let form = new FormData()
        let filter = this.state.filter

        form.append("params[token]", this.getToken())

        if (selected) {
            filter.page = selected;
            filter.selected = selected - 1
        }
        for (let key in filter) {

            form.append(`params[${key}]`, filter[key]);
        }

        this.props.getClients(form);

    }

    getUser = () => {

        let user = JSON.parse(localStorage.getItem("user"))

        if (user) {

            return user;
        } else {
            return null
        }
    }

    render() {

        let userType = null
        if (this.getUser()) {

            userType = this.getUser().userType;
        }

        let pagination = <ReactPaginate
            pageCount={this.props.total}
            // pageRangeDisplayed={this.state.pageSize}
            onPageChange={({ selected }) => {
                // this.setState({ selected: selected }); 
                localStorage.setItem("page_no", selected + 1)
                this.handlePageNo({ selected: selected + 1 })
            }}
            containerClassName="pagination-custom"
            forcePage={this.state.filter.selected} />


        return (
            <>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                    text='Loading your content...'
                >
                    <div className="header">
                        <div className="topHeader clearfix">
                            <div className="float-right">
                                <ul className="list-inline list-unstyled">
                                    {
                                        (userType && +userType === 1) ?
                                            <li className="list-inline-item ">
                                                <ButtonPrimary onClick={this.toggleAddClient} className="button-secondary" btntext="Add New" />
                                            </li> : null
                                    }
                                    <li className="list-inline-item">
                                        <SearchBox value={this.state.filter.searchText} handleSearch={this.handleSearch} ref={this.searchBox} className='search-box' searchOuterClass='search-wrapper' placeholder='Search' />
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="manage-data light-background">

                        <div style={(this.state.sendInviteResponse.isInvited)?  
                            {
                            backgroundColor:"green",
                             position:"fixed",
                             width:"100%",
                             top:"0", 
                             color:"white",
                             left:"0", 
                             zIndex:"1000",
                            fontSize:"17px"} : 
                             
                             {
                             backgroundColor:"red",
                              position:"fixed",
                              width:"100%",
                              top:"0", 
                              color:"white",
                              left:"0", 
                              zIndex:"1000",
                              fontSize:"17px"}} className="d-flex justify-content-center" >
                                <span> {this.state.sendInviteResponse.message} </span>
                        </div>
                        <div className="row">
                            <div className="col-md-12">

                                {this.props.loading ? this.loader : this.loopThroughClients()}

                                {pagination}
                            </div>
                        </div>
                    </div>

                    <EditClient
                        data={this.state.clientDataToUpdate}
                        updateClient={this.addUpdateClient}
                        toggleEditClient={this.toggleEditClient}
                        response={this.state.addUpdateClientResponse}
                        editClient={this.state.editClient}
                        builders={this.state.builders} 
                        />
                    <AddNewClient
                        addClient={this.state.addClient}
                        toggleAddClient={this.toggleAddClient}
                        addNewClient={this.addUpdateClient}
                        builders={this.state.builders} 
                        response={this.state.addUpdateClientResponse}
                    />

                    <EditJob
                        toggleEditJob={this.toggleEditJob}
                        editProperty={this.state.editProperty} />
                </LoadingOverlay>
            </>
        )
    }
}
export default Clients = connect(mapStateToProps, mapDispatchToProps)(Clients);