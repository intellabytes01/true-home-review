import { ACTIONS } from "../action-constants/Actions";

export const inpectionsReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.INPECTION_JOBS.JOBS_GOT:{

            let newState = {...{}, ...state}

            let { result, error, total } = action.payload

            let tempTotal = total;
             result = result.map(item=>{

                 item.address = JSON.parse(item.address)
                 item.inspector = JSON.parse(item.inspector)
                 item.report = JSON.parse(item.report)

                 return item;
             })
            newState.jobs = result;
            newState.error = null;
            newState.loading = false;
            // console.log(total);
            
            // newState.total = Math.ceil(+tempTotal / 10);
            newState.total = +tempTotal 

            return newState;
        }
        case ACTIONS.INPECTION_JOBS.JOBS_GETTING:{
            let newState = {...{}, ...state}

            let { result, error,  } = action.payload

            newState.jobs = [];
            newState.error = null;
            newState.loading = true;
            newState.total = 0;

            return newState;
        }
        case ACTIONS.INPECTION_JOBS.JOBS_FAILED:{
            let newState = {...{}, ...state}

            let { result, error } = action.payload

            newState.jobs = [];
            newState.error = null;
            newState.loading = false;
            newState.total = 0;

            return newState;
        }
        case ACTIONS.INPECTION_JOB_DETAIL.JOB_DETAIL_GETTING:{

            let newState = {...{}, ...state}

            let { result, error } = action.payload

            newState.currentJob.data = null;
            newState.currentJob.error = null;
            newState.currentJob.loading = true;

            return newState;

        }
        case ACTIONS.INPECTION_JOB_DETAIL.JOB_DETAIL_GOT:{


            let newState = {...{}, ...state}

            let { result, error } = action.payload

            newState.currentJob.data = result;
            newState.currentJob.error = null;
            newState.currentJob.loading = false;
            return newState;
        }
        case ACTIONS.INPECTION_JOB_DETAIL.JOB_DETAIL_FAILED:{


            let newState = {...{}, ...state}

            let { result, error } = action.payload

            newState.currentJob.data = null;
            newState.currentJob.error = null;
            newState.currentJob.loading = false;
            return newState;
        }
        default:{

             return {...state}
        }
    }
}