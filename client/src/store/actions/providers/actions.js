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

export const loadProvidersList = () => {
    return dispatch => {
        dispatch(requestStart(actionTypes.PROVIDERS_LIST_LOAD_START));

        return axios.get('/api/providers')
            .then(res => dispatch(requestResponse(actionTypes.PROVIDERS_LIST_LOAD_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.PROVIDERS_LIST_LOAD_FAIL, error)))
    }
};

export const loadProvider = (id) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.PROVIDER_LOAD_START));

        return axios.get(`/api/providers/${id}`)
            .then(res => dispatch(requestResponse(actionTypes.PROVIDER_LOAD_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.PROVIDER_LOAD_FAIL, error)))
    }
};

export const providerDataChange = (propName, propValue) => (
    {
        type: actionTypes.PROVIDER_DATA_CHANGE,
        propName,
        propValue
    }
);

export const providerSettingsChange = (propName, propValue) => (
    {
        type: actionTypes.PROVIDER_SETTINGS_CHANGE,
        propName,
        propValue
    }
);

export const providerValidChange = (isValid) => (
    {
        type: actionTypes.PROVIDER_VALID_CHANGE,
        isValid
    }
);

export const parsePriceFile = (priceFile) => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.PROVIDER_PRICE_FILE_PARSE_START));

        const {data:{settings}} = getState().provider;
        const data = new FormData();

        data.append('settings', JSON.stringify(settings));
        data.append('file', priceFile);

        return axios.post('/api/parse-price-file', data)
            .then(res => dispatch(requestResponse(actionTypes.PROVIDER_PRICE_FILE_PARSE_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.PROVIDER_PRICE_FILE_PARSE_FAIL, error)))
    }
};

export const updateProviderProducts = () => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.PROVIDER_UPDATE_PRODUCTS_START));

        const providerData = getState().provider.data;

        axios.get(`/api/providers/${providerData._id}/products`)
            .then(res => {
                const oldProviderProducts = res.data;
                const parsedProducts = getState().provider.parsedProducts;

                let updatedProducts = oldProviderProducts.map(oldProduct => {
                    const finedProduct = parsedProducts
                        .find(parsedProduct => parsedProduct.vendorCode === oldProduct.vendorCode);

                    if(finedProduct) {
                        oldProduct.price = finedProduct.price;
                        oldProduct.count = finedProduct.count;
                        oldProduct.available = '+';
                    }
                    else {
                        oldProduct.available = '-';
                        oldProduct.count = '';
                    }

                    return oldProduct;
                });

                let newProducts = parsedProducts.filter(parsedProduct => {
                    return updatedProducts
                        .findIndex(oldProduct => oldProduct.vendorCode === parsedProduct.vendorCode) === -1;
                });

                newProducts = newProducts.map(product => {
                    return {
                        ...product,
                        provider: providerData._id
                    }
                });

                const data = {
                    updatedProducts: updatedProducts,
                    newProducts: newProducts
                };

                axios.put(`/api/providers/${providerData._id}/products`, data)
                    .then(res => {
                        dispatch(requestResponse(actionTypes.PROVIDER_UPDATE_PRODUCTS_SUCCESS, res.data));
                        dispatch(push(`/providers/${providerData._id}`));
                    })
                    .catch(error => dispatch(requestResponse(actionTypes.PROVIDER_UPDATE_PRODUCTS_FAIL, error)))
            });
    }
};

export const loadProductsStatistics = (id) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.PROVIDER_PRODUCTS_STATISTICS_LOAD_START));

        return axios.get(`/api/providers/${id}/products/statistics`)
            .then(res => dispatch(requestResponse(actionTypes.PROVIDER_PRODUCTS_STATISTICS_LOAD_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.PROVIDER_PRODUCTS_STATISTICS_LOAD_FAIL, error)))
    }
};

export const createProvider = () => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.PROVIDER_CREATE_START));
        const provider = getState().provider.data;

        const providerData = {
            name: provider.name,
            url: provider.url,
            prefix: provider.prefix,
            settings: provider.settings,
            updateTime: Date.now()
        };

        return axios.post('/api/providers', providerData)
            .then(res => {
                const newProvider = res.data;

                dispatch(requestResponse(actionTypes.PROVIDER_CREATE_SUCCESS, newProvider));
                dispatch(push(`/providers/${newProvider._id}`))
            })
            .catch(error => dispatch(requestResponse(actionTypes.PROVIDER_CREATE_FAIL, error)))
    }
};

export const updateProvider = (id) => {
    return (dispatch, getState) => {

        dispatch(requestStart(actionTypes.PROVIDER_UPDATE_START));

        const provider = getState().provider.data;

        const providerData = {
            name: provider.name,
            url: provider.url,
            prefix: provider.prefix,
            settings: provider.settings
        };

        axios.put(`/api/providers/${id}`, providerData)
            .then(res => {
                const updatedProvider = res.data;

                dispatch(requestResponse(actionTypes.PROVIDER_UPDATE_SUCCESS, updatedProvider));
                dispatch(push(`/providers/${id}`))
            })
            .catch(error => dispatch(requestResponse(actionTypes.PROVIDER_UPDATE_FAIL, error)))
    }
};

export const deleteProvider = (id) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.PROVIDER_DELETE_START));

        axios.delete(`/api/providers/${id}`)
            .then(() => {
                dispatch(requestResponse(actionTypes.PROVIDER_DELETE_SUCCESS, id));
                dispatch(push('/providers'));
            })
            .catch( error => dispatch(requestResponse(actionTypes.PROVIDER_DELETE_FAIL, error)))
    }
};

export const confirmError = () => (
    {
        type: actionTypes.PROVIDER_CONFIRM_ERROR
    }
);

export const providerClearData = () => (
    {
        type: actionTypes.PROVIDER_CLEAR_DATA
    }
);