import * as actionTypes from "../actions/actionTypes";
const initialState: any = {
    pagePermissions: [],
    actionPermissions: [],
    nodeTypePermissions: [],
    isAuthenticated: false
}


const createActionPermissionPageWise = (state: any, action: any) => {
    let actionPermissions: any = {};
    action.actionPermissions.forEach((element: any) => {
        let pageName = element.split("-")[0];
        let actionName = element.split("-")[1];
        if(actionPermissions[pageName]){
            actionPermissions[pageName].push(actionName);
        } else{
            actionPermissions[pageName] = [actionName];
        }
    });
    return {
            ...state,
            actionPermissions
    };
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.LOAD_USERNAME:
            return {
                ...state,
                username : action.username,
                uId : action.uId,
                isAuthenticated : action.isAuthenticated
            }
        case actionTypes.LOGOUT:
            return {
                ...initialState
            }
        case actionTypes.LOADING_ASSIGNED_PAGE_PERMISSION:
            return {
                ...state,
                pagePermissions : action.pagePermissions
            }
        case actionTypes.LOADING_ASSIGNED_ACTION_PERMISSION:
            return createActionPermissionPageWise(state, action);
            // return {
            //     ...state,
            //     actionPermissions : action.actionPermissions
            // }
        case actionTypes.LOADING_ASSIGNED_NODE_TYPE_PERMISSION:
            return {
                ...state,
                nodeTypePermissions : action.nodeTypePermissions
            }
        default:
            return state
    }
}

export default reducer;