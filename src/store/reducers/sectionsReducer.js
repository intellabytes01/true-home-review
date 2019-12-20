import { ACTIONS } from "../action-constants/Actions";

export const sectionsReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.SECTIONS.SECTIONS_GOT :{

            let { error, result } = action.payload

            let newState = {...{}, ...state}

            newState.list = result.data;
            newState.error = null;
            newState.loading = false;
            
            return newState;
            
        }
        case ACTIONS.SECTIONS.SECTIONS_GETTING:{

            let { error, result } = action.payload

            let newState = {...{}, ...state}

            newState.list = [];
            newState.error = null;
            newState.loading = true;

            return newState;
        }

        case ACTIONS.SECTIONS.SECTIONS_FAILED:{

            let { error, result } = action.payload

            let newState = {...{}, ...state}

            newState.list = [];
            newState.error = null;
            newState.loading = false;
            
            return newState;
        }

        default:{

            return {...state}
        }
    }
}