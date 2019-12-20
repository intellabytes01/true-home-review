import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { Formik, getIn, FieldArray, } from 'formik';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import { InputBox } from '../../formComponents';
import { VALIDATION_SCHEMA } from '../../../../constants/ValidationSchema';
import SearchableMultipleSelect from '../../formComponents/searchableSelect/SearchableMultipleSelect'



const EditNewClient = ({ response, builders, data, toggleEditClient, updateClient, editClient }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal isOpen={editClient} toggle={toggleEditClient} style={{ maxWidth: '700px' }}>
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="popup-wrapper">
                <ModalBody>
                    <div className="popup-header text-center">
                        <h2>Edit Client</h2>
                        <span style={response.isSuccess ? { color: "green" } : { color: "red" }} >{response.message}</span>
                    </div>
                    <div className="popup-body p-4">
                        <Formik

                            initialValues={
                                (data) ? { ...data } :
                                    {
                                        client: {
                                            companyName: null,
                                            street: null,
                                            city: null,
                                            state: null,
                                            zip: null,
                                        },

                                        manager: {
                                            firstName: null,
                                            lastName: null,
                                            title: null,
                                            phone: null,
                                            email: null
                                        },
                                        zones: [{
                                            zone: ""
                                        }],

                                        contacts: [{
                                            title: "",
                                            name: "",
                                            email: "",
                                            phone: "",
                                        }],
                                        users: [{
                                            firstName: "",
                                            lastName: "",
                                            title: "",
                                            phone: "",
                                            email: "",

                                        }],
                                        builders: []
                                    }}

                            onSubmit={updateClient}
                            validationSchema={VALIDATION_SCHEMA.CLIENT_ADD_UPDATE}
                            render={({ values, errors, handleSubmit, handleChange, handleBlur, setFieldValue, setFieldError, setFieldTouched, touched }) => (

                                <form onSubmit={handleSubmit}>

                                    <div className="pop-form-wrapper">
                                        <div className="row">
                                            <div className="col-md-12 pl-2 pr-2">
                                                <InputBox
                                                    formWrapClass="form-group"
                                                    labelClass="form-field-label"
                                                    labelText="Company Name"
                                                    type="text"

                                                    value={values.client.companyName}
                                                    name="client.companyName"
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    errorText={getIn(touched, `client.companyName`) && getIn(errors, `client.companyName`)}

                                                    inputClass="form-control"
                                                    errorClass="input-error-text" />
                                            </div>
                                            <div className="col-md-12 pl-2 pr-2">
                                                <InputBox
                                                    formWrapClass="form-group"
                                                    labelClass="form-field-label"
                                                    labelText="Street"
                                                    type="text"

                                                    value={values.client.street}
                                                    name="client.street"
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    errorText={getIn(touched, `client.street`) && getIn(errors, `client.street`)}

                                                    inputClass="form-control"
                                                    errorClass="input-error-text" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 pl-2 pr-2">
                                                <InputBox
                                                    formWrapClass="form-group"
                                                    labelClass="form-field-label"
                                                    labelText="City"
                                                    type="text"

                                                    value={values.client.city}
                                                    name="client.city"
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    errorText={getIn(touched, `client.city`) && getIn(errors, `client.city`)}

                                                    inputClass="form-control"
                                                    errorClass="input-error-text" />
                                            </div>
                                            <div className="col-md-3 pl-2 pr-2">
                                                <InputBox
                                                    formWrapClass="form-group"
                                                    labelClass="form-field-label"
                                                    labelText="State"
                                                    type="text"

                                                    value={values.client.state}
                                                    name="client.state"
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    errorText={getIn(touched, `client.state`) && getIn(errors, `client.state`)}

                                                    inputClass="form-control"
                                                    errorClass="input-error-text" />
                                            </div>
                                            <div className="col-md-3 pl-2 pr-2">
                                                <InputBox
                                                    formWrapClass="form-group"
                                                    labelClass="form-field-label"
                                                    labelText="Zip"
                                                    type="text"

                                                    value={values.client.zip}
                                                    name="client.zip"
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    errorText={getIn(touched, `client.zip`) && getIn(errors, `client.zip`)}

                                                    inputClass="form-control"
                                                    errorClass="input-error-text" />
                                            </div>
                                        </div>

                                        <FieldArray

                                            name="zones"
                                            render={arrayHelpers => (

                                                <div className="Zone-section">
                                                    <div className="row">
                                                        <div className="col-md-12 p-0">
                                                            <div className="pop-form-wrapper">
                                                                <div className="row margin-oposite">
                                                                    <div className="Add-more-field d-flex align-items-center border-bottom mb-2">
                                                                        <span
                                                                            onClick={
                                                                                (errors.zones) ?
                                                                                    null :
                                                                                    () => arrayHelpers.push({ zone: "" })}
                                                                            className="d-block icon-add cursor-pointer"></span>
                                                                        <span className="d-block add-more-title">Add Zone</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {values.zones && values.zones.length > 0 ?
                                                        values.zones.map((zone, index) => (
                                                            <div className="row"  >
                                                                <div className="col-md-4 pl-2 pr-2">
                                                                    <InputBox
                                                                        formWrapClass="form-group"
                                                                        labelClass="form-field-label"
                                                                        labelText="Zone Name"
                                                                        type="text"

                                                                        value={zone.zone}
                                                                        name={`zones[${index}].zone`}
                                                                        handleChange={handleChange}
                                                                        handleBlur={handleBlur}
                                                                        errorText={getIn(touched, `zones[${index}].zone`) && getIn(errors, `zones[${index}].zone`)}


                                                                        inputClass="form-control"
                                                                        errorClass="input-error-text" />
                                                                </div>
                                                                <div className="col-md-2  d-flex align-items-center ">
                                                                    <i onClick={() => arrayHelpers.remove(index)} className="material-icons cursor-pointer">remove_circle_outline</i>
                                                                </div>
                                                            </div>
                                                        )) : null}

                                                </div>)}

                                        />

                                        <div className="Manager-section">
                                            <div className="row">
                                                <div className="col-md-12 p-0">
                                                    <div className="pop-form-wrapper">
                                                        <div className="row margin-oposite">
                                                            <div className="Add-more-field d-flex align-items-center border-bottom mb-2">
                                                                <span className="d-block add-more-title pl-0">Manager Contact</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="row">
                                                <div className="col pl-2 pr-2">
                                                    <InputBox
                                                        formWrapClass="form-group"
                                                        labelClass="form-field-label"
                                                        labelText="First Name"
                                                        type="text"

                                                        value={values.manager.firstName}
                                                        name="manager.firstName"
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        errorText={getIn(touched, `manager.firstName`) && getIn(errors, `manager.firstName`)}



                                                        inputClass="form-control"
                                                        errorClass="input-error-text" />
                                                </div>

                                                <div className="col pl-2 pr-2">
                                                    <InputBox
                                                        formWrapClass="form-group"
                                                        labelClass="form-field-label"
                                                        labelText="Last Name"
                                                        type="text"

                                                        value={values.manager.lastName}
                                                        name="manager.lastName"
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        errorText={getIn(touched, `manager.lastName`) && getIn(errors, `manager.lastName`)}

                                                        inputClass="form-control"
                                                        errorClass="input-error-text" />
                                                </div>

                                                <div className="col pl-2 pr-2">
                                                    <InputBox
                                                        formWrapClass="form-group"
                                                        labelClass="form-field-label"
                                                        labelText="Title"
                                                        type="text"

                                                        value={values.manager.title}
                                                        name="manager.title"
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        errorText={getIn(touched, `manager.title`) && getIn(errors, `manager.title`)}

                                                        inputClass="form-control"
                                                        errorClass="input-error-text" />
                                                </div>
                                                <div className="col pl-2 pr-2">
                                                    <InputBox
                                                        formWrapClass="form-group"
                                                        labelClass="form-field-label"
                                                        labelText="Phone"
                                                        type="text"

                                                        value={values.manager.phone}
                                                        name="manager.phone"
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        errorText={getIn(touched, `manager.phone`) && getIn(errors, `manager.phone`)}

                                                        inputClass="form-control"
                                                        errorClass="input-error-text" />
                                                </div>
                                                <div className="col pl-2 pr-2">
                                                    <InputBox
                                                        formWrapClass="form-group"
                                                        labelClass="form-field-label"
                                                        labelText="Email"
                                                        type="text"

                                                        value={values.manager.email}
                                                        name="manager.email"
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        errorText={getIn(touched, `manager.email`) && getIn(errors, `manager.email`)}


                                                        inputClass="form-control"
                                                        errorClass="input-error-text" />
                                                </div>





                                            </div>
                                        </div>
                                        {/* <div className="Contact-List"> */}

                                        <FieldArray
                                            name="contacts"
                                            render={arrayHelpers => (
                                                <div className="Contact-List">
                                                    <div className="row">
                                                        <div className="col-md-12 pl-2 pr-2">
                                                            <div className="Add-more-field d-flex align-items-center border-bottom mb-2">
                                                                <span onClick={() =>
                                                                    (errors.contacts) ?
                                                                        null :
                                                                        arrayHelpers.push({
                                                                            title: "",
                                                                            name: "",
                                                                            email: "",
                                                                            phone: "",
                                                                        })} className="d-block icon-add cursor-pointer"></span>
                                                                <span className="d-block add-more-title">Contact List</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {values.contacts && values.contacts.length > 0 ?
                                                        values.contacts.map((contact, index) => (

                                                            <div className="row"  >
                                                                <div className="col-sm-11">
                                                                    <div className="row">
                                                                        <div className="col-md-3 pl-2 pr-2">
                                                                            <InputBox
                                                                                formWrapClass="form-group"
                                                                                labelClass="form-field-label"
                                                                                labelText="Name"
                                                                                type="text"

                                                                                value={contact.name}
                                                                                name={`contacts[${index}].name`}
                                                                                handleChange={handleChange}
                                                                                handleBlur={handleBlur}
                                                                                errorText={getIn(touched, `contacts[${index}].name`) && getIn(errors, `contacts[${index}].name`)}


                                                                                inputClass="form-control"
                                                                                errorClass="input-error-text" />
                                                                        </div>
                                                                        <div className="col-md-3 pl-2 pr-2">

                                                                            <InputBox
                                                                                formWrapClass="form-group"
                                                                                labelClass="form-field-label"
                                                                                labelText="Title"
                                                                                type="text"

                                                                                value={contact.title}
                                                                                name={`contacts[${index}].title`}
                                                                                handleChange={handleChange}
                                                                                handleBlur={handleBlur}
                                                                                errorText={getIn(touched, `contacts[${index}].title`) && getIn(errors, `contacts[${index}].title`)}

                                                                                inputClass="form-control"
                                                                                errorClass="input-error-text" />
                                                                        </div>
                                                                        <div className="col-md-3 pl-2 pr-2">
                                                                            <InputBox
                                                                                formWrapClass="form-group"
                                                                                labelClass="form-field-label"
                                                                                labelText="Phone"
                                                                                type="text"

                                                                                value={contact.phone}
                                                                                name={`contacts[${index}].phone`}
                                                                                handleChange={handleChange}
                                                                                handleBlur={handleBlur}
                                                                                errorText={getIn(touched, `contacts[${index}].phone`) && getIn(errors, `contacts[${index}].phone`)}


                                                                                inputClass="form-control"
                                                                                errorClass="input-error-text" />
                                                                        </div>
                                                                        <div className="col-md-3 pl-2 pr-2">
                                                                            <InputBox
                                                                                formWrapClass="form-group"
                                                                                labelClass="form-field-label"
                                                                                labelText="Email"
                                                                                type="text"

                                                                                value={contact.email}
                                                                                name={`contacts[${index}].email`}
                                                                                handleChange={handleChange}
                                                                                handleBlur={handleBlur}
                                                                                errorText={getIn(touched, `contacts[${index}].email`) && getIn(errors, `contacts[${index}].email`)}

                                                                                inputClass="form-control"
                                                                                errorClass="input-error-text" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-1 d-flex align-items-center ">
                                                                    <i onClick={() => arrayHelpers.remove(index)} className="material-icons cursor-pointer">remove_circle_outline</i>
                                                                </div>
                                                            </div>
                                                        )) : null}

                                                </div>
                                            )}
                                        />

                                        <FieldArray
                                            name="users"
                                            render={arrayHelpers => (
                                                <div className="Add-user">
                                                    <div className="row">
                                                        <div className="col-md-12 pl-2 pr-2">
                                                            <div className="Add-more-field d-flex align-items-center border-bottom mb-2">
                                                                <span onClick={() =>
                                                                    (errors.users) ?
                                                                        null :
                                                                        arrayHelpers.push({
                                                                            firstName: "",
                                                                            lastName: "",
                                                                            title: "",
                                                                            phone: "",
                                                                            email: "",
                                                                        })} className="d-block icon-add cursor-pointer"></span>
                                                                <span className="d-block add-more-title cursor-pointer">Add User</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {values.users && values.users.length > 0 ?
                                                        values.users.map((user, index) => (
                                                            <div className="row">
                                                                <div className="col-sm-11">
                                                                    <div className="row">
                                                                        <div className="col pl-2 pr-2">
                                                                            <InputBox
                                                                                formWrapClass="form-group"
                                                                                labelClass="form-field-label"
                                                                                labelText="First Name"
                                                                                type="text"

                                                                                value={user.firstName}
                                                                                name={`users[${index}].firstName`}
                                                                                handleChange={handleChange}
                                                                                handleBlur={handleBlur}
                                                                                errorText={getIn(touched, `users[${index}].firstName`) && getIn(errors, `users[${index}].firstName`)}

                                                                                inputClass="form-control"
                                                                                errorClass="input-error-text" />
                                                                        </div>
                                                                        <div className="col pl-2 pr-2">
                                                                            <InputBox
                                                                                formWrapClass="form-group"
                                                                                labelClass="form-field-label"
                                                                                labelText="Last Name"
                                                                                type="text"

                                                                                value={user.lastName}
                                                                                name={`users[${index}].lastName`}
                                                                                handleChange={handleChange}
                                                                                handleBlur={handleBlur}
                                                                                errorText={getIn(touched, `users[${index}].lastName`) && getIn(errors, `users[${index}].lastName`)}

                                                                                inputClass="form-control"
                                                                                errorClass="input-error-text" />
                                                                        </div>
                                                                        <div className="col pl-2 pr-2">
                                                                            <InputBox
                                                                                formWrapClass="form-group"
                                                                                labelClass="form-field-label"
                                                                                labelText="Title"
                                                                                type="text"

                                                                                value={user.title}
                                                                                name={`users[${index}].title`}
                                                                                handleChange={handleChange}
                                                                                handleBlur={handleBlur}
                                                                                errorText={getIn(touched, `users[${index}].title`) && getIn(errors, `users[${index}].title`)}

                                                                                inputClass="form-control"
                                                                                errorClass="input-error-text" />
                                                                        </div>
                                                                        <div className="col pl-2 pr-2">
                                                                            <InputBox
                                                                                formWrapClass="form-group"
                                                                                labelClass="form-field-label"
                                                                                labelText="Phone"
                                                                                type="text"

                                                                                value={user.phone}
                                                                                name={`users[${index}].phone`}
                                                                                handleChange={handleChange}
                                                                                handleBlur={handleBlur}
                                                                                errorText={getIn(touched, `users[${index}].phone`) && getIn(errors, `users[${index}].phone`)}

                                                                                inputClass="form-control"
                                                                                errorClass="input-error-text" />
                                                                        </div>

                                                                        <div className="col pl-2 pr-2">
                                                                            <InputBox
                                                                                formWrapClass="form-group"
                                                                                labelClass="form-field-label"
                                                                                labelText="Email"
                                                                                type="text"

                                                                                value={user.email}
                                                                                name={`users[${index}].email`}
                                                                                handleChange={handleChange}
                                                                                handleBlur={handleBlur}
                                                                                errorText={getIn(touched, `users[${index}].email`) && getIn(errors, `users[${index}].email`)}

                                                                                inputClass="form-control"
                                                                                errorClass="input-error-text" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-1 d-flex align-items-center">
                                                                    <i onClick={() => arrayHelpers.remove(index)} className="material-icons cursor-pointer">remove_circle_outline</i>
                                                                </div>

                                                            </div>)) : null}

                                                    
                                                        <div className="row margin-oposite">
                                                            <div className="Add-more-field d-flex align-items-center">
                                                                {/* <span className="d-block icon-add"></span>
                                <span  className="d-block add-more-title">Add Builder</span> */}
                                                                <SearchableMultipleSelect
                                                                    formWrapClass="form-group"
                                                                    labelClass="form-field-label"
                                                                    labelText="Builders"
                                                                    selectClass="select-box form-control"
                                                                    isMultiple={true}
                                                                    errorClass="input-error-text"

                                                                    name="builders"
                                                                    setFieldValue={setFieldValue}
                                                                    setFieldTouched={setFieldTouched}
                                                                    value={values.builders}
                                                                    errorText={getIn(touched, `builders`) && getIn(errors, `builders`)}

                                                                    placeholderText="Select builders"
                                                                    options={builders}
                                                                />
                                                            </div>
                                                        </div>
                                                    


                                                </div>)}
                                        />

                                    </div>
                                    <div className="pop-form-wrapper text-center mt-4">
                                        <ButtonPrimary type="submit" btntext="Save" className="button-primary" />
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </ModalBody>
            </div>
        </Modal>
    </div>
);

export default EditNewClient;