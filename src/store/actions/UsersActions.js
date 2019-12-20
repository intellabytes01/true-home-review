

import { ACTIONS } from "../action-constants/Actions";

const UsersGot = ({result, error})=>{

     return {
         type:  ACTIONS.USERS.USERS_GOT ,
         payload:{
             result,
             error
         }
     }
}

const UsersGetting = ({result, error})=>{

    return {
        type:  ACTIONS.USERS.USERS_GETTING ,
        payload:{
            result,
            error
        }
    }
}

const UsersFailed = ({result, error})=>{

    return {
        type:  ACTIONS.USERS.USERS_FAILED,
        payload:{
            result,
            error
        }
    }
}

export const UsersActions = {UsersGot, UsersGetting, UsersFailed}