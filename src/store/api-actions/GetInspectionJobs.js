import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { InspectJobsActions } from "../actions/InspectJobsAction";

export const GetInspectionJobs = (form)=>{

     return (dispatch, getState)=>{

        dispatch(InspectJobsActions.InspectJobsGetting({result:{},error:{}}))
         _callApi(
            form,
            END_POINT.INSPECTION_JOBS.END_POINT,
            END_POINT.INSPECTION_JOBS.POST).then(res=>{

                let { result= null, error = null } = res.data.payload

                let arr = [];
                let totalPage = 0;

                    if(error){

                        dispatch(InspectJobsActions.InspectJobsFailed({result,error}))

                    }else{
                        let total = Math.ceil(+result.total / 10);

                        arr = result.data
                        totalPage = total;
                        dispatch(InspectJobsActions.InspectJobsGot({result:result.data,total,error}))
                        
                    }
                 
            })
     }
}