import { axiosWebService } from "../config/axiosConfig";
export default class GatewayService {

  private axiosInstance: any;
  private gatewayManagmentBaseUrl: string = '/api/gateway';

  constructor() {
    this.axiosInstance = axiosWebService;  
  }

  public fetchGateway = (requestData: any) => {
    return this.axiosInstance.get(this.gatewayManagmentBaseUrl);
  }

  public createGateway = (requestData: any) => {
    return this.axiosInstance.post(this.gatewayManagmentBaseUrl, requestData);
  }

  public updateGateway = (requestData: any) => {
    return this.axiosInstance.post(this.gatewayManagmentBaseUrl+'/update', requestData);
  }
  
}
