import React, { Component } from 'react';
import Usercontrol from './user-controls/user-control';
import SettingPanelHeader from './settingPanel/SettingPanelHeader';
import SettingUserBody from './settingPanel/settingUserBody';
import AddUser from '../../commonComponents/popup/settings/AddUser';
import EditUser from '../../commonComponents/popup/settings/EditUser';
import DeleteConfirmation from '../../commonComponents/popup/DeleteConfirmation';
import { END_POINT } from '../../../constants/ApiEndPoints';
import _callApi from '../../../services/baseService';
import { GetUsers } from '../../../store/api-actions/GetUsers';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { API_RES } from '../../../constants/ApiResponse';
import { Loader } from '../../commonComponents/loaders/loader';

const mapStateToProps = (state) => {

    return {
        users: state.users,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUsers: (form) => dispatch(GetUsers({ form })),
    //    getDashboardGraph:(form)=>dispatch(GetDashboardGraph(form))
})

class Settings extends Component {
    constructor(props) {
        super(props);

        this.loader = <tr><td colSpan="3"><div className="driver-loder"> <ReactLoading color="blue" type="spokes" /> </div></td></tr>

        this.usersSearchRef = React.createRef()

        this.searchSource = null

        this.settingsSource = null

        this.sendEmailSource = null
        this.state = {
            addUser: false,
            editUser: false,
            deleteConfirmation: false,

            // USERS
            users: {
                list: [],
                total: null,
                error: null
            },
            dataToUpdate: null,
            deleteConfirm: {
                name: "",
                context: "",
                module: "",
                id: ""
            },

            messages:{
                userAdd:{isSuccess:false,message:""},
                userEdit:{isSuccess:false,message:""},
            },

            clientSettingMsgs: {
                enableEmailReminder: {
                    msg: "",
                    isSuccess: false,
                },
                sendEmailMsg: {
                    msg: "",
                    isSuccess: false,
                },
                autoRemindClient: {

                }
            },

            sendEmailResponse:{
                msg:"",
                isSuccess:false
            },
            clientsDropdown: [],
            currentClientSettings: {
                clientMayViewDetails: false,
                clientMayEdit: false,
                hideScoringFromBuilders: false,
                autoShareResults: false,
                autoRemindClient: false,
                companyName:""
            },
            // IT IS FOR CANCEL LAST N-1 SEARCHING REQUEST 
            cancelRequest: null,
        }
    }

    //add new job
    toggleAddUser = () => {

        // console.log('aaaya re')
        this.setState({
            addUser: !this.state.addUser
        });
    }

    getModuleData = ({ id, moduleName }) => {

        let form1 = new FormData()
        form1.append('params[token]', this.getToken())
        form1.append('params[module]', moduleName)
        form1.append('params[id]', id)

        _callApi(
            form1,
            END_POINT.MODULE_DATA.END_POINT,
            END_POINT.MODULE_DATA.POST,
        ).then(res => {

            let { error = null, result } = res.data.payload
            if (error) {

            } else {

                let data = result
                // console.log(result);

                this.setState(() => ({ dataToUpdate: data }))

                switch (moduleName) {

                    case END_POINT.LISTDATA.MODULES.USERS: {

                        this.toggleEditUser()
                        break;
                    }
                }

            }
        }).catch(error => {

        })
    }

    handleEdit = ({ values, formikBag, moduleName }) => {

        // console.log(values, moduleName);

        let form = new FormData()
        let { messages } = this.state

        form.append("params[token]", this.getToken())
        for (let key in values) {
            form.append(`params[${key}]`, values[key]);
        }
        _callApi(
            form,
            moduleName,
            1
        ).then(res => {

            let { error = null, result = null } = res.data.payload

            if (error) {

                messages.userEdit.isSuccess = false
                messages.userEdit.message = error.message

                this.setState(()=>({messages}))

            } else {

                let form1 = new FormData()
                switch (moduleName) {

                    case END_POINT.SETTINGS_CLIENTS.END_POINTS.UPDATE_USER: {

                        form1.append("params[token]", this.getToken())
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.USERS)

                        this.props.getUsers(form1)

                        if(this.state.editUser){

                            this.toggleEditUser()
                        }

                        break;
                    }
                }
            }

            setTimeout(()=>{

                messages.userEdit.isSuccess = false
                messages.userEdit.message = ""

                this.setState(()=>({messages}))
            },2000)

        }).catch(()=>{

            
        })

    }

    toggleEditUser = () => {
        this.setState({
            editUser: !this.state.editUser
        });
    }

    toggleDeleteConfirmation = ({ context, name, module, id }) => {
        let { deleteConfirm } = this.state

        deleteConfirm = { context, name, module, id }

        this.setState({
            deleteConfirmation: !this.state.deleteConfirmation,
            deleteConfirm
        });
    }

    handleDropdownChange = (event, selected) => {

        console.log(selected);
        let form = new FormData()

        form.append("params[token]", this.getToken())
        form.append('params[clientID]', selected.value)

        _callApi(
            form,
            END_POINT.SETTINGS_CLIENTS.END_POINTS.GET_CLIENT_SETTINGS,
            END_POINT.SETTINGS_CLIENTS.POST
        ).then(res => {

            let { error, result } = res.data.payload;
            let { currentClientSettings } = this.state

            if (error) {

            } else if (result) {


                let temp = {}
                if (+result.clientMayViewDetails === 1) {

                    temp["clientMayViewDetails"] = true 
                } else {
                    temp["clientMayViewDetails"] = false

                }
                if (+result.clientMayEdit === 1) {

                    temp['clientMayEdit'] = true 
                } else {
                    temp['clientMayEdit'] = false

                }
                if (+result.hideScoringFromBuilders === 1) {

                    temp['hideScoringFromBuilders'] = true 

                    
                } else {

                    temp['hideScoringFromBuilders'] = false
                } 
                
                
                if (+result.autoRemindClient === 1) {

                    temp['autoRemindClient'] = true
                } else {
                    temp['autoRemindClient'] = false
                }

                if (+result.autoShareResults === 1) {

                    temp['autoShareResults'] = true 
                } else {
                    temp['autoShareResults'] = false
                }

                if(result['companyName']){

                    temp['companyName'] = result["companyName"]
                }

                temp['clientID'] = selected.value


               

                currentClientSettings = { ...{}, ...temp }

                this.setState(() => ({ currentClientSettings }))
            } else {

                

                currentClientSettings.autoRemindClient = false
                currentClientSettings.autoShareResults = false
                currentClientSettings.clientMayEdit = false
                currentClientSettings.clientMayViewDetails = false
                currentClientSettings.hideScoringFromBuilders = false

                currentClientSettings["clientID"] = selected.value;

                this.setState(() => ({ currentClientSettings }))
            }
        })
    }

    

    updateClientSetting = (form) => {

        _callApi(
            form,
            END_POINT.SETTINGS_CLIENTS.END_POINTS.UPDATE_CLIENT_SETTINGS,
            END_POINT.SETTINGS_CLIENTS.POST
        ).then(res => {

            let { error, result } = res.data.payload;

            if (error) {

            } else {

                let { currentClientSettings } = this.state

                console.log(result);

                let temp = {}

                // if(+result.clientMayViewDetails === 0){

                //     temp["clientMayViewDetails"] = false
                // }else{
                //     temp["clientMayViewDetails"] = true

                // }
                // if(+result.clientMayEdit === 0){

                //     temp['clientMayEdit'] = false
                // }else{
                //     temp['clientMayEdit'] = true

                // }
                // if(+result.hideScoringFromBuilders ===0){

                //     temp['hideScoringFromBuilders'] = false
                // }else{

                //     temp['hideScoringFromBuilders'] = true
                // }
                // if(+result.autoShareResults === 0){

                //     temp['hideScoringFromBuilders'] = false
                // }else{

                //     temp['hideScoringFromBuilders'] = true
                // }
                // if(+result.autoRemindClient === 0){

                //     temp['autoRemindClient'] = false
                // }else{
                //     temp['autoRemindClient'] = true
                // }

                // if(+result.autoShareResults === 0){

                //     temp['autoShareResults'] = false
                // }else{
                //     temp['autoShareResults'] = true
                // }


                // currentClientSettings = {...{},...temp} 

                // this.setState(()=>({currentClientSettings}))
            }
        })

    }

    sendEmailReminder = () => {

        let { currentClientSettings, clientSettingMsgs } = this.state
        if (!currentClientSettings['clientID']) {

            return
        }
        if (!currentClientSettings["autoRemindClient"]) {

            clientSettingMsgs.enableEmailReminder.msg = API_RES.ENABLE_EMAIL_REMINDER
            clientSettingMsgs.enableEmailReminder.isSuccess = false

            this.setState(() => ({ clientSettingMsgs }))
        
            if (this.sendEmailSource) {

                clearTimeout(this.sendEmailSource)

            }

            this.sendEmailSource = setTimeout(() => {

                clientSettingMsgs.enableEmailReminder.msg = ""

                this.setState(() => ({ clientSettingMsgs }))
            }, 2000)
            return
        }
        let form = new FormData()

        form.append("params[token]", this.getToken())
        form.append(`params[clientID]`, currentClientSettings['clientID'])

        _callApi(
            form,
            END_POINT.SETTINGS_CLIENTS.END_POINTS.SEND_REMINDER,
            END_POINT.SETTINGS_CLIENTS.POST,
        ).then(res => {

            let { error = null, result = null } = res.data.payload

            let { clientSettingMsgs } = this.state

            if (error) {

                clientSettingMsgs.sendEmailMsg.msg = error.message
                clientSettingMsgs.sendEmailMsg.isSuccess = false

            } else {

                clientSettingMsgs.sendEmailMsg.msg = API_RES.SEND_EMAIL_MSG_SUCCESS
                clientSettingMsgs.sendEmailMsg.isSuccess = true

                console.log(result);
            }

            this.setState(() => ({ clientSettingMsgs }))

            setTimeout(() => {

                clientSettingMsgs.sendEmailMsg.msg = ""
                clientSettingMsgs.sendEmailMsg.isSuccess = false

                this.setState(() => ({ clientSettingMsgs }))
            }, 2000)
        })

    }

    handleSettingsChange = (event) => {


        let currentClientSettings = this.state.currentClientSettings

        currentClientSettings[event.target.name] = event.target.checked

        // console.log(event.target.checked );

        if (this.settingsSource) {

            clearTimeout(this.settingsSource);
        }

        let form = new FormData()

        form.append("params[token]", this.getToken())
        form.append(`params[clientID]`, currentClientSettings['clientID'])

        let temp = {}
        for (let key in currentClientSettings) {

            if (key !== "clientID") {

                if (currentClientSettings[key]) {

                    temp[key] = 1
                } else {

                    temp[key] = 0
                }
            }
        }

        let {companyName, ...rest } = temp;

        temp = JSON.stringify(rest)

        console.log(temp);

        form.append('params[setting]', temp)

        if (currentClientSettings['clientID']) {

            this.settingsSource = setTimeout(() => {

                this.updateClientSetting(form)
            }, 250)
        }

        this.setState(() => ({ currentClientSettings }))

    }

    getClientDropdown = (form) => {

        _callApi(
            form,
            END_POINT.MANAGEDATA_DROPDOWNS.END_POINT,
            END_POINT.MANAGEDATA_DROPDOWNS.POST,
        ).then(res => {

            let { error, result } = res.data.payload;

            if (error) {

            } else {

                let { clientsDropdown } = this.state

                clientsDropdown = result.map(item => ({ value: item.clientID, text: item.companyName }))

                this.setState(() => ({ clientsDropdown }))
            }
        })
    }

    componentDidMount() {

        let form1 = new FormData()
        form1.append('params[token]', this.getToken())
        form1.append('params[module]', END_POINT.LISTDATA.MODULES.USERS)
        this.props.getUsers(form1);

        let form2 = new FormData()
        form2.append('params[token]', this.getToken())
        form2.append('params[module]', END_POINT.LISTDATA.MODULES.CLIENTS)

        this.getClientDropdown(form2)
    }



    cancelRequest = (source) => {

        this.setState({ cancelRequest: source });

    }

    // HANDLE SEARCH

    handleUsersSearch = (event) => {

        let form = new FormData()

        if (this.searchSource) {

            clearTimeout(this.searchSource)
        }
        let text = this.usersSearchRef.current.value
        if (text && text.trim()) {

            form.append('params[searchText]', text.trim())
        }
        form.append('params[token]', this.getToken())

        form.append('params[module]', END_POINT.LISTDATA.MODULES.USERS)

        this.searchSource = setTimeout(() => {

            this.props.getUsers(form)
        }, 250)

    }


    deleteData = () => {

        let form1 = new FormData()

        form1.append("params[token]", this.getToken())
        form1.append("params[module]", this.state.deleteConfirm.module)
        form1.append("params[id]", this.state.deleteConfirm.id)
        _callApi(
            form1,
            END_POINT.DELETE_LISTDATA.END_POINT,
            END_POINT.DELETE_LISTDATA.POST
        ).then(res => {

            let { error, result } = res.data.payload;

            if (error) {

            } else {

                let form2 = new FormData()

                form2.append("params[token]", this.getToken())
                form2.append('params[module]', this.state.deleteConfirm.module)

                this.props.getUsers(form2);

            }

            this.toggleDeleteConfirmation({ context: "", name: "", id: "", module: "" })

        }).catch((error) => {

            this.toggleDeleteConfirmation({ context: "", name: "", id: "", module: "" })

        })
    }

    addNewUser = (values, formikBag) => {

        let form = new FormData()
        let { messages } = this.state

        form.append('params[token]', this.getToken())
        for (let key in values) {

            form.append(`params[${key}]`, values[key])
        }

        _callApi(
            form,
            END_POINT.SETTINGS_CLIENTS.END_POINTS.ADD_USER,
            END_POINT.SETTINGS_CLIENTS.POST
        ).then(res => {


            let { error, result } = res.data.payload;
            if (error) {

                messages.userAdd.isSuccess = false
                messages.userAdd.message = error.message

                this.setState(()=>({messages}))

            } else {

                this.toggleAddUser()
                let form2 = new FormData()

                form2.append("params[token]", this.getToken())
                form2.append('params[module]', END_POINT.DELETE_LISTDATA.MODULES.USERS)

                this.props.getUsers(form2);

                // console.log("Add new user", result);

            }

            setTimeout(()=>{

                messages.userAdd.isSuccess = false
                messages.userAdd.message = ""

                this.setState(()=>({messages}))
            },2000)

        }).catch((error) => {

            this.toggleAddUser()
            // this.toggleDeleteConfirmation({context:"",name:"", id:"", module:""})

        })
    }

    sendEmailReminderToAll=()=>{

        
        let form = new FormData()

        form.append("params[token]", this.getToken())

        _callApi(
            form,
            END_POINT.SEND_REMINDER_ALL.END_POINT,
            END_POINT.SEND_REMINDER_ALL.POST,
        ).then(res => {

            let { error = null, result = null } = res.data.payload

            let { sendEmailResponse } = this.state

            if (error) {

                sendEmailResponse.msg = error.message
                sendEmailResponse.isSuccess = false

            } else {

                sendEmailResponse.msg = API_RES.SEND_EMAIL_ALL_SUCCESS
                sendEmailResponse.isSuccess = true

                // console.log(result);
            }

            this.setState(() => ({ sendEmailResponse }))

            setTimeout(() => {

                sendEmailResponse.msg = ""
                sendEmailResponse.isSuccess = false

                this.setState(() => ({ sendEmailResponse }))
            }, 2000)
        })
    }

    getToken = () => {

        let user = JSON.parse(localStorage.getItem("user"))

        if (user) {
            return user.token;
        } else {

            return '';
        }
    }

    render() {

        return (
            <>
                {/* <UserList toggleAddNewUser={this.toggleAddNewUser} /> */}
                <div className="settings light-background">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="panel">
                                <SettingPanelHeader
                                    clickAdd={this.toggleAddUser}
                                    handleSearch={this.handleUsersSearch}
                                    ref={this.usersSearchRef}
                                    panelHeaderClass="list-unstyled m-0 d-flex align-items-center"
                                    Heading="Users"
                                    userCount={this.props.users.total}

                                />
                                <SettingUserBody
                                    loading={this.props.users.loading}
                                    loader={<Loader colSpan={3} />}
                                    list={this.props.users.list}
                                    clickEdit={this.getModuleData}
                                    clickDelete={this.toggleDeleteConfirmation} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="select-client">
                                <Usercontrol
                                    messages={this.state.clientSettingMsgs}
                                    sendEmailReminder={this.sendEmailReminder}
                                    handleSettingsChange={this.handleSettingsChange}
                                    settings={this.state.currentClientSettings}
                                    options={this.state.clientsDropdown}
                                    handleDropdownChange={this.handleDropdownChange}
                                    sendEmailReminderToAll={this.sendEmailReminderToAll}
                                    sendEmailResponse={this.state.sendEmailResponse}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
                <AddUser
                    toggleAddUser={this.toggleAddUser}
                    addUser={this.state.addUser}
                    handleNew={this.addNewUser} 
                    response = {this.state.messages.userAdd}
                    />
                <EditUser
                    data={this.state.dataToUpdate}
                    handleEdit={this.handleEdit}
                    toggleEditUser={this.toggleEditUser}
                    response = {this.state.messages.userEdit}
                    editUser={this.state.editUser} />
                <DeleteConfirmation
                    deleteConfirm={this.state.deleteConfirm}
                    deleteData={this.deleteData}
                    toggleDeleteConfirmation={this.toggleDeleteConfirmation}
                    deleteConfirmation={this.state.deleteConfirmation} />
            </>
        )
    }
}
export default Settings = connect(mapStateToProps, mapDispatchToProps)(Settings);;