import { ACTIONS } from "../action-constants/Actions";

const RoomItemGot = ({result, error})=>{

     return {
         type:  ACTIONS.ROOM_ITEMS.ROOM_ITEMS_GOT ,
         payload:{
             result,
             error
         }
     }
}

const RoomItemGetting = ({result, error})=>{

    return {
        type: ACTIONS.ROOM_ITEMS.ROOM_ITEMS_GETTING ,
        payload:{
            result,
            error
        }
    }
}

const RoomItemFailed = ({result, error})=>{

    return {
        type: ACTIONS.ROOM_ITEMS.ROOM_ITEMS_FAILED,
        payload:{
            result,
            error
        }
    }
}

export const RoomItemActions = {RoomItemGot, RoomItemGetting,RoomItemFailed }