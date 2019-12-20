import { combineReducers } from 'redux';


import { loginReducer } from './login-reducer';
import { dashboardReducer } from './dashboardReducer';
import { dashGraphReducer } from './dashGraphReducer';
import { inpectionsReducer } from './inpectionsReducer';
import { clientsReducer } from './clientsReducer';
import {  neighborReducer } from './neighborReducer';
import { tagsReducer } from './tagsReducer';
import { buildersReducer } from './buildersReducer';
import { disclosureReducer } from './disclosureReducer';
import { genericResReducer } from './genericResReducer';
import { sectionRoomsReducer } from './sectionRoomsReducer';
import { roomItemsReducer } from './roomItemsReducer';
import { sectionsReducer } from './sectionsReducer';
import { usersReducer } from './usersReducer';


export const reducers = combineReducers({
                                login: loginReducer,
                                dashboard: dashboardReducer,
                                dashboardGraph:dashGraphReducer,
                                inspections:inpectionsReducer,
                                clients:clientsReducer,
                                neighborhoods:neighborReducer,
                                tags:tagsReducer,
                                builders:buildersReducer,
                                disclosures:disclosureReducer,
                                genericResponses:genericResReducer,
                                sectionRooms:sectionRoomsReducer,
                                roomItems:roomItemsReducer,
                                sections:sectionsReducer,
                                users:usersReducer
                            })