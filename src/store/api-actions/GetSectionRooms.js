import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { SectionRoomsActions } from "../actions/SectionRoomsActions";


export const GetSectionRooms = ({form})=>{

    return (dispatch, getState)=>{

        dispatch(SectionRoomsActions.SectionRoomsGetting({result:{},error:{}}))


        return _callApi(
            form,
            END_POINT.LISTDATA.END_POINT,
            END_POINT.LISTDATA.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            if(error){

                dispatch(SectionRoomsActions.SectionRoomsFailed({result,error}))
            }else{

                console.log(result, error);
                
                dispatch(SectionRoomsActions.SectionRoomsGot({result,error}))

            }
        })
    }

}