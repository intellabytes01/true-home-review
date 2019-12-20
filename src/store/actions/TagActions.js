import { ACTIONS } from "../action-constants/Actions";

const TagListReceived = ({result, error})=>{

     return {
         type: ACTIONS.TAG_LIST.TAG_GOT  ,
         payload:{
             result,
             error
         }
     }
}

const TagListReceiving = ({result, error})=>{

    return {
        type: ACTIONS.TAG_LIST.TAG_GETTING,
        payload:{
            result,
            error
        }
    }
}

const TagListFailed = ({result, error})=>{

    return {
        type: ACTIONS.TAG_LIST.TAG_FAILED,
        payload:{
            result,
            error
        }
    }
}

export const TagActions ={TagListReceived, TagListReceiving, TagListFailed}