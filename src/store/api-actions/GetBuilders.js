import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { BuildersActions } from "../actions/BuildersActions";

export const GetBuilders = ({form})=>{

    return (dispatch, getState)=>{

        dispatch(BuildersActions.BuildersReceiving({result:{},error:{}}))


        _callApi(
            form,
            END_POINT.LISTDATA.END_POINT,
            END_POINT.LISTDATA.POST
        ).then(res=>{
                
            let { result, error} = res.data.payload

            console.log(result, error);

            if(error){

                dispatch(BuildersActions.BuildersFailed({result,error}))


            }else{

                dispatch(BuildersActions.BuildersReceived({result,error}))
            }
            
    
        })

    }
}