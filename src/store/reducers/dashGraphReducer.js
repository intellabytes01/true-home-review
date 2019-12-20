import { ACTIONS } from "../action-constants/Actions";

 
export const dashGraphReducer = (state={}, action= {})=>{

    switch(action.type){

        case ACTIONS.DASHBOARD_GRAPH.GRAPH_GOT:{

            let newState = {...{},...state};
            let { result, error, filterType } = action.payload;

            newState.graph.data = result

            newState.graph.error = null;

            newState.graph.filterType = filterType;

            return newState;

        }

        default:{

            return {...state}
        }
    }

}