import { Moment } from 'moment';
import { PlatformProviderStatus } from 'app/shared/model/enumerations/platform-provider-status.model';

export interface IPlatformProvider {
  id?: number;
  providerId?: number;
  providerExtId?: number;
  providerName?: string;
  providerStatus?: PlatformProviderStatus;
  validUpto?: string;
  activatedOn?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const defaultValue: Readonly<IPlatformProvider> = {};
