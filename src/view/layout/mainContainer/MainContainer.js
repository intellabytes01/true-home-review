import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../../routes';
import Sidebar from '../sideNav/Sidebar';
// import DefaultLayout from '../defaultLayout/DefaultLayout';

export default function MainContainer({ match, history }) {

    let user = JSON.parse(localStorage.getItem("user"))

            if(!user || !user.token){

              return <Redirect from="/main" to="/login" />
            }


    // console.log(typeof  +user["userType"])
    return (

        <>
            <div className="main-container clearfix">
                <Sidebar />
                <div className="switch-content container-fluid float-right">
                    <Switch>
                        {routes.map((route, idx) => {


                            if(+user["userType"] === 1){
                                
                                
                                return route.exact  ? <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    component={route.component}
                                />
                                    : <Route
                                        key={idx}
                                        path={`${match.path}` + route.path}
                                        // exact={route.exact}
                                        // strict={true}
                                        name={route.name}
                                        component={route.component}
                                    />
                            }else{

                                if (route.path ==='/dashboard' || route.path === '/inspections'){
                                    
                                   
                                   return <Route
                                        key={idx}
                                        path={`${match.path}` + route.path}
                                        // exact={route.exact}
                                        name={route.name}
                                        component={route.component}
                                    />
                                }else{
                                    return null
                                } 
                            }

                        })}

                        <Redirect from="*" to="/404" />
                    </Switch>
                </div>
                {/* main container ends here */}
            </div>
        </>
    )

}

