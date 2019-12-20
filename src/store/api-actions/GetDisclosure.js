import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { DisclosureActions } from "../actions/DisclosureActions";
import { ACTIONS } from "../action-constants/Actions";


export const GetDisclosure = ({form})=>{

    return (dispatch, getState)=>{

        dispatch(DisclosureActions.DisclosureReceiving({result:[],error:null}))
        return _callApi(
            form,
            END_POINT.LISTDATA.END_POINT,
            END_POINT.LISTDATA.POST,
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            if(error){

                dispatch(DisclosureActions.DisclosureFailed({result,error}));

            }else{

                console.log(result);

                dispatch(DisclosureActions.DisclosureReceived({result,error}));
            }
            
        })
    }

}