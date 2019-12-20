
import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import {  NeighborActions } from "../actions/NeighborActions";


export const GetNeighborhoods = ({form})=>{

    
    
    return (dispatch, getState)=>{
        
        dispatch(NeighborActions.NeighborhoodsReceiving({result:{}, error:{}}))
        
        return _callApi(
            form,
            END_POINT.LISTDATA.END_POINT,
            END_POINT.LISTDATA.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            console.log(result);

            if(error){

                dispatch(NeighborActions.NeighborhoodsFailed({result, error}))


            }else{

                dispatch(NeighborActions.NeighborhoodsReceived({result, error}))
            }
            
        })
    }

}

