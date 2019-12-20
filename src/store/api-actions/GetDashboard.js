import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { DashRepAction } from "../actions/DashRepAction";


export const GetDashboard = (form) =>{

    return (dispatch, getState)=>{


        return _callApi(
                    form,
                    END_POINT.DASHBOARD.END_POINT,
                    END_POINT.DASHBOARD.POST
                    ).then(res=>{
            
                        let { result=null, error=null } = res.data.payload;

                        if(res.status === 200 && !error){

                            // console.log(res);

                            dispatch(DashRepAction(error, result))
                        }
                        
                    })

    } 
}