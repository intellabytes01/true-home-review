import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg'
import _callApi from '../../services/baseService';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { VALIDATE } from '../../constants/ValidationConst';
import { END_POINT } from '../../constants/ApiEndPoints';


class PasswordRecovery extends Component {

    constructor(props) {

        super(props)
        this.state = {
            email: "",
            activationKey: "",
            error: {}
        }

    }

    componentWillMount() {

        let { params } = this.props.match

        let { history } = this.props
        if (params.email && params.activationKey) {

            this.setState({ email: params.email, activationKey: params.activationKey })
        }
        else {

            history.push("/login")
        }
    }

    handleReset=(values, formikBeg)=> {

        formikBeg.setSubmitting(true)
        this.setState({ error: {} })

        let { password } = values

        let form = new FormData()

        form.append("params[email]", this.state.email)
        form.append("params[activationKey]", this.state.activationKey)
        form.append("params[password]", password)
        _callApi(form, 
            END_POINT.RECOVER_PASSWORD.END_POINT, 
            END_POINT.RECOVER_PASSWORD.POST).then(res => {

            let { result = null, error = null } = res.data.payload

            let { history } = this.props

            if (!error) {
                formikBeg.setSubmitting(false)
                this.setState({ error: error })

                localStorage.clear()
                history.push("/login")
            }
            else {
                formikBeg.setSubmitting(false)
                this.setState({ error: error })
            }
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

                                <span style={{ fontSize: "12px", color: "red" }} >
                                    {this.state.error && this.state.error.fileName}</span>
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                password: "",
                                confirmPass: ""
                            }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string().required(VALIDATE.PASS_REQ).min(6, VALIDATE.PASS_MIN).max(255, VALIDATE.PASS_MAX),
                                confirmPass: Yup.string().required(VALIDATE.PASS_CONFIRM)
                            })}
                            validate={({ password, confirmPass }) => {

                                let errors = {}

                                if (password !== confirmPass) {
                                    errors.confirmPass = VALIDATE.PASS_MATCH
                                }
                                return errors
                            }}
                            validateOnBlur={true}
                            onSubmit={this.handleReset}
                            render={({ values, handleSubmit, handleBlur, handleChange, errors, touched, isSubmitting }) => (
                                <form onSubmit={handleSubmit}>

                                <div className="row">

                                    <label>Password</label>
                                    <input 
                                    type="password" 
                                    class="form-control mb-3" 
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password} 
                                    autofocus="true" />
                                    <span style={{ fontSize: "12px", color: "red" }} >{touched.password && errors.password}</span>
                                </div>
                                <div className="row">

                                    <label>Confirm Password</label>
                                    <input 
                                    type="password" 
                                    value={values.confirmPass}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    class="form-control" 
                                    name="confirmPass" />
                                    <span style={{ fontSize: "12px", color: "red" }} >{touched.confirmPass && errors.confirmPass}</span>
                                </div>
                                    <button disabled={isSubmitting} class="btn btn-lg btn-primary btn-login mx-auto" type="submit">
                                        Change Password
                                    </button>
                                </form>)}
                        />
                    </div>

                </div>
            </div>
        )
    }
}

export default PasswordRecovery;