import { ACTIONS } from "../action-constants/Actions";

export const usersReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.USERS.USERS_GOT :{

            let { error, result } = action.payload

            let newState= {...{}, ...state}

            newState.list = result.data;
            newState.error = null;
            newState.loading  = false;
            newState.total = result.total

            return {...newState};
            
        }
        case ACTIONS.USERS.USERS_FAILED:{

            let { error, result } = action.payload

            let newState= {...{}, ...state}

            newState.list = []
            newState.error = null;
            newState.loading  = false;
            newState.total = 0;
            return {...newState};

        }

        case ACTIONS.USERS.USERS_GETTING:{

            let { error, result } = action.payload

            let newState= {...{}, ...state}

            newState.list = [];
            newState.error = null;
            newState.loading  = true;
            newState.total = 0
            return {...newState};

        }

        default:{

            return {...state}
        }
    }
}