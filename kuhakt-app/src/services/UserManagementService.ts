import { axiosWebService } from "../config/axiosConfig";
export default class UserService {

  private axiosInstance: any;
  private userManagmentBaseUrl: string = '/api/user';

  constructor() {
    this.axiosInstance = axiosWebService;  
  }

  public fetchUsers = (requestData: any) => {
    return this.axiosInstance.get(this.userManagmentBaseUrl);
  }

  public createUser = (requestData: any) => {
    // console.log("Create user",requestData);
    return this.axiosInstance.post(this.userManagmentBaseUrl, requestData);
  }

  public updateUser = (requestData: any) => {
    return this.axiosInstance.post(this.userManagmentBaseUrl+'/update', requestData);
  }
  
}
