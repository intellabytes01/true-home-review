import { ACTIONS } from "../action-constants/Actions";

export const tagsReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.TAG_LIST.TAG_GOT :{

            let { error, result } = action.payload

            let newState= {...{}, ...state}

            newState.list = result.data;
            newState.error = null;
            newState.loading  = false;

            return {...newState};
            
        }
        case ACTIONS.TAG_LIST.TAG_GETTING:{

            let { error, result } = action.payload

            let newState= {...{}, ...state}

            newState.list = [];
            newState.error = null;
            newState.loading  = true;

            return {...newState};

        }

        case ACTIONS.TAG_LIST.TAG_FAILED:{

            let { error, result } = action.payload

            let newState= {...{}, ...state}

            newState.list = [];
            newState.error = null;
            newState.loading  = false;

            return {...newState};

        }

        default:{

            return {...state}
        }
    }
}