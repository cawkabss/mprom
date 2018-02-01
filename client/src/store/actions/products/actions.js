import axios from 'axios';

import * as actionTypes from './actionTypes';

const requestStart = (actionType) => {
    return {
        type: actionType,
    }
};

const requestResponse = (actionType, data) => {
    return {
        type: actionType,
        payload: data,
    }
};

export const loadProductsList = (query) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.PRODUCTS_LIST_LOAD_START));

        axios.get(`/api/products/find?query=${query}`)
            .then(res => dispatch(requestResponse(actionTypes.PRODUCTS_LIST_LOAD_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.PRODUCTS_LIST_LOAD_FAIL, error)))
    }
};

export const productsListClear = () => {
    return {
        type: actionTypes.PRODUCTS_LIST_CLEAR,
    }
};
