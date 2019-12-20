import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducers } from './reducers';
import { createLogger } from 'redux-logger';

let initialState = 
                    {
                        login:{
                                details:{
                                    name:'',
                                    email:'',
                                    isDeleted:"",
                                    password:'',
                                    userID:'',
                                    timeCreated:null,
                                    timeUpdated:null,
                                    token:'',
                                    remember:false,
                                    userType:null
                                },  
                                error:null,
                                isLogging:null,
                            },
                            dashboard:{
                               
                                report:{
                                        totalCommunities:null,
                                        totalClients:null,
                                        totalProperties:null,
                                        totalCompletedJob:null,
                                        totalScheduledJob:null,
                                        upComingJobs:[],
                                        recentCompletedJobs:[],
                                    },
                                error:null
                            },
                            dashboardGraph:{
                                      
                                    graph:{
                                        data:[],
                                        filterType:"",
                                        error:null
                                    },
                                    error:null
                            },
                            inspections:{
                                jobs:[],
                                total:null,
                                error:null,
                                loading:null,
                                
                                currentJob:{
                                    loading:null,
                                    data:null
                                }
                            },
                            clients:{
                                list:[],
                                total:null,
                                error:null,
                                loading:false
                            },

                            neighborhoods:{
                                list:[],
                                error:null,
                                loading:null
                            },

                            tags:{
                                list:[],
                                error:null,
                                loading:null
                            },

                            builders:{
                                list:[],
                                error:null,
                                loading:null
                            },

                            disclosures:{
                                list:[],
                                error:null,
                                loading:null
                            },

                            genericResponses:{
                                list:[],
                                error:null,
                                loading:null
                            },

                            sectionRooms:{
                                list:[],
                                error:null,
                                loading:null
                            },

                            roomItems:{
                                list:[],
                                error:null,
                                loading:null
                            },

                            sections:{
                                list:[],
                                error:null,
                                loading:null
                            },
                            users:{
                                list:[],
                                error:null,
                                loading:null,
                                total:0
                            }
                        // forgotPassword: {
                        //     errors: {},
                        //     result:{}
                        // },
                    }

let logger = createLogger()

export const store = createStore(reducers, initialState, 
                                compose(applyMiddleware(
                                        thunkMiddleware, 
                                        logger), window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f) ) 