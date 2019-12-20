import { ACTIONS } from "../action-constants/Actions";


export const loginReducer= (state={},action={})=>{

    switch(action.type){

        case ACTIONS.USER_LOGIN.USER_LOGGING:{

            let newState = {...{},...state}
            let { remember, isLogging, ...rest } = action.payload

            newState.remember = remember;
            newState.isLogging = isLogging

            
            return {...newState};
        }

        case ACTIONS.USER_LOGIN.USER_LOGGEDIN:{

            let { isLogging, result } = action.payload;

            // console.log(action.payload);
            
            let newState = {...{}, ...state}

            newState.isLogging = isLogging;
            newState.error = null;
            newState.details =   { ...{}, ...newState.details, ...result.user, ...{ token: result.token}} 
            
            return {...newState};

        }
        case ACTIONS.USER_LOGIN.USER_FAIL_LOGIN:{

            let { isLogging, error } = action.payload

            let newState = {...{}, ...state}
            
            newState.isLogging =  isLogging;
            newState.error = error;

            return {...newState};
            
        }
        default :{
            
            // console.log(state);

            return state;
        }
    }
} 