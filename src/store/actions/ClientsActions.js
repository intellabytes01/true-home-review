import { ACTIONS } from "../action-constants/Actions";


const GotClientData = ({result, error})=>{

    return {
        type:  ACTIONS.CLIENTS_DATA.CLIENTS_GOT,
        payload:{ result, error }
    }
}

const FailedClientData = ({result, error})=>{

    return {
        type:  ACTIONS.CLIENTS_DATA.CLIENTS_FAILED,
        payload:{ result, error }
    }
}

const GettingClientData = ({result, error})=>{

    return {
        type:  ACTIONS.CLIENTS_DATA.CLIENTS_GETTING,
        payload:{ result, error }
    }
}



export const ClientsActions = {
                                    GotClientData,
                                    FailedClientData,
                                    GettingClientData
                            }