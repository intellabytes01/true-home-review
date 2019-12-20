import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { RoomItemActions } from "../actions/RoomItemActions";


export const GetRoomItems = ({form})=>{

    return (dispatch, getState)=>{

        dispatch(RoomItemActions.RoomItemGetting({result:{}, error:{}}))


        return _callApi(
            form,
            END_POINT.LISTDATA.END_POINT,
            END_POINT.LISTDATA.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            if(error){

                dispatch(RoomItemActions.RoomItemFailed({result, error}))


            }else{
                
                dispatch(RoomItemActions.RoomItemGot({result, error}))

            }
        })
    }

}