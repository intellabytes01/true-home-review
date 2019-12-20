import { ACTIONS } from "../action-constants/Actions";

export const DashRepGraphAction =({result, error, filterType})=>{

    return {
        type: error ?  ACTIONS.DASHBOARD_GRAPH.GRAPH_FAILED : ACTIONS.DASHBOARD_GRAPH.GRAPH_GOT,
        payload:{
            result,
            error,
            filterType
        }
    }
}