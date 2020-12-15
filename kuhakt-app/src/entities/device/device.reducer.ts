import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDevice, defaultValue } from 'app/shared/model/device.model';

export const ACTION_TYPES = {
  FETCH_DEVICE_LIST: 'device/FETCH_DEVICE_LIST',
  FETCH_DEVICE: 'device/FETCH_DEVICE',
  CREATE_DEVICE: 'device/CREATE_DEVICE',
  UPDATE_DEVICE: 'device/UPDATE_DEVICE',
  DELETE_DEVICE: 'device/DELETE_DEVICE',
  RESET: 'device/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDevice>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type DeviceState = Readonly<typeof initialState>;

// Reducer

export default (state: DeviceState = initialState, action): DeviceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DEVICE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEVICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DEVICE):
    case REQUEST(ACTION_TYPES.UPDATE_DEVICE):
    case REQUEST(ACTION_TYPES.DELETE_DEVICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DEVICE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEVICE):
    case FAILURE(ACTION_TYPES.CREATE_DEVICE):
    case FAILURE(ACTION_TYPES.UPDATE_DEVICE):
    case FAILURE(ACTION_TYPES.DELETE_DEVICE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEVICE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEVICE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DEVICE):
    case SUCCESS(ACTION_TYPES.UPDATE_DEVICE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DEVICE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/devices';

// Actions

export const getEntities: ICrudGetAllAction<IDevice> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DEVICE_LIST,
  payload: axios.get<IDevice>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IDevice> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DEVICE,
    payload: axios.get<IDevice>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDevice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DEVICE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDevice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEVICE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDevice> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DEVICE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
