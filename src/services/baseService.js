import axios from 'axios'


export default function _callApi(data, url, method,handleCancel, headerData){

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

        let header = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization":
            "Basic " +
            btoa(
                ""
            ),
            // "authToken": getJwtToken()
        };
        let  instance = axios.create({
                                baseURL:"",
                                headers:"Basic " +btoa(  "")
                            });

    let defaultSetting = { API_URL : '' };

    let result ;
// =========================================METHOD 1 = POST, METHOD 2 = GET=================================================================================//
    if(method === 1){

      result =  instance.post(defaultSetting.API_URL+url, data,{headers: header, cancelToken:source.token})
        .then(res=>{

            return res
        })
    }

    if(handleCancel){

        handleCancel(source)
    }

    return result;
}
