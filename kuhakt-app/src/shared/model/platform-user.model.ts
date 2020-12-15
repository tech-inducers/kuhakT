import { Moment } from 'moment';
import { IPlatformProvider } from 'app/shared/model/platform-provider.model';
import { PlatformUserStatus } from 'app/shared/model/enumerations/platform-user-status.model';

export interface IPlatformUser {
  id?: number;
  userId?: number;
  userExtId?: number;
  userName?: string;
  status?: PlatformUserStatus;
  validUpto?: string;
  activatedOn?: string;
  createdAt?: string;
  updatedAt?: string;
  provider?: IPlatformProvider;
}

export const defaultValue: Readonly<IPlatformUser> = {};
