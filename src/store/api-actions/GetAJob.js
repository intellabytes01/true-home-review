import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { InspectJobsActions } from "../actions/InspectJobsAction";


export const GetAJob = ({form})=>{

    return (dispatch, getState)=>{

        dispatch(InspectJobsActions.InspJobDetailGetting({result:{},error:{}}))
        return _callApi(
            form,
            END_POINT.INSPECTION_JOB_DETAIL.END_POINT,
            END_POINT.INSPECTION_JOB_DETAIL.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            if(error){
                
                dispatch(InspectJobsActions.InspJobDetailFailed({result,error}))

            }else{

                dispatch(InspectJobsActions.InspJobDetailGot({result,error}))

            }
        })
    }

}