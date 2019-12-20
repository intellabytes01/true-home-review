import { ACTIONS } from "../action-constants/Actions";

export const roomItemsReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.ROOM_ITEMS.ROOM_ITEMS_GOT :{

            let { error, result } = action.payload

            let newState= {...{}, ...state}
            console.log("REDUCERS =============",error, result);

            newState.list  = result.data
            newState.error = null
            newState.loading = false;

            return {...newState}
            
        }
        case ACTIONS.ROOM_ITEMS.ROOM_ITEMS_FAILED:{

            let { error, result } = action.payload

            let newState= {...{}, ...state}
            console.log("REDUCERS =============",error, result);

            newState.list  = []
            newState.error = null
            newState.loading = false;

            return {...newState}
            

        }

        case ACTIONS.ROOM_ITEMS.ROOM_ITEMS_GETTING:{

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