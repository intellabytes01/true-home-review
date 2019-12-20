import { ACTIONS } from "../action-constants/Actions";

export const disclosureReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.DISCLOSURE.DISCLOSURE_GOT :{

            let { error, result } = action.payload

            let newState = {...{},...state}

            newState.list = result.data;
            newState.error = null;
            newState.loading = false;

            console.log("REDUCERS =============",error, result);

            return {...newState}
            
        }
        case ACTIONS.DISCLOSURE.DISCLOSURE_FAILED:{

            let { error, result } = action.payload

            let newState = {...{},...state}

            newState.error = null;
            newState.list = [];
            newState.loading = false;

            console.log("REDUCERS =============",error, result);
            
            return {...newState}
        }

        case ACTIONS.DISCLOSURE.DISCLOSURE_GETTING:{

            let { error, result } = action.payload

            console.log("REDUCERS =============",error, result);
            
            let newState = {...{},...state}

            newState.loading = true;
            newState.list = [];
            
            return {...newState}

        }

        default:{

            return {...state}
        }
    }
}