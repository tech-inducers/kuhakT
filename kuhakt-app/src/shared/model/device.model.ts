import { Moment } from 'moment';
import { IPlatformUser } from 'app/shared/model/platform-user.model';
import { DeviceStatus } from 'app/shared/model/enumerations/device-status.model';

export interface IDevice {
  id?: number;
  deviceId?: number;
  deviceExtId?: number;
  deviceName?: string;
  status?: DeviceStatus;
  validUpto?: string;
  activatedOn?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: IPlatformUser;
}

export const defaultValue: Readonly<IDevice> = {};
