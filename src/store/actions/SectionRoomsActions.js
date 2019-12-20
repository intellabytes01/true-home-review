import { ACTIONS } from "../action-constants/Actions";


const SectionRoomsGetting = ({result, error})=>{

    return {
        type: ACTIONS.SECTION_ROOMS.SECTION_ROOMS_GETTING ,
        payload:{
            result,
            error
        }
    }
}

const SectionRoomsGot = ({result, error})=>{

    return {
        type: ACTIONS.SECTION_ROOMS.SECTION_ROOMS_GOT  ,
        payload:{
            result,
            error
        }
    }
}

const SectionRoomsFailed = ({result, error})=>{

    return {
        type: ACTIONS.SECTION_ROOMS.SECTION_ROOMS_FAILED,
        payload:{
            result,
            error
        }
    }
}

export const SectionRoomsActions = {SectionRoomsFailed ,SectionRoomsGot ,SectionRoomsGetting }