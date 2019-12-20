import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
import { SectionActions } from "../actions/SectionActions";


export const GetSections = ({form})=>{

    return (dispatch, getState)=>{
        
        dispatch(SectionActions.SectionGetting({result:{},error:{}}))
        return _callApi(
            form,
            END_POINT.LISTDATA.END_POINT,
            END_POINT.LISTDATA.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload

            if(error){

                dispatch(SectionActions.SectionFailed({result, error}))
            }else{

                dispatch(SectionActions.SectionGot({result, error}))
            }
        })
    }

}