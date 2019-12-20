import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg'
import { Formik } from 'formik';
import _callApi from '../../services/baseService';


class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            // errors: {},
            message: null,
            isError: false
        }
    }

    handleSubmit(values, formikBeg) {
        formikBeg.setSubmitting(true)

        this.setState({ message: "" })
        let { email } = values

        let form = new FormData();
        form.append("params[email]", email)

        _callApi(form,
            "forgotPassword.json",
            1).then((res) => {

                let { error, result } = res.data.payload

                if (error) {


                    formikBeg.setSubmitting(false)
                    this.setState({ message: error.message, isError: true })

                    formikBeg.setSubmitting(false)

                }
                else {

                    this.setState({ message: "Password reset instructions have been sent to your email.", isError: false })

                    formikBeg.setSubmitting(false)

                }

                setTimeout(()=>{

                    let message = ""
                    let isError = false;
                    this.setState({message,isError})
                },2000)

            })

    }

    render() {
        return (
            <div className="login">
                <div className="row">




                    <div className="col-md-4 mx-auto login-form position-absolute">
                        <img src={logo} className="mb-5" alt="Truehome Review Logo" />
                        <div className="mt-3 mb-3">
                            <h3 className="text-center text-light">Forgot Password?</h3>
                        </div>
                        <div className="row" >
                            <div className="col-md-12">

                                <span style={{ fontSize: "12px", color: this.state.isError ? "red" : "white" }} >
                                    {this.state.message ? this.state.message : null}
                                </span>
                            </div>
                        </div>

                        <Formik
                            initialValues={{ email: "" }}
                            onSubmit={this.handleSubmit}
                            render={({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

                                <form onSubmit={handleSubmit} >
                                    <label>Enter your email</label>
                                    <input
                                        type="email"
                                        class="form-control mb-3"
                                        placeholder="Enter email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        autofocus="true" />
                                    <button disabled={isSubmitting} class="btn btn-lg btn-primary btn-login mx-auto" type="submit">
                                        Reset Password
                                </button>

                                </form>)}
                        />
                    </div>


                </div>
            </div>
        )
    }
}

export default ForgotPassword;