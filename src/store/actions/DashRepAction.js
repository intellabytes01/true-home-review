import { ACTIONS } from "../action-constants/Actions";


export const DashRepAction =( error, result )=>{

   return {
       type: ACTIONS.DASHBOARD_REPORT.REPORT_GOT,
       payload:{
           error:error,
           result: result
       }
    }
}