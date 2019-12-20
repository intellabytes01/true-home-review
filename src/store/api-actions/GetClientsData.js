import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { ClientsActions } from "../actions/ClientsActions";


export const GetClientsData = (form)=>{

    return (dispatch, getState)=>{

        dispatch(ClientsActions.GettingClientData({}))

        return _callApi(
            form,
            END_POINT.CLIENTS_LIST.END_POINT,
            END_POINT.CLIENTS_LIST.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            console.log(error, result);

            if(error){
                dispatch(ClientsActions.FailedClientData({result, error}))
            }else{

                dispatch(ClientsActions.GotClientData({result, error}))
            }
        })
    }

}