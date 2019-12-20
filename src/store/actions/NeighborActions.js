import { ACTIONS } from "../action-constants/Actions";


const NeighborhoodsReceived= ({result, error})=>{

    return {
        type:ACTIONS.NEIGHBORHOODS.NEIGHBORHOODS_GOT,
        payload:{result, error}
    }
}

const NeighborhoodsFailed= ({result, error})=>{

    return {
        type:ACTIONS.NEIGHBORHOODS.NEIGHBORHOODS_FAILED,
        payload:{result, error}
    }
}

const NeighborhoodsReceiving= ({result, error})=>{

    return {
        type:ACTIONS.NEIGHBORHOODS.NEIGHBORHOODS_GETTING,
        payload:{result, error}
    }
}

export const NeighborActions ={ NeighborhoodsReceived,  NeighborhoodsReceiving, NeighborhoodsFailed}