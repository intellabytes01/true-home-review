import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";


export const Data = ({form})=>{

    return (dispatch, getState)=>{

        return _callApi(
            form,
            END_POINT.CLIENTS_LIST.END_POINT,
            END_POINT.CLIENTS_LIST.POST
        ).then(res=>{

            let { error=null, result=null } = res.data.payload
        })
    }

}