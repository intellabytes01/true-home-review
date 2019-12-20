import { ACTIONS } from "../action-constants/Actions";

const InspectJobsGetting = ({result, error})=>{

     return {
         type:  ACTIONS.INPECTION_JOBS.JOBS_GETTING ,
         payload:{
             result,
             error
         }
     }
}

const InspectJobsGot = ({result,total, error})=>{

    return {
        type: ACTIONS.INPECTION_JOBS.JOBS_GOT ,
        payload:{
            result,
            error,
            total
        }
    }
}

const InspectJobsFailed = ({result, error})=>{

    return {
        type: ACTIONS.INPECTION_JOBS.JOBS_FAILED  ,
        payload:{
            result,
            error
        }
    }
}

const InspJobDetailGetting=({result, error})=>{

    return {
        type:  ACTIONS.INPECTION_JOB_DETAIL.JOB_DETAIL_GETTING ,
        payload:{
            result,
            error
        }
    }
}

const InspJobDetailGot=({result, error})=>{

    return {
        type:  ACTIONS.INPECTION_JOB_DETAIL.JOB_DETAIL_GOT ,
        payload:{
            result,
            error
        }
    }
}

const InspJobDetailFailed=({result, error})=>{

    return {
        type:  ACTIONS.INPECTION_JOB_DETAIL.JOB_DETAIL_FAILED ,
        payload:{
            result,
            error
        }
    }
}


export const InspectJobsActions = {InspectJobsGetting, InspectJobsFailed, InspectJobsGot, InspJobDetailFailed, InspJobDetailGot, InspJobDetailGetting} 