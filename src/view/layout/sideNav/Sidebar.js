import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';

class Sidebar extends Component {

    
    render() {
        let user = JSON.parse(localStorage.getItem("user"))

        return (
            <div className="left-side-bar  float-left">
                <img className="img-fluid p-3 w-100" src={logo} alt="Truehome Review Logo" />
                <ul className="list-unstyled">
                    <li>
                        <NavLink className="pt-3 pb-3 text-uppercase" to="/main/dashboard"><i className="icon-dashboard navigation-icon"></i>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={()=>{
                            localStorage.removeItem("incomp_page_no"); 
                            localStorage.removeItem("comp_page_no")
                            
                            }} className="pt-3 pb-3 text-uppercase" to="/main/inspections"><i className="icon-inspections navigation-icon"></i>Inspections</NavLink>
                    </li>
                    { user && +user["userType"]  === 1  ?
                    <>
                    <li>
                      <NavLink className="pt-3 pb-3 text-uppercase" to="/main/clients"><i className="icon-clients navigation-icon"></i>Clients</NavLink>
                    </li>
                    <li>
                        <NavLink className="pt-3 pb-3 text-uppercase" to="/main/manage-data"><i className="icon-communities navigation-icon"></i>Manage Data</NavLink>
                    </li>
                    <li>
                        <NavLink className="pt-3 pb-3 text-uppercase" to="/main/settings"><i className="icon-file navigation-icon"></i>Settings</NavLink>
                    </li>
                    </>
                    : null }
                    <li>
                        <a className="pt-3 pb-3 text-uppercase" href="javascript:void(0);" onClick={()=>{

                            localStorage.clear()
                            this.props.history.push('/login')
                        }} ><i className="fa fa-sign-out navigation-icon"></i>LOG OUT</a>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Sidebar = withRouter(Sidebar);