import *  as actionTypes from './actionTypes';

export const login = (data: any) => (dispatch: Function) => {
        window.localStorage.setItem("authenticated", 'true');
        dispatch(loadUserName(data.username, data.uId, data.isAuthenticated));
}
export const logout = () => (dispatch: Function) => {
        window.localStorage.setItem("authenticated", 'flase');
        dispatch({
                type: actionTypes.LOGOUT,
        });
};

export const startLoadPagePermission = (data: string[]) => (dispatch: Function) => {
        dispatch(loadPagePermission(data));
}
export const startLoadActionPermission = (data: string[]) => (dispatch: Function) => {
        dispatch(loadActionPermission(data));
}
export const startLoadNodeTypePermission = (data: string[]) => (dispatch: Function) => {
        dispatch(loadNodeTypePermission(data));
}


export const loadPagePermission = (pagePermissions: string[]) => ({
        type: actionTypes.LOADING_ASSIGNED_PAGE_PERMISSION,
        pagePermissions
});

export const loadActionPermission = (actionPermissions: string[]) => ({
        type: actionTypes.LOADING_ASSIGNED_ACTION_PERMISSION,
        actionPermissions
});

export const loadNodeTypePermission = (nodeTypePermissions: string[]) => ({
        type: actionTypes.LOADING_ASSIGNED_NODE_TYPE_PERMISSION,
        nodeTypePermissions
});

export const loadUserName = (username: string, uId: string, isAuthenticated:boolean) => ({
        type: actionTypes.LOAD_USERNAME,
        username,
        uId,
        isAuthenticated
});

