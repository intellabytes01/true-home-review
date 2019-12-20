import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import csv from 'csv';
import LoadingOverlay from 'react-loading-overlay';
import PanelHeader from './managePanel/PanelHeader';
import NeighborhoodBody from './managePanel/NeighborhoodBody';
import BuilderBody from './managePanel/BuilderBody';
import TagsBody from './managePanel/TagsBody';
import DisclosuresBody from './managePanel/DisclosuresBody';
import NeighborhoodAdd from '../../commonComponents/popup/manageData/NeighborhoodAdd';
import NeighborhoodEdit from '../../commonComponents/popup/manageData/NeighborhoodEdit';
import BuilderAdd from '../../commonComponents/popup/manageData/BuilderAdd';
import BuilderEdit from '../../commonComponents/popup/manageData/BuilderEdit';
import AddTags from '../../commonComponents/popup/manageData/AddTags';
import EditTags from '../../commonComponents/popup/manageData/EditTags';
import DisclosuresAdd from '../../commonComponents/popup/manageData/DisclosuresAdd';
import DisclosuresEidt from '../../commonComponents/popup/manageData/DisclosuresEdit';
import DeleteConfirmation from '../../commonComponents/popup/DeleteConfirmation';
import GenericResponses from './managePanel/GenericResponses';
import RoomItem from './managePanel/RoomItem';
import SectionRooms from './managePanel/SectionRooms';
import Section from './managePanel/Section';
import AddGeneric from '../../commonComponents/popup/manageData/AddGeneric';
import EditGeneric from '../../commonComponents/popup/manageData/EditGeneric';
import AddRoomItem from '../../commonComponents/popup/manageData/AddRoomItem';
import EditRoomItem from '../../commonComponents/popup/manageData/EditRoomItem';
import AddSection from '../../commonComponents/popup/manageData/AddSection';
import EditSection from '../../commonComponents/popup/manageData/EditSection';
import AddSectionRoom from '../../commonComponents/popup/manageData/AddSectionRoom';
import EditSectionRoom from '../../commonComponents/popup/manageData/EditSectionRooms';


import { GetNeighborhoods } from '../../../store/api-actions/GetNeighborhoods';
import { TagsAPI } from '../../../store/api-actions/TagsAPI';
import _callApi from '../../../services/baseService';
import { GetBuilders } from '../../../store/api-actions/GetBuilders';
import { GetDisclosure } from '../../../store/api-actions/GetDisclosure';
import { GetGenericRes } from '../../../store/api-actions/GetGenericRes';
import { GetSectionRooms } from '../../../store/api-actions/GetSectionRooms';
import { GetRoomItems } from '../../../store/api-actions/GetRoomItems';
import { END_POINT } from '../../../constants/ApiEndPoints';
import { GetSections } from '../../../store/api-actions/GetSections';
import { UserContext } from './managePanel/UserContext';
import { Loader } from '../../commonComponents/loaders/loader';


const mapStateToProps = (state)=>{

    return    {
            neighborhoods:state.neighborhoods,
            tags: state.tags,
            builders:state.builders,
            disclosures:state.disclosures,
            genericResponses:state.genericResponses,
            sectionRooms:state.sectionRooms,
            roomItems:state.roomItems,
            sections:state.sections,
       }
}

const mapDispatchToProps = (dispatch)=>({ 
   getNeighborhood:(form)=>dispatch(GetNeighborhoods({ form})),
   getTagList:(form)=>dispatch(TagsAPI({form})),
   getBuilders:(form)=>dispatch(GetBuilders({form})),
   getDisclosures:(form)=>dispatch(GetDisclosure({form})),
   getGenericRes:(form)=>dispatch(GetGenericRes({form})),
   getSectionRooms:(form)=>dispatch(GetSectionRooms({form})),
   getRoomItems:(form)=>dispatch(GetRoomItems({form})),
   getSections:(form)=>dispatch(GetSections({form})),
//    getDashboardGraph:(form)=>dispatch(GetDashboardGraph(form))
})


class ManageData extends React.Component {
    constructor(props) {
        super(props);

        this.loader =   <tr > <td> <div className="driver-loder"> <ReactLoading color="blue" type="spokes" /> </div> </td> </tr>

        this.tagSearchRef = React.createRef()
        this.neighborSearchRef = React.createRef()
        this.disclosureSearchRef = React.createRef()
        this.sectionRoomsSearchRef = React.createRef()
        this.genericSearchRef = React.createRef()
        this.roomItemSearchRef = React.createRef()
        this.buildersSearchRef = React.createRef()
        this.sectionsSearchRef = React.createRef()

        this.searchSource = null

        this.messagePersistFor = 2000 //milliseconds
        this.state = {

            isLoading:false,

            // ERRORS
            messages:{
                neighborhoodAdd:{isSuccess:false,message:""},
                neighborhoodEdit:{isSuccess:false,message:""},

                builderAdd:{isSuccess:false,message:""},
                builderEdit:{isSuccess:false,message:""},

                tagAdd:{isSuccess:false,message:""},
                tagEdit:{isSuccess:false,message:""},

                disclosuresAdd: {isSuccess:false,message:""},
                disclosuresEdit: {isSuccess:false,message:""},

                genericEdit:{isSuccess:false,message:""},
                genericAdd:{isSuccess:false,message:""},

                roomItemAdd:{isSuccess:false,message:""},
                roomItemEdit:{isSuccess:false,message:""},

                sectionAdd:{isSuccess:false,message:""},
                sectionEdit:{isSuccess:false,message:""},

                sectionRoomAdd:{isSuccess:false,message:""},
                sectionRoomEdit:{isSuccess:false,message:""}
            },

            neighborhoodAdd: false,
            addNewPopup: false,
            neighborhoodEdit: false,
            builderAdd: false,
            builderEdit: false,
            addTags: false,
            editTags: false,
            disclosuresAdd: false,
            disclosuresEdit: false,
            addGeneric: false,
            editGeneric: false,
            addRoomItem: false,
            editRoomItem: false,
            addSection: false,
            editSection: false,
            addSectionRoom: false,
            editSectionRoom: false,
            
            // FOR DELETE CONFIRMATION MODAL
            deleteConfirmation: false,
            deleteConfirm:{
                name:"",
                context:"",
                module:"",
                id:""
            },

            csvFiles:{
                tag:{
                    data:[],
                    moduleName:"",
                },
                neighbor:{
                    data:[],
                    moduleName:"",
                },
                disclosure:{
                    data:[],
                    moduleName:"",
                },
                sectionRooms:{
                    data:[],
                    moduleName:"",
                },
                generic:{
                    data:[],
                    moduleName:"",
                },
                roomItem:{
                    data:[],
                    moduleName:"",
                },
                builders:{
                    data:[],
                    moduleName:"",
                },
                sections:{
                    data:[],
                    moduleName:"",
                },
            },

            // DROPDOWN
            dropdown:{
                // SECTION DROPDOWN
                sectionRoomDropdown:[],
                // ROOM ITEMS
                roomItemsDropdown:[],
            },

            dataToUpdate:null,

            handleCancel:null,
        }
    }
    // Neighborhood toggle popup statrs
    toggleNeighborhoodAdd = () => {
        this.setState({
            neighborhoodAdd: !this.state.neighborhoodAdd
        });
    }
    toggleNeighborhoodEdit = () => {
        this.setState({
            neighborhoodEdit: !this.state.neighborhoodEdit
        });
    }
    // Neighborhood toggle popup ends

    // delete toggle popup statrs
    toggleDeleteConfirmation = ({context,name, module,id}) => {

        let  {deleteConfirm} = this.state

        if(id){

            deleteConfirm = { context, name, module,id}
        }
        this.setState({
            deleteConfirmation: !this.state.deleteConfirmation,
            deleteConfirm
        });
    }
    // delete toggle popup statrs

    // Builder toggle popup statrs
    toggleBuilderAdd = () => {
        this.setState({
            builderAdd: !this.state.builderAdd
        });
    }
    toggleBuilderEdit = () => {
        this.setState({
            builderEdit: !this.state.builderEdit
        });
    }
    // Builder toggle popup ends

    // Tag toggle popup statrs
    toggleAddTags = () => {
        this.setState({
            addTags: !this.state.addTags
        });
    }
    toggleEditTags = () => {
        this.setState({
            editTags: !this.state.editTags
        });
    }
    // Tag toggle popup ends

    // Disclosure toggle popup starts
    toggleDisclosuresAdd = () => {
        this.setState({
            disclosuresAdd: !this.state.disclosuresAdd
        });
    }
    toggleDisclosuresEdit = () => {
        this.setState({
            disclosuresEdit: !this.state.disclosuresEdit
        });
    }
    // Disclosure toggle popup ends

    //Generic Responses toggle popup Starts
    toggleAddGeneric = () => {
        this.setState({
            addGeneric: !this.state.addGeneric
        });
    }
    toggleEditGeneric = () => {
        this.setState({
            editGeneric: !this.state.editGeneric
        });
    }
    //Generic Responses toggle popup ends
    //Room Item Responses toggle popup Starts
    toggleAddRoomItem = () => {
        this.setState({
            addRoomItem: !this.state.addRoomItem
        });
    }
    toggleEditRoomItem = () => {
        this.setState({
            editRoomItem: !this.state.editRoomItem
        });
    }
    //Room Item Responses toggle popup ends
    //Add Section toggle popup Starts
    toggleAddSection = () => {
        this.setState({
            addSection: !this.state.addSection
        });
    }
    toggleEditSection = () => {
        this.setState({
            editSection: !this.state.editSection
        });
    }
    //Room Item Responses toggle popup ends
    //Add Section toggle popup Starts
    toggleAddSectionRoom = () => {
        this.setState({
            addSectionRoom: !this.state.addSectionRoom
        });
    }
    toggleEditSectionRoom = () => {
        this.setState({
            editSectionRoom: !this.state.editSectionRoom
        });
    }

    
    getSectionDropdowns=(form)=>{

        let { dropdown } = this.state
        _callApi(
            form, END_POINT.MANAGEDATA_DROPDOWNS.END_POINT,
            END_POINT.MANAGEDATA_DROPDOWNS.POST,
        ).then(res=>{

            let { error, result } = res.data.payload

            if( error){
                
            }else{

                dropdown.sectionRoomDropdown = result.map(item=>({value:item.sectionName,text:item.sectionName}))
                this.setState(()=>({dropdown}))
                
            }
        }).catch(error=>{

        })

    }

    getRoomItemsDropdowns=(form)=>{

        let { dropdown } = this.state
        _callApi(
            form, END_POINT.MANAGEDATA_DROPDOWNS.END_POINT,
            END_POINT.MANAGEDATA_DROPDOWNS.POST,
        ).then(res=>{

            let { error, result } = res.data.payload

            if( error){
                
            }else{

                dropdown.roomItemsDropdown = result.map(item=>({key:item.a_ListSectionRoomID, value:item.roomName,text:item.roomName}))
                // console.log("sectionDropdown ", result);

                this.setState(()=>({dropdown}))
                
            }
        }).catch(error=>{

        })

    }
    //Room Item Responses toggle popup ends

    componentDidMount(){

        let form1 = new FormData()
        form1.append('params[token]', this.getToken({key:"token"}))
        form1.append('params[module]', END_POINT.LISTDATA.MODULES.NEIGHBORHOOD)
        this.props.getNeighborhood(form1);

        let form2 = new FormData()
        form2.append('params[token]', this.getToken({key:"token"}))
        form2.append('params[module]', END_POINT.LISTDATA.MODULES.TAGS)
        this.props.getTagList(form2);

        let form3 = new FormData()
        form3.append('params[token]', this.getToken({key:"token"}))
        form3.append('params[module]', END_POINT.LISTDATA.MODULES.BUILDERS)
        this.props.getBuilders(form3);

        let form4 = new FormData()
        form4.append('params[token]', this.getToken({key:"token"}))
        form4.append('params[module]', END_POINT.LISTDATA.MODULES.DISCLOSURE)
        this.props.getDisclosures(form4);

        let form5 = new FormData()
        form5.append('params[token]', this.getToken({key:"token"}))
        form5.append('params[module]', END_POINT.LISTDATA.MODULES.GENERIC)
        this.props.getGenericRes(form5);

        let form6 = new FormData()
        form6.append('params[token]', this.getToken({key:"token"}))
        form6.append('params[module]', END_POINT.LISTDATA.MODULES.SECTION_ROOMS)
        this.props.getSectionRooms(form6);

        let form7 = new FormData()
        form7.append('params[token]', this.getToken({key:"token"}))
        form7.append('params[module]', END_POINT.LISTDATA.MODULES.ROOM_ITEMS)
        this.props.getRoomItems(form7)
        
        let form8 = new FormData()
        form8.append('params[token]', this.getToken({key:"token"}))
        form8.append('params[module]', END_POINT.LISTDATA.MODULES.SECTIONS)
        this.props.getSections(form8)

        let form9 = new FormData()
        form9.append('params[token]', this.getToken({key:"token"}))
        form9.append('params[module]', END_POINT.LISTDATA.MODULES.SECTIONS)
        this.getSectionDropdowns(form9)
        
        let form10 = new FormData()
        form10.append('params[token]', this.getToken({key:"token"}))
        form10.append('params[module]', END_POINT.LISTDATA.MODULES.ROOM_ITEMS)
        this.getRoomItemsDropdowns(form10)
    }


    loadDropdowns=()=>{

        let form9 = new FormData()
        form9.append('params[token]', this.getToken({key:"token"}))
        form9.append('params[module]', END_POINT.LISTDATA.MODULES.SECTIONS)
        this.getSectionDropdowns(form9)
        
        let form10 = new FormData()
        form10.append('params[token]', this.getToken({key:"token"}))
        form10.append('params[module]', END_POINT.LISTDATA.MODULES.ROOM_ITEMS)
        this.getRoomItemsDropdowns(form10)
    }


    handleTagSearch = (event)=>{

        // console.log(this.tagSearchRef.current.value);

        if(this.searchSource){

            clearTimeout(this.searchSource)
        }
        
        let form = new FormData()

        form.append('params[token]', this.getToken({key:"token"}))

        let text = this.tagSearchRef.current.value
        if(text && text.trim()){

            form.append('params[searchText]',text.trim() )
        }
        form.append('params[module]', END_POINT.LISTDATA.MODULES.TAGS)

        this.searchSource = setTimeout(()=>{

            this.props.getTagList(form)        
                        
        },250) 
        
    }

    handleNeighborSearch = (event)=>{

        // console.log(this.tagSearchRef.current.value);

        if(this.searchSource){

            clearTimeout(this.searchSource)
        }

        
        let form = new FormData()

        form.append('params[token]', this.getToken({key:"token"}))

        let text = this.neighborSearchRef.current.value
        if(text && text.trim()){

            form.append('params[searchText]',text.trim() )
        }
        form.append('params[module]', END_POINT.LISTDATA.MODULES.NEIGHBORHOOD)

        this.searchSource = setTimeout(()=>{

            this.props.getNeighborhood(form)        
                        
        },250) 
        
        
    }

    handleDisclosureSearch = (event)=>{

        // console.log(this.tagSearchRef.current.value);
        
        if(this.searchSource){

            clearTimeout(this.searchSource)
        }

        let form = new FormData()

        let text = this.disclosureSearchRef.current.value
        if(text && text.trim()){

            form.append('params[searchText]',text.trim() )
        }
        form.append('params[module]', END_POINT.LISTDATA.MODULES.DISCLOSURE)
        form.append('params[token]', this.getToken({key:"token"}))

        this.searchSource = setTimeout(()=>{

            this.props.getDisclosures(form)        
                        
        },250) 
        
    }

    handleGenericResSearch = (event)=>{

        // console.log(this.tagSearchRef.current.value);
        
        if(this.searchSource){

            clearTimeout(this.searchSource)
        }

        let form = new FormData()

        let text = this.genericSearchRef.current.value
        if(text && text.trim()){

            form.append('params[searchText]',text.trim() )
        }
        form.append('params[token]', this.getToken({key:"token"}))

        form.append('params[module]', END_POINT.LISTDATA.MODULES.GENERIC)
        
        this.searchSource = setTimeout(()=>{
            
            this.props.getGenericRes(form)        
                        
        },250) 
        
    }

    handleSectionRoomSearch = (event)=>{

        // console.log(this.tagSearchRef.current.value);
        
        if(this.searchSource){

            clearTimeout(this.searchSource)
        }

        let form = new FormData()

        let text = this.sectionRoomsSearchRef.current.value
        if(text && text.trim()){

            form.append('params[searchText]',text.trim() )
        }
        form.append('params[token]', this.getToken({key:"token"}))

        form.append('params[module]', END_POINT.LISTDATA.MODULES.SECTION_ROOMS)

        this.searchSource = setTimeout(()=>{

            this.props.getSectionRooms(form)        
                        
        },250) 

        
    }

    handleRoomItemsSearch = (event)=>{

        // console.log(this.tagSearchRef.current.value);
        
        if(this.searchSource){

            clearTimeout(this.searchSource)
        }

        let form = new FormData()

        let text = this.roomItemSearchRef.current.value
        if(text && text.trim()){

            form.append('params[searchText]',text.trim() )
        }
        form.append('params[token]', this.getToken({key:"token"}))

        form.append('params[module]', END_POINT.LISTDATA.MODULES.ROOM_ITEMS)
        
        this.searchSource = setTimeout(()=>{

            this.props.getRoomItems(form)        
                        
        },250) 

        
    }

    handleBuildersSearch = (event)=>{

        // console.log(this.tagSearchRef.current.value);
        if(this.searchSource){

            clearTimeout(this.searchSource)
        }
        
        let form = new FormData()

        form.append('params[token]', this.getToken({key:"token"}))

        let text = this.buildersSearchRef.current.value
        if(text && text.trim()){

            form.append('params[searchText]',text.trim() )
        }
        form.append('params[module]', END_POINT.LISTDATA.MODULES.BUILDERS)

        this.searchSource = setTimeout(()=>{

            this.props.getBuilders(form)        
                        
        },250) 
        
    }

    handleSectionsSearch = (event)=>{

        // console.log(this.tagSearchRef.current.value);
        
        if(this.searchSource){

            clearTimeout(this.searchSource)
        }
        let form = new FormData()

        let text = this.sectionsSearchRef.current.value
        if(text && text.trim()){

            form.append('params[searchText]',text.trim() )
        }
        form.append('params[token]', this.getToken({key:"token"}))

        form.append('params[module]', END_POINT.LISTDATA.MODULES.SECTIONS)

       this.searchSource = setTimeout(()=>{

                this.props.getSections(form)        
       },250) 
        
    }

    deleteData = ()=>{

        this.setState(()=>({isLoading:true,deleteConfirmation:false}))

        let form1 = new FormData()

        form1.append("params[token]", this.getToken({key:"token"}))
        form1.append("params[module]", this.state.deleteConfirm.module)
        form1.append("params[id]", this.state.deleteConfirm.id)
        _callApi(
            form1,
            END_POINT.DELETE_LISTDATA.END_POINT,
            END_POINT.DELETE_LISTDATA.POST
        ).then(res=>{

            let { error, result } = res.data.payload;

            if(error){

                if(this.state.deleteConfirmation){

                    this.toggleDeleteConfirmation({context:"",name:"", id:"", module:""})
                }

            }else{

                let form2 = new FormData()
    
                form2.append("params[token]", this.getToken({key:"token"}))
                form2.append('params[module]', this.state.deleteConfirm.module)
    
                switch(this.state.deleteConfirm.module){
    
                    case END_POINT.DELETE_LISTDATA.MODULES.BUILDERS:{
    
                        this.props.getBuilders(form2)
    
                        break;
                    }
                    case END_POINT.DELETE_LISTDATA.MODULES.TAGS:{
    
                        this.props.getTagList(form2)
                        break;
    
                    }
                    case END_POINT.DELETE_LISTDATA.MODULES.DISCLOSURE:{
    
                        this.props.getDisclosures(form2)
                        break;
    
                    }
                    case END_POINT.DELETE_LISTDATA.MODULES.SECTION_ROOMS:{
                        this.props.getSectionRooms(form2)
                        break;
                    }
                    case END_POINT.DELETE_LISTDATA.MODULES.SECTIONS:{
    
                        this.props.getSections(form2)
                        break;
                    }
                    case END_POINT.DELETE_LISTDATA.MODULES.NEIGHBORHOOD:{
    
                        this.props.getNeighborhood(form2)
                        break;
                    }
                    case END_POINT.DELETE_LISTDATA.MODULES.ROOM_ITEMS:{
    
                        this.props.getRoomItems(form2)
                        break;
                    }
                    case END_POINT.DELETE_LISTDATA.MODULES.GENERIC:{
    
                        this.props.getGenericRes(form2)
                        break;
                    }
                }

                this.loadDropdowns()

            }

            if(this.state.deleteConfirmation){

                this.toggleDeleteConfirmation({context:"",name:"", id:"", module:""})
            }

                this.setState(()=>({isLoading:false}))

        }).catch((error)=>{

            if(this.state.deleteConfirmation){

                this.toggleDeleteConfirmation({context:"",name:"", id:"", module:""})
            }

            this.setState(()=>({isLoading:false}))

        })
    }

    getModuleData=({id, moduleName})=>{

        let form1 = new FormData()
        form1.append('params[token]', this.getToken({key:"token"}))
        form1.append('params[module]', moduleName)
        form1.append('params[id]', id)
        
        _callApi(
            form1,
            END_POINT.MODULE_DATA.END_POINT,
            END_POINT.MODULE_DATA.POST,
        ).then(res=>{

            let { error=null, result  } = res.data.payload
            if( error){
                
            }else{

                let data= result
                // console.log(result);

                this.setState(()=>({dataToUpdate:data}))

                switch(moduleName){
    
                    case END_POINT.MODULE_DATA.MODULES.BUILDER:{
    
                        this.toggleBuilderEdit()
                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.TAG:{
    
                        this.toggleEditTags()
                        
                        break;
    
                    }
                    case END_POINT.MODULE_DATA.MODULES.SECTION_ROOM:{
                        
                        this.toggleEditSectionRoom()
                        break;
    
                    }
                    case END_POINT.MODULE_DATA.MODULES.SECTION:{
    
                        this.toggleEditSection()
                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.NEIGHBORHOOD:{
    
                        this.toggleNeighborhoodEdit()
                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.ROOM_ITEM:{
    
                        this.toggleEditRoomItem()
                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.GENERIC:{
    
                        this.toggleEditGeneric()
                        break;
    
                    }
                    case END_POINT.MODULE_DATA.MODULES.DISCLOSURE:{
    
                        this.toggleDisclosuresEdit()
                        break;
    
                    }

                }
                
            }
        }).catch(error=>{

        })
    }


    handleEdit=({values, formikBag, moduleName})=>{

        console.log(values, moduleName);

        let form = new FormData()

        form.append("params[token]", this.getToken({key:"token"}))
        for(let key in values){
            form.append(`params[${key}]`, values[key]);
        }
        _callApi(
            form,
            moduleName,
            1
        ).then(res=>{

            let { error=null, result = null } = res.data.payload
            let { messages } = this.state
            if(error){

                switch(moduleName){

                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.NEIGHBORHOOD:{     

                        messages.neighborhoodEdit.message = error.message
                        messages.neighborhoodEdit.isSuccess = false

                        this.setState(()=>({messages}))

                        setTimeout(()=>{

                            messages.neighborhoodAdd.message = ""

                            this.setState(()=>({messages}))

                        },this.messagePersistFor)
                        
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.TAGS:{
                     
                        messages.tagEdit.message = error.message
                        messages.tagEdit.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.tagEdit.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)
                       
                        
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.BUILDER:{
                     
                        
                        messages.builderEdit.message = error.message
                        messages.builderEdit.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.builderEdit.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.DISCLOSURE:{
                     
                        messages.disclosuresEdit.message = error.message
                        messages.disclosuresEdit.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.disclosuresEdit.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.SECTION:{
                     
                        messages.sectionEdit.message = error.message
                        messages.sectionEdit.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.sectionEdit.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)
                        
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.SECTION_ROOM:{
                     
                        messages.sectionRoomEdit.message = error.message
                        messages.sectionRoomEdit.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.sectionRoomEdit.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)

                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.GENERIC:{
                     
                       
                        messages.genericEdit.message = error.message
                        messages.genericEdit.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.genericEdit.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)

                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.ROOM_ITEM:{
                     
                        messages.roomItemEdit.message = error.message
                        messages.roomItemEdit.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.roomItemEdit.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)

                        break;
                    }
                }

            }else{

                let form1 = new FormData()
                
                switch(moduleName){

                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.NEIGHBORHOOD:{     

                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.NEIGHBORHOOD)

                        this.props.getNeighborhood(form1)
                        if(this.state.neighborhoodEdit){

                            this.toggleNeighborhoodEdit()
                        }
                        
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.TAGS:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.TAGS)
                        
                        if(this.state.editTags){

                            this.toggleEditTags()
                        }
                        this.props.getTagList(form1)
                        
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.BUILDER:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.BUILDERS)
                        if(this.state.builderEdit){

                            this.toggleBuilderEdit()
                        }
                        this.props.getBuilders(form1)
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.DISCLOSURE:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.DISCLOSURE)
                        
                        if(this.state.disclosuresEdit){

                            this.toggleDisclosuresEdit()
                        }
                        this.props.getDisclosures(form1)
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.SECTION:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.SECTIONS)
                        if(this.state.editSection){

                            this.toggleEditSection()
                        }
                        this.props.getSections(form1)
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.SECTION_ROOM:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.SECTION_ROOMS)
                        if(this.state.editSectionRoom){

                            this.toggleEditSectionRoom()
                        }
                        this.props.getSectionRooms(form1)

                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.GENERIC:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.GENERIC)
                        if(this.state.editGeneric){

                            this.toggleEditGeneric()
                        }
                        this.props.getGenericRes(form1)

                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.ROOM_ITEM:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.ROOM_ITEMS)
                        if(this.state.editRoomItem){

                            this.toggleEditRoomItem()
                        }
                        this.props.getRoomItems(form1)

                        break;
                    }
                }

                this.loadDropdowns()
            }
        })

    }


    handleAdd=({values, formikBag, moduleName})=>{

        console.log(values, moduleName);

        let form = new FormData()

        form.append("params[token]", this.getToken({key:"token"}))
        for(let key in values){
            form.append(`params[${key}]`, values[key]);
        }
        _callApi(
            form,
            moduleName,
            1
        ).then(res=>{

            let { error=null, result = null } = res.data.payload
            let { messages } = this.state
            if(error){

                switch(moduleName){

                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.NEIGHBORHOOD:{     

                        messages.neighborhoodAdd.message = error.message
                        messages.neighborhoodAdd.isSuccess = false

                        this.setState(()=>({messages}))

                        setTimeout(()=>{

                            messages.neighborhoodAdd.message = ""

                            this.setState(()=>({messages}))

                        },this.messagePersistFor)
                        
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.TAGS:{
                     
                        messages.tagAdd.message = error.message
                        messages.tagAdd.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.tagAdd.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)
                       
                        
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.BUILDER:{
                     
                        
                        messages.builderAdd.message = error.message
                        messages.builderAdd.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.builderAdd.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.DISCLOSURE:{
                     
                        messages.disclosuresAdd.message = error.message
                        messages.disclosuresAdd.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.disclosuresAdd.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.SECTION:{
                     
                        messages.sectionAdd.message = error.message
                        messages.sectionAdd.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.sectionAdd.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)
                        
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.SECTION_ROOM:{
                     
                        messages.sectionRoomAdd.message = error.message
                        messages.sectionRoomAdd.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.sectionRoomAdd.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)

                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.GENERIC:{
                     
                       
                        messages.genericAdd.message = error.message
                        messages.genericAdd.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.genericAdd.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)

                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.ROOM_ITEM:{
                     
                        messages.roomItemAdd.message = error.message
                        messages.roomItemAdd.isSuccess = false
        
                        this.setState(()=>({messages}))
        
                        setTimeout(()=>{
        
                            messages.roomItemAdd.message = ""
        
                            this.setState(()=>({messages}))
        
                        },this.messagePersistFor)

                        break;
                    }
                }

            }else{

                let form1 = new FormData()
                
                switch(moduleName){

                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.NEIGHBORHOOD:{     

                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.NEIGHBORHOOD)

                        this.props.getNeighborhood(form1)
                        if(this.state.neighborhoodAdd){

                            this.toggleNeighborhoodAdd()
                        }
                        
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.TAGS:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.TAGS)
                        
                        if(this.state.addTags){

                            this.toggleAddTags()
                        }
                        this.props.getTagList(form1)
                        
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.BUILDER:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.BUILDERS)
                        if(this.state.builderAdd){

                            this.toggleBuilderAdd()
                        }
                        this.props.getBuilders(form1)
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.DISCLOSURE:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.DISCLOSURE)
                        
                        if(this.state.disclosuresAdd){

                            this.toggleDisclosuresAdd()
                        }
                        this.props.getDisclosures(form1)
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.SECTION:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.SECTIONS)
                        if(this.state.addSection){

                            this.toggleAddSection()
                        }
                        this.props.getSections(form1)
                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.SECTION_ROOM:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.SECTION_ROOMS)
                        if(this.state.addSectionRoom){

                            this.toggleAddSectionRoom()
                        }
                        this.props.getSectionRooms(form1)

                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.GENERIC:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.GENERIC)
                        if(this.state.addGeneric){

                            this.toggleAddGeneric()
                        }
                        this.props.getGenericRes(form1)

                        break;
                    }
                    case END_POINT.CREATE_UPDATE_LISTDATA.END_POINTS.ROOM_ITEM:{
                     
                        form1.append("params[token]", this.getToken({key:"token"}))
                        form1.append('params[module]', END_POINT.LISTDATA.MODULES.ROOM_ITEMS)
                        if(this.state.addRoomItem){

                            this.toggleAddRoomItem()
                        }
                        this.props.getRoomItems(form1)

                        break;
                    }
                }

                this.loadDropdowns()

            }
        })

    }

    

    uploadCsv=(form, moduleName)=>{ 
        
        if(form && moduleName){

            this.setState({isLoading:true})
            _callApi(form,
                END_POINT.IMPORT_CSV.END_POINT,
                END_POINT.IMPORT_CSV.POST).then(res=>{
    
                    let { error, result} = res.data.payload

                    if(error){

                        console.log(error,result);
                    }else{

                        console.log(error,result);

                        let form1 = new FormData()
                        switch(moduleName){
        
                            case END_POINT.LISTDATA.MODULES.NEIGHBORHOOD:{     
        
                                form1.append("params[token]", this.getToken({key:"token"}))
                                form1.append('params[module]', END_POINT.LISTDATA.MODULES.NEIGHBORHOOD)
        
                                this.props.getNeighborhood(form1)
                                
                                break;
                            }
                            case END_POINT.LISTDATA.MODULES.TAGS:{
                             
                                form1.append("params[token]", this.getToken({key:"token"}))
                                form1.append('params[module]', END_POINT.LISTDATA.MODULES.TAGS)
                                this.props.getTagList(form1)
                                
                                break;
                            }
                            case END_POINT.LISTDATA.MODULES.BUILDERS:{
                             
                                form1.append("params[token]", this.getToken({key:"token"}))
                                form1.append('params[module]', END_POINT.LISTDATA.MODULES.BUILDERS)
                                
                                this.props.getBuilders(form1)
                                break;
                            }
                            case END_POINT.LISTDATA.MODULES.DISCLOSURE:{
                             
                                form1.append("params[token]", this.getToken({key:"token"}))
                                form1.append('params[module]', END_POINT.LISTDATA.MODULES.DISCLOSURE)
                              
                                this.props.getDisclosures(form1)
                                break;
                            }
                            case END_POINT.LISTDATA.MODULES.SECTIONS:{
                             
                                form1.append("params[token]", this.getToken({key:"token"}))
                                form1.append('params[module]', END_POINT.LISTDATA.MODULES.SECTIONS)
                                
                                this.props.getSections(form1)
                                break;
                            }
                            case END_POINT.LISTDATA.MODULES.SECTION_ROOMS:{
                             
                                form1.append("params[token]", this.getToken({key:"token"}))
                                form1.append('params[module]', END_POINT.LISTDATA.MODULES.SECTION_ROOMS)
                               
                                this.props.getSectionRooms(form1)
        
                                break;
                            }
                            case END_POINT.LISTDATA.MODULES.GENERIC:{
                             
                                form1.append("params[token]", this.getToken({key:"token"}))
                                form1.append('params[module]', END_POINT.LISTDATA.MODULES.GENERIC)
                                
                                this.props.getGenericRes(form1)
        
                                break;
                            }
                            case END_POINT.LISTDATA.MODULES.ROOM_ITEMS:{
                             
                                form1.append("params[token]", this.getToken({key:"token"}))
                                form1.append('params[module]', END_POINT.LISTDATA.MODULES.ROOM_ITEMS)
                                
                                this.props.getRoomItems(form1)
        
                                break;
                            }
                        }

                        this.loadDropdowns()
                    }
                    
                        this.setState({isLoading:false})

                }).catch(()=>{

                    console.error("an error was occured");
                   
                    
                    this.setState({isLoading:false})

                })
        }

    }

    importCSV=(e, moduleName)=>{

        if(e && e.length){

            let { csvFiles } = this.state
            const reader = new FileReader();
        reader.onload = () => {
            csv.parse(reader.result, (err, data) => {

                let form = new FormData()
                switch(moduleName){

                    case END_POINT.MODULE_DATA.MODULES.BUILDER:{

                        csvFiles.builders.data = data;
                        csvFiles.builders.moduleName = moduleName;

                        let json = JSON.stringify(data);
                        this.createCsvUploadForm(json, moduleName)

                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.NEIGHBORHOOD:{
                        
                        csvFiles.neighbor.data = data;
                        csvFiles.neighbor.moduleName = moduleName;
                        let json = JSON.stringify(data);
                        this.createCsvUploadForm(json, moduleName)
                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.ROOM_ITEM:{

                        csvFiles.roomItem.data = data;
                        csvFiles.roomItem.moduleName = moduleName;
                        let json = JSON.stringify(data);
                        this.createCsvUploadForm(json, moduleName)
                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.DISCLOSURE:{

                        csvFiles.disclosure.data = data;
                        csvFiles.disclosure.moduleName = moduleName;
                        let json = JSON.stringify(data);
                        this.createCsvUploadForm(json, moduleName)
                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.TAG:{

                        csvFiles.tag.data = data;
                        csvFiles.tag.moduleName = moduleName;
                        let json = JSON.stringify(data);
                        this.createCsvUploadForm(json, moduleName)
                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.SECTION:{

                        csvFiles.sections.data = data;
                        csvFiles.sections.moduleName = moduleName;
                        let json = JSON.stringify(data);
                        this.createCsvUploadForm(json, moduleName)
                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.SECTION_ROOM:{

                        csvFiles.sectionRooms.data = data;
                        csvFiles.sectionRooms.moduleName = moduleName;
                        let json = JSON.stringify(data);
                        this.createCsvUploadForm(json, moduleName)
                        break;
                    }
                    case END_POINT.MODULE_DATA.MODULES.GENERIC:{

                        csvFiles.generic.data = data;
                        csvFiles.generic.moduleName = moduleName;
                        let json = JSON.stringify(data);
                        this.createCsvUploadForm(json, moduleName)
                        break;
                    }
                }
                
                this.setState(()=>({csvFiles}))
                // this.uploadCsv()
            });
        };
        reader.readAsBinaryString(e[0]);
    }
    
}

createCsvUploadForm=(data,moduleName)=>{

    let form = new FormData()
    form.append('params[token]', this.getToken({key:"token"}))
    form.append('params[csvData]', data)
    form.append('params[module]', moduleName)
    this.uploadCsv(form, moduleName)

}

   

    getFormOf=(moduleName)=>{

        let form = new FormData()

        form.append('params[token]', this.getToken({key:"token"}));
        form.append('params[module]',moduleName);

        return form;
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
            <>
            <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Loading your content...'
                    >

                <div className="manage-data light-background">
                    <div className="row">
                    <UserContext.Provider value={{userType:this.getToken({key:"userType"})}} >
                        <div className="col-md-7">
                            <div className="panel">
                                <PanelHeader 
                                clickAdd={this.toggleNeighborhoodAdd} 
                                handleSearch={this.handleNeighborSearch}
                                ref={this.neighborSearchRef}
                                panelHeaderClass="list-unstyled m-0 d-flex align-items-center" 
                                Heading="Neighborhood"
                                importCSV={this.importCSV}
                                moduleName={END_POINT.MODULE_DATA.MODULES.NEIGHBORHOOD} // THIS IS FOR UPLOADING CSV OF THIS MODULE NAME 
                                 />
                                <NeighborhoodBody 
                                loading ={this.props.neighborhoods.loading} 
                                loader = {<Loader colSpan={5} />}
                                list = { this.props.neighborhoods.list}
                                clickEdit={  this.getModuleData} 
                                clickDelete={   this.toggleDeleteConfirmation} />
                            </div>

                            <div className="panel">
                                <PanelHeader 
                                clickAdd={this.toggleBuilderAdd}
                                ref={this.buildersSearchRef}
                                handleSearch={this.handleBuildersSearch} 
                                panelHeaderClass="list-unstyled m-0 d-flex align-items-center" 
                                Heading="Builders"
                                importCSV={this.importCSV}
                                moduleName={END_POINT.MODULE_DATA.MODULES.BUILDER}
                                />
                                <BuilderBody 
                                loading ={this.props.builders.loading} 
                                loader = {<Loader colSpan={3} />}
                                list={this.props.builders.list}
                                clickEdit={this.getModuleData} 
                                clickDelete={this.toggleDeleteConfirmation} />
                            </div>
                            <div className="panel">
                                <PanelHeader 
                                clickAdd={this.toggleAddGeneric} 
                                handleSearch = {this.handleGenericResSearch}
                                ref={this.genericSearchRef}
                                panelHeaderClass="list-unstyled m-0 d-flex align-items-center" 
                                Heading="Generic Responses" 
                                importCSV={this.importCSV}
                                moduleName={END_POINT.MODULE_DATA.MODULES.GENERIC}
                                />
                                <GenericResponses
                                list ={this.props.genericResponses.list} 
                                loading ={this.props.genericResponses.loading} 
                                loader = {<Loader colSpan={2} />}
                                clickEdit={this.getModuleData} 
                                clickDelete={this.toggleDeleteConfirmation} />
                            </div>
                            <div className="panel">
                                <PanelHeader 
                                ref={this.roomItemSearchRef}
                                clickAdd={this.toggleAddRoomItem} 
                                handleSearch={this.handleRoomItemsSearch}
                                panelHeaderClass="list-unstyled m-0 d-flex align-items-center" 
                                Heading="Section Item" 
                                importCSV={this.importCSV}
                                moduleName={END_POINT.MODULE_DATA.MODULES.ROOM_ITEM}
                                />
                                <RoomItem
                                list = {this.props.roomItems.list}
                                loading={this.props.roomItems.loading} 
                                loader = {<Loader colSpan={2} />}
                                clickEdit={this.getModuleData} 
                                clickDelete={this.toggleDeleteConfirmation} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="panel">
                                <PanelHeader
                                ref = {this.tagSearchRef} 
                                clickAdd={this.toggleAddTags} 
                                handleSearch= {this.handleTagSearch}
                                panelHeaderClass="list-unstyled m-0 d-flex align-items-center" 
                                Heading="Tags" 
                                importCSV={this.importCSV}
                                moduleName={END_POINT.MODULE_DATA.MODULES.TAG}
                                />
                                <TagsBody 
                                list = { this.props.tags.list}
                                loading={this.props.tags.loading} 
                                loader = {<Loader colSpan={1} />}
                                clickEdit={this.getModuleData} 
                                clickDelete={this.toggleDeleteConfirmation} />
                            </div>

                            <div className="panel">
                                <PanelHeader 
                                ref={this.disclosureSearchRef}
                                handleSearch={this.handleDisclosureSearch}
                                clickAdd={this.toggleDisclosuresAdd} 
                                panelHeaderClass="list-unstyled m-0 d-flex align-items-center" 
                                Heading="Disclosures" 
                                importCSV={this.importCSV}
                                moduleName={END_POINT.MODULE_DATA.MODULES.DISCLOSURE}
                                />
                                <DisclosuresBody 
                                list={this.props.disclosures.list}
                                loading={this.props.disclosures.loading}
                                loader= {<Loader colSpan={1} />}
                                clickEdit={this.getModuleData} 
                                clickDelete={this.toggleDeleteConfirmation} />
                            </div>

                            <div className="panel">
                                <PanelHeader 
                                ref={this.sectionRoomsSearchRef}
                                handleSearch= {this.handleSectionRoomSearch} 
                                clickAdd={this.toggleAddSectionRoom}
                                panelHeaderClass="list-unstyled m-0 d-flex align-items-center" 
                                Heading="Section Rooms" 
                                importCSV={this.importCSV}
                                moduleName={END_POINT.MODULE_DATA.MODULES.SECTION_ROOM}
                                />
                                <SectionRooms
                                list={this.props.sectionRooms.list} 
                                loading={this.props.sectionRooms.loading}
                                loader= {<Loader colSpan={2} />}
                                clickEdit={this.getModuleData} 
                                clickDelete={this.toggleDeleteConfirmation}
                                 />
                            </div>
                            <div className="panel">
                                <PanelHeader 
                                ref={this.sectionsSearchRef}
                                handleSearch= {this.handleSectionsSearch} 
                                clickAdd={this.toggleAddSection} 
                                panelHeaderClass="list-unstyled m-0 d-flex align-items-center" 
                                Heading="Sections" 
                                importCSV={this.importCSV}
                                moduleName={END_POINT.MODULE_DATA.MODULES.SECTION}
                                />
                                <Section 
                                list={this.props.sections.list} 
                                loading={this.props.sections.loading}
                                loader= {<Loader colSpan={2} />}
                                clickEdit={this.getModuleData} 
                                clickDelete={this.toggleDeleteConfirmation} />
                            </div>
                        </div>
                        </UserContext.Provider>
                    </div>
                </div>

                {/* Add & Edit popus calling from commonComponent>Popup  */}
                <DeleteConfirmation  
                deleteData={this.deleteData}
                deleteConfirm={this.state.deleteConfirm} 
                toggleDeleteConfirmation={this.toggleDeleteConfirmation} 
                deleteConfirmation={this.state.deleteConfirmation} />
                
                <NeighborhoodAdd response={this.state.messages.neighborhoodAdd} handleNew= {this.handleAdd} toggleNeighborhoodAdd={this.toggleNeighborhoodAdd} neighborhoodAdd={this.state.neighborhoodAdd} />
                <NeighborhoodEdit response={this.state.messages.neighborhoodAdd} data={this.state.dataToUpdate} handleEdit={this.handleEdit} toggleNeighborhoodEdit={this.toggleNeighborhoodEdit} neighborhoodEdit={this.state.neighborhoodEdit} />
                
                <BuilderAdd response={this.state.messages.builderAdd} handleNew = {this.handleAdd}  toggleBuilderAdd={this.toggleBuilderAdd} builderAdd={this.state.builderAdd} />
                <BuilderEdit response={this.state.messages.builderEdit} data={this.state.dataToUpdate} handleEdit={this.handleEdit} toggleBuilderEdit={this.toggleBuilderEdit} builderEdit={this.state.builderEdit} />
                
                <AddTags response={this.state.messages.tagAdd} handleNew = {this.handleAdd} toggleAddTags={this.toggleAddTags} addTags={this.state.addTags} />
                <EditTags response={this.state.messages.tagEdit} data={this.state.dataToUpdate} handleEdit={this.handleEdit} toggleEditTags={this.toggleEditTags} editTags={this.state.editTags} />
                
                <DisclosuresAdd response={this.state.messages.disclosuresAdd} handleNew = {this.handleAdd} toggleDisclosuresAdd={this.toggleDisclosuresAdd} disclosuresAdd={this.state.disclosuresAdd} />
                <DisclosuresEidt response={this.state.messages.disclosuresEdit} data={this.state.dataToUpdate} handleEdit={this.handleEdit} toggleDisclosuresEdit={this.toggleDisclosuresEdit} disclosuresEdit={this.state.disclosuresEdit} />
                
                <AddGeneric response={this.state.messages.genericAdd} handleNew = {this.handleAdd} toggleAddGeneric={this.toggleAddGeneric} addGeneric={this.state.addGeneric} />
                <EditGeneric response={this.state.messages.genericEdit} data={this.state.dataToUpdate} handleEdit={this.handleEdit}  toggleEditGeneric={this.toggleEditGeneric} editGeneric={this.state.editGeneric} />
                
                <AddRoomItem response={this.state.messages.roomItemAdd} handleNew = {this.handleAdd} options={ this.state.dropdown.sectionRoomDropdown}  toggleAddRoomItem={this.toggleAddRoomItem} addRoomItem={this.state.addRoomItem} />
                <EditRoomItem response={this.state.messages.roomItemEdit} data={this.state.dataToUpdate} handleEdit={this.handleEdit} options={ this.state.dropdown.sectionRoomDropdown} toggleEditRoomItem={this.toggleEditRoomItem} editRoomItem={this.state.editRoomItem} />
                
                <AddSection response={this.state.messages.sectionAdd}  handleNew={this.handleAdd} toggleAddSection={this.toggleAddSection} addSection={this.state.addSection} />
                <EditSection response={this.state.messages.sectionEdit} data={this.state.dataToUpdate} handleEdit={this.handleEdit} toggleEditSection={this.toggleEditSection} editSection={this.state.editSection} />
                
                <AddSectionRoom response={this.state.messages.sectionRoomAdd} handleNew={this.handleAdd} options={ this.state.dropdown.sectionRoomDropdown} toggleAddSectionRoom={this.toggleAddSectionRoom} addSectionRoom={this.state.addSectionRoom} />
                <EditSectionRoom response={this.state.messages.sectionRoomEdit} data={this.state.dataToUpdate} handleEdit={this.handleEdit} options={ this.state.dropdown.sectionRoomDropdown} toggleEditSectionRoom={this.toggleEditSectionRoom} editSectionRoom={this.state.editSectionRoom} />
                
            </LoadingOverlay>
        </>
        )
    }
}
export default ManageData=connect(mapStateToProps, mapDispatchToProps,null,{pure:false})(ManageData);