import { ACTIONS } from "../action-constants/Actions";

const Action = ({result, error})=>{

     return {
         type: error? ACTIONS.INPECTION_JOBS.JOBS_FAILED : ACTIONS.INPECTION_JOBS.JOBS_GOT ,
         payload:{
             result,
             error
         }
     }
}


export const Actions = {Action}