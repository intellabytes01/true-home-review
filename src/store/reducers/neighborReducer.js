import { ACTIONS } from "../action-constants/Actions";

export const neighborReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.NEIGHBORHOODS.NEIGHBORHOODS_GOT :{

            let { error, result } = action.payload

            let newState= {...{}, ...state}
            console.log("REDUCERS =============",error, result);

            newState.list  = result.data
            newState.error = null

            newState.loading = false;
            return {...newState}

        }
        case ACTIONS.NEIGHBORHOODS.NEIGHBORHOODS_FAILED:{

            let { error, result } = action.payload

            let newState= {...{}, ...state}
            console.log("REDUCERS =============",error, result);

            newState.list  = []
            newState.error = null

            newState.loading = false;

            return {...newState}


        }

        case ACTIONS.NEIGHBORHOODS.NEIGHBORHOODS_GETTING:{

            let { error, result } = action.payload

            let newState= {...{}, ...state}
            console.log("REDUCERS =============",error, result);

            newState.list  = []
            newState.error = null

            newState.loading = true;
            return {...newState}

        }

        default:{

            return {...state}
        }
    }
}