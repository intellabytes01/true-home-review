
import { ACTIONS } from "../action-constants/Actions";

const GenericResGot = ({result, error})=>{

     return {
         type: ACTIONS.GENERIC_RESPONSES.GENERIC_RESPONSES_GOT  ,
         payload:{
             result,
             error
         }
     }
}

const GenericResFailed = ({result, error})=>{

     return {
         type:ACTIONS.GENERIC_RESPONSES.GENERIC_RESPONSES_FAILED  ,
         payload:{
             result,
             error
         }
     }
}

const GenericResGetting = ({result, error})=>{

    return {
        type:ACTIONS.GENERIC_RESPONSES.GENERIC_RESPONSES_GETTING,
        payload:{
            result,
            error
        }
    }
}

export const GenericResActions = {GenericResGot, GenericResFailed, GenericResGetting};