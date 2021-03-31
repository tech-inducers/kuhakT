import { axiosWebService } from "../config/axiosConfig";
export default class DeviceService {

  private axiosInstance: any;
  private deviceManagmentBaseUrl: string = '/api/device';

  constructor() {
    this.axiosInstance = axiosWebService;  
  }

  public fetchDevices = (requestData: any) => {
    return this.axiosInstance.get(this.deviceManagmentBaseUrl);
  }

  public createDevice = (requestData: any) => {
    // console.log("Create user",requestData);
    return this.axiosInstance.post(this.deviceManagmentBaseUrl, requestData);
  }

  public updateDevice = (requestData: any) => {
    return this.axiosInstance.post(this.deviceManagmentBaseUrl+'/update', requestData);
  }
  
}
