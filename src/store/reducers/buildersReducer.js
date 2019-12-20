
import { ACTIONS } from "../action-constants/Actions";

export const buildersReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.BUILDERS.BUILDERS_GOT :{

            let { error, result } = action.payload

            console.log("REDUCERS =============",error, result);

            let newState = {...{}, ...state}

            newState.list = result.data;
            newState.error = null;
            newState.loading = false;

            return {...newState}
            
        }
        case ACTIONS.BUILDERS.BUILDERS_GETTING:{

            let { error, result } = action.payload

            console.log("REDUCERS =============",error, result);
            
            let newState = {...{}, ...state}
            newState.list = []
            newState.error = null
            newState.loading = true;


            return {...newState}
            
        }

        case ACTIONS.BUILDERS.BUILDERS_FAILED:{

            let { error, result } = action.payload

            console.log("REDUCERS =============",error, result);
            
            let newState = {...{}, ...state}
            newState.list = []
            newState.error = null
            newState.loading = false;


            return {...newState}
        }

        default:{

            return {...state}
        }
    }
}