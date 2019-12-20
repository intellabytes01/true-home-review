import { ACTIONS } from "../action-constants/Actions";

export const dashboardReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.DASHBOARD_REPORT.REPORT_GETTING:{
 

            return {...state};
        }
        case ACTIONS.DASHBOARD_REPORT.REPORT_GOT:{
            
            let newState = {...{},...state}

            // totalCommunities:null,
            // totalClients:null,
            // totalProperties:null,
            // totalCompletedJob:null,
            // totalScheduledJob:null
            newState.error = null;
            newState.report = { ...{}, ...newState.report, ...action.payload.result };

            return { ...newState }
        }

        case ACTIONS.DASHBOARD_REPORT.REPORT_FAILED:{

        }
        default :{
            
            // console.log(state);

            return state;
        }
    }

}