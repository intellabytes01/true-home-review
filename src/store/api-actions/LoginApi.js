import _callApi from "../../services/baseService";
import { END_POINT } from "../../constants/ApiEndPoints";
// let UserLogin = require("../actions/UserLogin")
import { userLogin } from '../actions/UserLogin';

export const LoginApi = (form)=>{

    return (dispatch, getState)=>{

        dispatch(userLogin.UserLogging());

       return _callApi(
            form,
            END_POINT.Login.END_POINT,
            END_POINT.Login.POST).then(res=>{

                const { error= null, result=null } = res.data.payload;

                console.log(res);

                if(error){

                    dispatch(userLogin.UserLogInFail(error.message))

                    return res;
                }else{


                    localStorage.setItem("user", JSON.stringify( result));


                    dispatch(userLogin.UserLoggedIn(result))
                     
                    return res
                }
                
            })
    }
}