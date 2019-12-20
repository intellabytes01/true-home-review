import { ACTIONS } from "../action-constants/Actions";

export const genericResReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.GENERIC_RESPONSES.GENERIC_RESPONSES_GOT :{

            let { error, result } = action.payload

            let newState = {...{}, ...state}

            newState.list = result.data;
            newState.error = null;
            newState.loading = false;

            console.log("REDUCERS =============",error, result);
            
            return newState;
        }
        case ACTIONS.GENERIC_RESPONSES.GENERIC_RESPONSES_FAILED:{

            let { error, result } = action.payload

            let newState = {...{}, ...state}

            newState.list = [];
            newState.error = null;
            newState.loading = false;

            console.log("REDUCERS =============",error, result);
            
            return newState

        }

        case ACTIONS.GENERIC_RESPONSES.GENERIC_RESPONSES_GETTING:{

            let { error, result } = action.payload

            let newState = {...{}, ...state}

            newState.list = [];
            newState.error = null;

            newState.loading = true;
            console.log("REDUCERS =============",error, result);
            
            return newState;
        }

        default:{

            return {...state}
        }
    }
}