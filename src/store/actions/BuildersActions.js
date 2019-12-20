import { ACTIONS } from "../action-constants/Actions";


const BuildersReceived = ({result, error})=>{

    return {
                type:ACTIONS.BUILDERS.BUILDERS_GOT,
                payload:{result, error}
            }
} 

const BuildersFailed = ({result, error})=>{

    return {
                type:ACTIONS.BUILDERS.BUILDERS_FAILED,
                payload:{result:[], error:error}
            }
} 

const BuildersReceiving = ({result, error})=>{

    return {
                type:ACTIONS.BUILDERS.BUILDERS_GETTING,
                payload:{result:[], error:error}
            }
} 

export const BuildersActions = {BuildersReceived,BuildersFailed, BuildersReceiving} 