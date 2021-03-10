import *  as actionTypes from './actionTypes';

export const setPageTitle = (pageTitle: string) => ({
        type: actionTypes.LOAD_CURRENT_PAGE_TITLE,
        pageTitle
});

