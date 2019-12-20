import { ACTIONS } from "../action-constants/Actions";

export const clientsReducer = (state={}, action={})=>{

    switch(action.type){

        case ACTIONS.CLIENTS_DATA.CLIENTS_GOT :{

            let { error, result } = action.payload
            
            let newState = {...{},...state}

            console.log("REDUCERS =============",error, result, newState);

            newState.list = result.data
            newState.error = null
            newState.loading = false

            let tempTotal = result.total
            newState.total =  Math.ceil(+tempTotal/10)
            
            return {...newState}

        }
        case ACTIONS.CLIENTS_DATA.CLIENTS_FAILED:{

            let { error, result } = action.payload

            let newState = {...{},...state}

            newState.list = []
            newState.error = null
            newState.loading = false
            newState.total =0
            console.log("REDUCERS =============",error, result, newState);
            

            return {...newState}

        }

        case ACTIONS.CLIENTS_DATA.CLIENTS_GETTING:{

            let { error, result } = action.payload

            let newState = {...{},...state}

            newState.loading = true
            newState.list = []
            newState.error = null
            newState.total = 0
            console.log("REDUCERS =============",error, result, newState);
            

            return { ...newState}
        }

        default:{

            return {...state}
        }
    }
}