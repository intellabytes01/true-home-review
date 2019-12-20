import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { GenericResActions } from "../actions/GenericResActions";


export const GetGenericRes = ({form})=>{

    return (dispatch, getState)=>{

        dispatch(GenericResActions.GenericResGetting({error:{},result:{}}))


        return _callApi(
            form,
            END_POINT.LISTDATA.END_POINT,
            END_POINT.LISTDATA.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            if(error){

                dispatch(GenericResActions.GenericResFailed({error,result}))
            }else{

                dispatch(GenericResActions.GenericResGot({error,result}))

            }
        })
    }

}