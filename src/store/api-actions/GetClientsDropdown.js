import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { ClientsDropActions } from "../actions/ClientsDropActions";


export const GetClientsDropdown = ({form})=>{

    return (dispatch, getState)=>{

        dispatch(ClientsDropActions.ClientsDropdownGetting({result:{},error:{}}))
        return _callApi(
            form,
            END_POINT.CLIENTS_LIST.END_POINT,
            END_POINT.CLIENTS_LIST.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            if(error){

                dispatch(ClientsDropActions.ClientsDropdownFailed({result, error}))
            }else{

                dispatch(ClientsDropActions.ClientsDropdownGot({result, error}))
            }
        }).catch(error=>dispatch(ClientsDropActions.ClientsDropdownFailed({result:{}, error:{}})))
    }

}

