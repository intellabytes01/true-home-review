import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { DashRepGraphAction } from "../actions/DashRepGraphAction";

export const GetExtDashboardGraph = (form)=>{

    return (dispatch, getState)=>{

         return _callApi(
              form,
              END_POINT.EXT_DASHBOARD_GRAPH.END_POINT,
              END_POINT.EXT_DASHBOARD_GRAPH.POST).then(res=>{

                 let { error, result, filterType } = res.data.payload;


                        dispatch(DashRepGraphAction({result,error, filterType}))
                   
                return res    
              })
    }
}