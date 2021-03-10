import * as actionTypes from "../actions/actionTypes";
const initialState: any = {
    pageTitle: 'Dashboard'
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.LOAD_CURRENT_PAGE_TITLE:
            return {
                ...state,
                pageTitle : action.pageTitle
            }
        default:
            return state
    }
}

export default reducer;