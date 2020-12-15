import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPlatformProvider, defaultValue } from 'app/shared/model/platform-provider.model';

export const ACTION_TYPES = {
  FETCH_PLATFORMPROVIDER_LIST: 'platformProvider/FETCH_PLATFORMPROVIDER_LIST',
  FETCH_PLATFORMPROVIDER: 'platformProvider/FETCH_PLATFORMPROVIDER',
  CREATE_PLATFORMPROVIDER: 'platformProvider/CREATE_PLATFORMPROVIDER',
  UPDATE_PLATFORMPROVIDER: 'platformProvider/UPDATE_PLATFORMPROVIDER',
  DELETE_PLATFORMPROVIDER: 'platformProvider/DELETE_PLATFORMPROVIDER',
  RESET: 'platformProvider/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlatformProvider>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PlatformProviderState = Readonly<typeof initialState>;

// Reducer

export default (state: PlatformProviderState = initialState, action): PlatformProviderState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLATFORMPROVIDER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PLATFORMPROVIDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PLATFORMPROVIDER):
    case REQUEST(ACTION_TYPES.UPDATE_PLATFORMPROVIDER):
    case REQUEST(ACTION_TYPES.DELETE_PLATFORMPROVIDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PLATFORMPROVIDER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLATFORMPROVIDER):
    case FAILURE(ACTION_TYPES.CREATE_PLATFORMPROVIDER):
    case FAILURE(ACTION_TYPES.UPDATE_PLATFORMPROVIDER):
    case FAILURE(ACTION_TYPES.DELETE_PLATFORMPROVIDER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLATFORMPROVIDER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLATFORMPROVIDER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLATFORMPROVIDER):
    case SUCCESS(ACTION_TYPES.UPDATE_PLATFORMPROVIDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLATFORMPROVIDER):
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

const apiUrl = 'api/platform-providers';

// Actions

export const getEntities: ICrudGetAllAction<IPlatformProvider> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PLATFORMPROVIDER_LIST,
  payload: axios.get<IPlatformProvider>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPlatformProvider> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLATFORMPROVIDER,
    payload: axios.get<IPlatformProvider>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPlatformProvider> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PLATFORMPROVIDER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPlatformProvider> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLATFORMPROVIDER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPlatformProvider> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLATFORMPROVIDER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
