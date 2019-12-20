import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { UsersActions } from "../actions/UsersActions";


export const GetUsers = ({form})=>{

    return (dispatch, getState)=>{

        dispatch(UsersActions.UsersGetting({result:{},error:{}}))
        return _callApi(
            form,
            END_POINT.LISTDATA.END_POINT,
            END_POINT.LISTDATA.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            if(error){

                dispatch(UsersActions.UsersFailed({result, error}))
            }else{

                dispatch(UsersActions.UsersGot({result, error}))
            }
        }).catch(error=>dispatch(UsersActions.UsersFailed({result:{}, error:{}})))
    }

}