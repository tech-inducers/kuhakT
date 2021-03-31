import { axiosWebService } from "../config/axiosConfig";
export default class ProtocolService {

  private axiosInstance: any;
  private protocolManagmentBaseUrl: string = '/api/protocol';

  constructor() {
    this.axiosInstance = axiosWebService;  
  }

  public fetchProtocol = (requestData: any) => {
    return this.axiosInstance.get(this.protocolManagmentBaseUrl);
  }

  public createProtocol = (requestData: any) => {
    return this.axiosInstance.post(this.protocolManagmentBaseUrl, requestData);
  }
  
}
