import { ACTIONS } from "../action-constants/Actions";

export const sectionRoomsReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.SECTION_ROOMS.SECTION_ROOMS_GOT :{

            let { error, result } = action.payload

            let newState = {...{}, ...state}

            newState.list = result.data;
            newState.error = null;
            newState.loading = false;

            console.log("REDUCERS =============",error, result);
            
            return newState;
        }
        case ACTIONS.SECTION_ROOMS.SECTION_ROOMS_FAILED:{

            let { error, result } = action.payload

            let newState = {...{}, ...state}

            newState.list = [];
            newState.error = null;
            newState.loading = false;

            console.log("REDUCERS =============",error, result);
            
            return newState;

        }

        case ACTIONS.SECTION_ROOMS.SECTION_ROOMS_GETTING:{

            let { error, result } = action.payload

            let newState = {...{}, ...state}
            
            newState.loading = true;

            console.log("REDUCERS =============",error, result);
            
            return newState;

        }

        default:{

            return {...state}
        }
    }
}