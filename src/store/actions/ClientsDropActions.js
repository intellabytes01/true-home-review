

import { ACTIONS } from "../action-constants/Actions";

const ClientsDropdownGetting= ({result, error})=>{

     return {
         type:  ACTIONS.CLIENTS_DROPDOWN.CLIENTS_GETTING ,
         payload:{
             result,
             error
         }
     }
}

const ClientsDropdownGot= ({result, error})=>{

    return {
        type:  ACTIONS.CLIENTS_DROPDOWN.CLIENTS_GOT ,
        payload:{
            result,
            error
        }
    }
}

const ClientsDropdownFailed= ({result, error})=>{

    return {
        type: ACTIONS.CLIENTS_DROPDOWN.CLIENTS_FAILED ,
        payload:{
            result,
            error
        }
    }
}


export const ClientsDropActions = {ClientsDropdownGetting, ClientsDropdownGot, ClientsDropdownFailed}

