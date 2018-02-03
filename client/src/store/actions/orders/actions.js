import axios from 'axios';
import {push} from 'react-router-redux';

import * as actionTypes from './actionTypes';

const requestStart = (actionType) => {
    return {
        type: actionType
    }
};

const requestResponse = (actionType, data) => {
    return {
        type: actionType,
        payload: data,
    }
};

export const orderChangeData = (propName, propValue) => (
    {
        type: actionTypes.ORDER_CHANGE_DATA,
        propName,
        propValue
    }
);

export const orderUpdateValid = (isValid) => (
    {
        type: actionTypes.ORDER_UPDATE_VALID,
        isValid
    }
);

export const orderLoadProduct = (id) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.ORDER_LOAD_PRODUCT_START));

        return axios.get(`/api/products/${id}`)
            .then(res => dispatch(requestResponse(actionTypes.ORDER_LOAD_PRODUCT_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.ORDER_LOAD_PRODUCT_FAIL, error)))
    }
};

export const createOrder = (productId) => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.ORDER_CREATE_START));

        const orderData = getState().order.data;
        const providerId = getState().order.product.provider;

        const data = {
            data: orderData,
            product: productId,
            provider: providerId,
        };

        axios.post('/api/orders', data)
            .then(res => {
                dispatch(requestResponse(actionTypes.ORDER_CREATE_SUCCESS, res.data));
                dispatch(push('/orders'));
            })
            .catch(error => dispatch(requestResponse(actionTypes.ORDER_CREATE_FAIL, error)))
    }
};

export const updateOrders = (ordersForUpdate, status) => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.ORDERS_UPDATE_START));

        const updateOrders = ordersForUpdate.map(order => {
            return {
                ...order,
                status
            }
        });
        return axios.put('/api/orders', updateOrders)
            .then(() => dispatch(requestResponse(actionTypes.ORDERS_UPDATE_SUCCESS, updateOrders)))
            .catch(error => dispatch(requestResponse(actionTypes.ORDERS_UPDATE_FAIL, error)))
    }
};

export const deleteOrders = (ordersForDelete) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.ORDERS_DELETE_START));
       return axios.put('/api/orders/delete', ordersForDelete)
            .then(() => dispatch(requestResponse(actionTypes.ORDERS_DELETE_SUCCESS, ordersForDelete)))
            .catch(error => dispatch(requestResponse(actionTypes.ORDERS_DELETE_FAIL, error)))
    }
};

export const getOrdersList = (settings) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.ORDERS_LIST_LOAD_START));

        axios.get(`/api/orders/filter?settings=${JSON.stringify(settings)}`)
            .then(res => dispatch(requestResponse(actionTypes.ORDERS_LIST_LOAD_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.ORDERS_LIST_LOAD_FAIL, error)))
    }
};

export const getOrdersStatistics = () => {
    return dispatch => {
        dispatch(requestStart(actionTypes.ORDERS_STATISTICS_LOAD_START));

        Promise.all([
            axios.get('/api/orders/statistics/year'),
            axios.get('/api/orders/statistics/month')
        ])
            .then(res =>  dispatch(requestResponse(actionTypes.ORDERS_STATISTICS_LOAD_SUCCESS, res)))
            .catch(error => dispatch(requestResponse(actionTypes.ORDERS_STATISTICS_LOAD_FAIL, error)))
    }
};

export const confirmCreateOrderError = () => (
    {
        type: actionTypes.ORDER_CONFIRM_ERROR
    }
);

export const clearOrdersList = () => (
    {
        type: actionTypes.ORDERS_LIST_CLEAR_STATE
    }
);