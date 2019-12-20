import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg'
import { Formik } from 'formik';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { LoginApi } from '../../store/api-actions/LoginApi';
import { API_RES } from '../../constants/ApiResponse';


const mapStateToProps = (state) => ({
    detail: state.login.detail,
    error: state.login.error,
    isLogging: state.login.isLogging
})

const mapDispatchToProps = (dispatch) => ({ login: (form) => dispatch(LoginApi(form)) })

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            message: null
        }
    }

    componentWillMount() {

        let user = JSON.parse(localStorage.getItem("user"))

        if (user && user['token']) {

            // console.log(user)
            this.props.history.push("/main")
        }
    }

    redirectToDashboard = () => {

        this.props.history.push("/main")
    }

    handleLogin = (values, formikBag) => {


        const { email, password } = values;
        const { history } = this.props;
        // console.log(email, password);

        let form = new FormData()

        form.append('params[email]', email)
        form.append('params[password]', password)


        this.props.login(form).then(res => {

            let { error = null, result = null } = res.data.payload;

            formikBag.setSubmitting(false);

            if (error) {

                this.setState((preState) => {

                    return { error: true, message: error.message }
                })
            } else {

                this.setState((preState) => {

                    return { error: false, message: API_RES.LOGIN.SUCCESS }
                })

                setTimeout(() => {

                    this.setState((preState) => {

                        return { message: null }
                    })

                    history.push("/main/dashboard")


                }, 2000)
            }
        })
    }

    componentWillReceiveProps(nextProps) {

        let { error, isLogging } = nextProps

        if (error) {


        }
    }

    render() {
        return (
            <div className="login">
                <div className="row">
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={this.handleLogin}
                        render={({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

                            <form onSubmit={handleSubmit} >

                                <div className="col-md-4 mx-auto login-form position-absolute">
                                    <img src={logo} className="mb-5" alt="Truehome Review Logo" />
                                    <div className="row" >
                                        <div className="col-md-12">

                                            <span style={{ fontSize: "12px", color: this.state.error ? "red" : "white" }} >
                                                {this.state.message && this.state.message}
                                            </span>
                                        </div>
                                    </div>
                                    <label>Username</label>
                                    <input type="text" class="form-control mb-3" name="email" onChange={handleChange} required={true} autofocus="true" />
                                    <label>Password</label>
                                    <input type="password" class="form-control" name="password" onChange={handleChange} required={true} />
                                    <Link to="forgot-password"><small><i><a href="javascript:void(0)">Forgot Password ?</a></i></small></Link>

                                    <div className="common-save-btn mt-4 d-flex justify-content-center">
                                        <button class="btn btn-lg btn-primary btn-login d-flex justify-content-center" type="submit">

                                            {(isSubmitting) ?
                                                <ReactLoading
                                                    className="btn-loader"
                                                    type="spokes"
                                                    color="blue"
                                                    width={'25px'}
                                                    height={'25px'} /> :
                                                "Log In"}

                                        </button>
                                    </div>
                                    {/* <Link to="/external-dashboard" className="external-link d-block text-center"><i className="link"><u>LINK TO EXTERNAL USER DASHBOARD</u></i></Link> */}

                                </div>
                            </form>
                        )}

                    />
                </div>
            </div>
        )
    }
}
export default Login = connect(mapStateToProps, mapDispatchToProps)(Login);