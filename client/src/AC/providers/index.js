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

export const loadProviderData = (id) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.PROVIDER_GET_DATA_START));

        axios.get(`/api/providers/${id}`)
            .then(res => dispatch(requestResponse(actionTypes.PROVIDER_GET_DATA_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.PROVIDER_GET_DATA_FAIL, error)));
    }
};

export const getProviderData = id => {
    return (dispatch, getState) => {
        const isProvidersLoaded = getState().providers.list.loaded;
        const providersList = getState().providers.list.data;

        if(isProvidersLoaded) {
            dispatch({
                type: actionTypes.PROVIDER_GET_DATA_SUCCESS,
                payload: providersList[id]
            })
        }
        else {
            return dispatch(loadProviderData(id));
        }
    }
};

export const providerDataChange = (propName, propValue) => (
    {
        type: actionTypes.PROVIDER_DATA_CHANGE,
        payload: {
            propName,
            propValue
        }
    }
);

export const providerSettingsChange = (propName, propValue) => (
    {
        type: actionTypes.PROVIDER_SETTINGS_CHANGE,
        payload: {
            propName,
            propValue
        }
    }
);

export const validationHandler = (propName, isValid) => (
    {
        type: actionTypes.PROVIDER_VALIDATION_HANDLER,
        payload: {
            propName,
            isValid
        }
    }
);

export const changePriceRange = (propName, propValue, index) => (
    {
        type: actionTypes.PROVIDER_PRICE_RANGE_CHANGE,
        payload: {
            propName,
            propValue,
            index
        }
    }
);

export const deletePriceRange = index => (
    {
        type: actionTypes.PROVIDER_PRICE_RANGE_DELETE,
        payload: {
            index
        }
    }
);

export const addPriceRange = () => (
    {
        type: actionTypes.PROVIDER_PRICE_RANGE_ADD
    }
);

export const parsePriceFile = (priceFile) => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.PROVIDER_PRICE_FILE_PARSE_START));

        const settings = getState().providers.form.data.settings;
        const priceRange = getState().providers.form.data.priceRange;
        const data = new FormData();

        data.append('settings', JSON.stringify(settings));
        data.append('priceRange', JSON.stringify(priceRange));
        data.append('file', priceFile);

        return axios.post('/api/parse-price-file', data)
            .then(res => dispatch(requestResponse(actionTypes.PROVIDER_PRICE_FILE_PARSE_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.PROVIDER_PRICE_FILE_PARSE_FAIL, error)))
    }
};

export const updateProviderProducts = () => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.PROVIDER_UPDATE_PRODUCTS_START));

        const providerData = getState().providers.form.data;

        axios.get(`/api/providers/${providerData._id}/products`)
            .then(res => {
                const oldProviderProducts = res.data;
                const parsedProducts = getState().providers.form.parsedProducts;

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

export const loadStatistics = (id) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.PROVIDER_STATISTICS_LOAD_START));

        return axios.get(`/api/providers/${id}/statistics`)
            .then(res => dispatch(requestResponse(actionTypes.PROVIDER_STATISTICS_LOAD_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.PROVIDER_STATISTICS_LOAD_FAIL, error)))
    }
};

export const createProvider = () => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.PROVIDER_CREATE_START));
        const provider = getState().providers.form.data;

        const providerData = {
            name: provider.name,
            url: provider.url,
            prefix: provider.prefix,
            settings: provider.settings,
            priceRange: provider.priceRange,
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

        const provider = getState().providers.form.data;

        const providerData = {
            name: provider.name,
            url: provider.url,
            prefix: provider.prefix,
            priceRange: provider.priceRange,
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

export const confirmErrorHandler = () => (
    {
        type: actionTypes.PROVIDER_CONFIRM_ERROR
    }
);

export const providerClearData = () => (
    {
        type: actionTypes.PROVIDER_CLEAR_DATA
    }
);