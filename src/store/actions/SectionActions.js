
import { ACTIONS } from "../action-constants/Actions";

const SectionGetting = ({result, error})=>{

     return {
         type:  ACTIONS.SECTIONS.SECTIONS_GETTING ,
         payload:{
             result,
             error
         }
     }
}

const SectionGot = ({result, error})=>{

    return {
        type:  ACTIONS.SECTIONS.SECTIONS_GOT ,
        payload:{
            result,
            error
        }
    }
}

const SectionFailed = ({result, error})=>{

    return {
        type:  ACTIONS.SECTIONS.SECTIONS_FAILED ,
        payload:{
            result,
            error
        }
    }
}

export const SectionActions = {SectionGetting, SectionGot, SectionFailed}


