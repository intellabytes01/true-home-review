import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { TagActions } from "../actions/TagActions";


export const TagsAPI = ({form})=>{



    return (dispatch, getState)=>{

        dispatch(TagActions.TagListReceiving({result:{},error:{}}))


        return _callApi(
            form,
            END_POINT.LISTDATA.END_POINT,
            END_POINT.LISTDATA.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            console.log(result);
                if(error){

                    dispatch(TagActions.TagListFailed({result,error}))

                }else{

                    dispatch(TagActions.TagListReceived({result,error}))
                }
            
        })
    }

}