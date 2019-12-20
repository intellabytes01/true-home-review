import { ACTIONS } from "../action-constants/Actions";

export const Reducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.CLIENTS_DATA.CLIENTS_GOT :{

            let { error, result } = action.payload

            console.log("REDUCERS =============",error, result);
            
        }
        case ACTIONS.CLIENTS_DATA.CLIENTS_FAILED:{

            let { error, result } = action.payload

            console.log("REDUCERS =============",error, result);
            

        }

        case ACTIONS.CLIENTS_DATA.CLIENTS_GETTING:{

            let { error, result } = action.payload

            console.log("REDUCERS =============",error, result);
            

        }

        default:{

            return {...state}
        }
    }
}