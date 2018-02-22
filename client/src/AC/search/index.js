import axios from 'axios';

import {push} from 'react-router-redux'

import * as actionTypes from './actionTypes';

const requestStart = (actionType) => (
    {
        type: actionType
    }
);

const requestResponse = (actionType, data) => (
    {
        type: actionType,
        payload: data
    }
);

export const changeSearchingSettings = (propName, propValue) =>(
    {
        type: actionTypes.SEARCHING_SETTINGS_CHANGE,
        payload: {
            propName,
            propValue
        }
    }
);

export const search = (query, maxCount, timeOut) => {
    return (dispatch) => {
        dispatch(requestStart(actionTypes.SEARCHING_START));

        let cookie = localStorage.getItem('cookie') ? localStorage.getItem('cookie') : {};

        axios.get(`/api/search?query=${ query }&maxCount=${ maxCount }&cookie=${ cookie }&timeOut=${timeOut}`)
            .then(res => {
                if (res.data === 'captcha'){
                    dispatch(push('/search/captcha'));
                } else {
                    dispatch(requestResponse(actionTypes.SEARCHING_SUCCESS, res.data));
                }
            })
            .catch( error => {
                dispatch(requestResponse(actionTypes.SEARCHING_FAIL, error));
            })
    }
};

export const parsing = (id) => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.GET_SEARCHING_PRODUCT_DATA_START));

        const {parseQuery, maxCount, timeOut} = getState().search.searching.settings;

        axios.get(`/api/products/findOne?provider=${id}&isDone=${false}`)
            .then(res => {
                if(res.data !== 'Товар не найден') {
                    dispatch(requestResponse(actionTypes.GET_SEARCHING_PRODUCT_DATA_SUCCESS, res.data));

                    const query = res.data[parseQuery];

                    dispatch(search(query, maxCount, timeOut));
                } else {
                    dispatch(requestResponse(actionTypes.PARSING_PRODUCTS_DONE));
                }
            })
            .catch(error => dispatch(requestResponse(actionTypes.GET_SEARCHING_PRODUCT_DATA_FAIL, error)))
    }
};

export const chooseProductPart = (partName, partData) => {
    return {
        type: actionTypes.PARSING_SET_PRODUCT_PART,
        payload: {
            partName,
            partData
        }
    }
};

export const saveResultProduct = () => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.PARSING_SAVE_RESULT_PRODUCT_START));

        const parsedProduct = getState().search.parsing.parsedProduct;
        const result = {
            ...parsedProduct,
            isDone: true
        };

        axios.put(`/api/products/${result._id}`, result)
            .then(res => {
                dispatch(requestResponse(actionTypes.PARSING_SAVE_RESULT_PRODUCT_SUCCESS, res.data));

                dispatch(parsing(result.provider))
            })
            .catch(error => dispatch(requestResponse(actionTypes.PARSING_SAVE_RESULT_PRODUCT_FAIL, error)))
    }
};

export const searchingClearState = () => (
    {
        type: actionTypes.SEARCHING_CLEAR_STATE
    }
);