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


  public getUserByExtId = (extid: any) => {
    return this.axiosInstance.get(this.userManagmentBaseUrl + `externalid/${extid}`);
  }


  public getUserById = (id: any) => {
    return this.axiosInstance.get(this.userManagmentBaseUrl + `externalid/${id}`);
  }

  // public DeleteUserById = (requestData: any) => {
  //   return this.axiosInstance.post(this.userManagmentBaseUrl+'remove-user', requestData);
  // }

  public CreateUser = (requestData: any) => {
    // console.log("Create user",requestData);
    return this.axiosInstance.post(this.userManagmentBaseUrl, requestData);
  }

  // public UpdateUser = (requestData: any) => {
  //   // console.log("Update user",requestData);
  //   return this.axiosInstance.post(this.userManagmentBaseUrl+'Update-user', requestData);
  // }

  // public login = (requestData: any) => {
  //   return this.axiosInstance.post(this.userManagmentBaseUrl+'validate-by-user-password/', requestData);
  // }

  // public fetchProfile = (requestData: any) => {
  //   return this.axiosInstance.post(this.userManagmentBaseUrl+'get-list-of-users-by-criteria/', requestData);
  // }

  // public changePassword = (requestData: any) => {
  //   return this.axiosInstance.post(this.userManagmentBaseUrl+'self-update-user/', requestData);
  // }
  
}
