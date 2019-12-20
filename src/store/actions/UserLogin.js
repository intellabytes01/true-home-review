import { ACTIONS } from "../action-constants/Actions";


const UserLogging = ()=>{

    return {
        type:ACTIONS.USER_LOGIN.USER_LOGGING,
        payload: {isLogging:true}
    }
}

const UserLoggedIn = (result)=>{

    return {
        type:ACTIONS.USER_LOGIN.USER_LOGGEDIN,
        payload: {isLogging:false, result}
    }
}


const UserLogInFail = (error)=>{

    return {
        type:ACTIONS.USER_LOGIN.USER_FAIL_LOGIN,
        payload: {isLogging:false, error:error}
    }
}

export const userLogin = {
    UserLogging,
    UserLoggedIn,
    UserLogInFail,
}