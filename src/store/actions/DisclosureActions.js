import { ACTIONS } from "../action-constants/Actions";


const DisclosureReceived = ({result, error})=>{

    return {
                type:ACTIONS.DISCLOSURE.DISCLOSURE_GOT,
                payload:{result, error}
            }
}

const DisclosureReceiving = ({result, error})=>{

    return {
                type:ACTIONS.DISCLOSURE.DISCLOSURE_GETTING,
                payload:{result, error}
            }
}

const DisclosureFailed = ({result, error})=>{

    return {
                type:ACTIONS.DISCLOSURE.DISCLOSURE_FAILED,
                payload:{result, error}
            }
}

export const DisclosureActions = {DisclosureReceived, DisclosureReceiving, DisclosureFailed}