import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPlatformUser, defaultValue } from 'app/shared/model/platform-user.model';

export const ACTION_TYPES = {
  FETCH_PLATFORMUSER_LIST: 'platformUser/FETCH_PLATFORMUSER_LIST',
  FETCH_PLATFORMUSER: 'platformUser/FETCH_PLATFORMUSER',
  CREATE_PLATFORMUSER: 'platformUser/CREATE_PLATFORMUSER',
  UPDATE_PLATFORMUSER: 'platformUser/UPDATE_PLATFORMUSER',
  DELETE_PLATFORMUSER: 'platformUser/DELETE_PLATFORMUSER',
  RESET: 'platformUser/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlatformUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PlatformUserState = Readonly<typeof initialState>;

// Reducer

export default (state: PlatformUserState = initialState, action): PlatformUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLATFORMUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PLATFORMUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PLATFORMUSER):
    case REQUEST(ACTION_TYPES.UPDATE_PLATFORMUSER):
    case REQUEST(ACTION_TYPES.DELETE_PLATFORMUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PLATFORMUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLATFORMUSER):
    case FAILURE(ACTION_TYPES.CREATE_PLATFORMUSER):
    case FAILURE(ACTION_TYPES.UPDATE_PLATFORMUSER):
    case FAILURE(ACTION_TYPES.DELETE_PLATFORMUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLATFORMUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLATFORMUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLATFORMUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_PLATFORMUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLATFORMUSER):
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

const apiUrl = 'api/platform-users';

// Actions

export const getEntities: ICrudGetAllAction<IPlatformUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PLATFORMUSER_LIST,
  payload: axios.get<IPlatformUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPlatformUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLATFORMUSER,
    payload: axios.get<IPlatformUser>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPlatformUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PLATFORMUSER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPlatformUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLATFORMUSER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPlatformUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLATFORMUSER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
