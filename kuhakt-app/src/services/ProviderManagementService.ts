import { axiosWebService } from "../config/axiosConfig";
export default class ProviderManagementService {

  private axiosInstance: any;
  private providerManagmentBaseUrl: string = '/api/provider';

  constructor() {
    this.axiosInstance = axiosWebService;  
  }

  public fetchProviders = () => {
    return this.axiosInstance.get(this.providerManagmentBaseUrl);
  }


  // public getUserByExtId = (extid: any) => {
  //   return this.axiosInstance.get(this.userManagmentBaseUrl + `externalid/${extid}`);
  // }


  // public getUserById = (id: any) => {
  //   return this.axiosInstance.get(this.userManagmentBaseUrl + `externalid/${id}`);
  // }

  // public CreateUser = (requestData: any) => {
  //   // console.log("Create user",requestData);
  //   return this.axiosInstance.post(this.userManagmentBaseUrl, requestData);
  // }  
}
