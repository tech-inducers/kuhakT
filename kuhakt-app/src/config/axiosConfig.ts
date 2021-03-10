import Axios from "axios";
import Toaster from '../utils/toaster';
import { SERVER_API_URL } from './constants';

const toaster = new Toaster();

const axiosWebService = Axios.create({
    baseURL: SERVER_API_URL
});

const isHandlerEnabled = (config:any = {}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
        false : true
}
const errorHandler = (error: any) => {
    if (isHandlerEnabled(error.config)) {
        // Handle errors
        console.log('error', error);
        if(error.response)
            console.log('error', error.response)

        let errorMsg = '';
        if(error.response &&  error.response &&  error.response.data && error.response.data.message){
            errorMsg = error.response.data.message;
        } else if(error.response &&  error.response &&  error.response.data && error.response.data.msg){
            errorMsg = error.response.data.msg;
        } else if(error.message){
            errorMsg = error.message;
        } else {
            errorMsg = 'Something Went Wrong, Try Again !!';
        }             
        toaster.openNotificationWithIcon('error', 'Web Service Error', errorMsg);
    }
    return Promise.reject( error )
}
const successHandler = (response: any) => {
    if (isHandlerEnabled(response.config)) {
        // Handle responses
        // console.log('response', response);
    }
    return response
}
// Add a response interceptor
axiosWebService.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
)

export {axiosWebService};

