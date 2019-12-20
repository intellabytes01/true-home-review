import React from 'react';
import SelectBox from '../../../commonComponents/formComponents/selectBox/SelectBox';
import ButtonPrimary from '../../../commonComponents/buttons/ButtonPrimary';

// user control searchable select
const userControlOptions = [
    { value: 'Main Street Realty', text: 'Main Street Realty' },
    { value: 'Fountainhead Properties', text: 'Fountainhead Properties' },
    { value: 'Landmark Property Services', text: 'Landmark Property Services' }
]
const Usercontrol = ({ messages, sendEmailReminderToAll,sendEmailResponse, handleDropdownChange, options, settings, handleSettingsChange, sendEmailReminder }) => {


    return <>
    <div className="setting-wrapper">
        <div className="user-crud-section">
            <div className="mb-1">
                <SelectBox
                    selectclassName="wrapper-searchable transparent-select"
                    placeholderText="Change Client"
                    handleChange={handleDropdownChange}
                    options={options}
                    searchable={true}
                />
            </div>
            <div className="mb-1">
                <div style={{ height: '40px' }}>
                    <span style={(messages['enableEmailReminder']["isSuccess"]) ? { color: "green", display:'block' } : { color: "red",display:'block' }} >{messages['enableEmailReminder']['msg']}</span>
                    <span style={(messages['sendEmailMsg']["isSuccess"]) ? { color: "green", display:'block' } : { color: "red", display:'block' }} >{messages['sendEmailMsg']['msg']}</span>
                    <span style={ (sendEmailResponse["isSuccess"]) ? {color:"green", display:'block'} :{color:"red", display:'block'}} > {sendEmailResponse['msg']} </span>
                    {/* <span style={ (messages['emailReminder']["isSuccess"]) ? {color:"green"} :{color:"red"}} ></span> */}
                    {/* <span style={ (messages['emailReminder']["isSuccess"]) ? {color:"green"} :{color:"red"}} ></span> */}
                </div>
            </div>
        </div>
        <div className="panel user-crud-section">
            <div className="panel-header">
                <ul className="list-unstyled m-0 d-flex align-items-center">
                    <li>
                        <h2>Scoring</h2>
                    </li>
                </ul>
            </div>
            <div className="panel-body">
                <ul className="list-unstyled wrapper-hangle-setting">
                    <li className="d-flex align-items-center">
                        <span className="">Client may view details</span>
                        <span className="ml-auto">
                            <div className="form-group">
                                <input onClick={(event) => handleSettingsChange(event)} checked={settings.clientMayViewDetails} name="clientMayViewDetails" type="checkbox" id="react" />
                                <label htmlFor="react" className="m-0">
                                    <span className="selected-width">On</span>
                                    <span className="selected-width">Off</span>
                                </label>
                            </div>
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-space-between">
                        <span className="">Client may edit</span>
                        <span className="ml-auto">
                            <div className="form-group">
                                <input onClick={(event) => handleSettingsChange(event)} checked={settings.clientMayEdit} name="clientMayEdit" type="checkbox" id="css" />
                                <label htmlFor="css" className="m-0">
                                    <span className="selected-width">On</span>
                                    <span className="selected-width">Off</span>
                                </label>
                            </div>
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-space-between">
                        <span className="">Hide scoring from builders</span>
                        <span className="ml-auto">
                            <div className="form-group">
                                <input onClick={(event) => handleSettingsChange(event)} checked={settings.hideScoringFromBuilders} name="hideScoringFromBuilders" type="checkbox" id="html" />
                                <label htmlFor="html" className="m-0">
                                    <span className="selected-width">On</span>
                                    <span className="selected-width">Off</span>
                                </label>
                            </div>
                        </span>
                    </li>
                </ul>
            </div>
        </div>

        {/* email panel */}
        <div className="panel user-crud-section">
            <div className="panel-header">
                <ul className="list-unstyled m-0 d-flex align-items-center">
                    <li>
                        <h2>Email</h2>
                    </li>
                </ul>
            </div>
            <div className="panel-body">
                <ul className="list-unstyled wrapper-hangle-setting">
                    <li className="d-flex align-items-center">
                        <span className="">Automatically share results</span>
                        <span className="ml-auto">
                            <div className="form-group">
                                <input onClick={(event) => handleSettingsChange(event)} checked={settings.autoShareResults} name="autoShareResults" type="checkbox" id="Email_1" />
                                <label htmlFor="Email_1" className="m-0">
                                    <span className="selected-width">On</span>
                                    <span className="selected-width">Off</span>
                                </label>
                            </div>
                        </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-space-between">
                        <span className="">Automatically remind client</span>
                        <span className="ml-auto">
                            <div className="form-group">
                                <input onClick={(event) => handleSettingsChange(event)} checked={settings.autoRemindClient} name="autoRemindClient" type="checkbox" id="Email_2" />
                                <label htmlFor="Email_2" className="m-0">
                                    <span className="selected-width">On</span>
                                    <span className="selected-width">Off</span>
                                </label>
                            </div>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="">
            <span onClick={sendEmailReminder} className="button-primary d-flex justify-content-center pt-2">
                <span className="material-icons d-block pr-2">mail_outline</span>
                <span className="align-email">Email Reminders to {settings ? settings['companyName'] : ""}</span>
            </span>
        </div>
        </div>
        <div className="m-2 p-1">
       
            <span onClick={sendEmailReminderToAll} className="button-primary d-flex justify-content-center pt-2">
                <span className="material-icons d-block pr-2">mail_outline</span>
                <span className="align-email">Email Reminders to all builders</span>
            </span>
       
        </div>
    </>
}

export default Usercontrol;