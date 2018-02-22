import axios from 'axios';
import {push} from 'react-router-redux'

import * as actionTypes from './actionTypes';
import {saveAs} from "file-saver";
import {mapToArr} from "../../helpers";

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

export const changeShopName = (shopName) => (
    {
        type: actionTypes.SHOP_CHANGE_NAME,
        payload: shopName
    }
);

export const changeShopGroupId = (groupName, groupValue) => (
    {
        type: actionTypes.SHOP_CHANGE_GROUP_ID,
        payload: {
            groupName,
            groupValue
        }
    }
);

export const changeShopProviders = (providers) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SHOP_CHANGE_PROVIDERS,
            payload: providers
        });
        dispatch(updateShopGroups());
    }
};

export const loadShopsList = () => {
    return dispatch => {
        dispatch(requestStart(actionTypes.SHOPS_LIST_LOAD_START));

        axios.get('/api/shops')
            .then(res => dispatch(requestResponse(actionTypes.SHOPS_LIST_LOAD_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.SHOPS_LIST_LOAD_FAIL, error)))
    }
};

export const loadShop = (id) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.SHOP_LOAD_START));

        return axios.get(`/api/shops/${id}`)
            .then(res => dispatch(requestResponse(actionTypes.SHOP_LOAD_SUCCESS, res.data)))
            .catch(error => dispatch(requestResponse(actionTypes.SHOP_LOAD_FAIL, error)))
    }
};

export const getShopData = id => {
    return (dispatch, getState) => {
        const isShopsLoaded = getState().shops.list.loaded;
        const shopsList = getState().shops.list.data;

        if(isShopsLoaded) {
            dispatch({
                type: actionTypes.SHOP_LOAD_SUCCESS,
                payload: shopsList[id]
            })
        }
        else {
            return dispatch(loadShop(id));
        }
    }
};

export const loadShopStatistics = (id) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.SHOP_STATISTICS_LOAD_START));

        axios.get(`/api/shops/${id}/statistics`)
            .then(res => {
                dispatch(requestResponse(actionTypes.SHOP_STATISTICS_LOAD_SUCCESS, res.data))
            })
            .catch(error => dispatch(requestResponse(actionTypes.SHOP_STATISTICS_LOAD_FAIL, error)))
    }
};

export const updateShopGroups = () => {

    return (dispatch, getState) => {

        let shopGroups = getState().shops.form.data.groups;
        const shopProviders = getState().shops.form.data.providers;
        const providersList = mapToArr(getState().providers.list.data);

        let updatedShopGroups = providersList
            .filter(providerData => shopProviders.indexOf(providerData._id) > -1)
            .map(providerData => providerData.categories)
            .reduce((acc, next) => acc.concat(next), []);

        updatedShopGroups = [...new Set(updatedShopGroups)];

        updatedShopGroups = updatedShopGroups
            .map(categoryName => {
                const finedGroup = shopGroups.find(group => group.name === categoryName);
                return finedGroup ? finedGroup : {name: categoryName, id: ''};
            });

        dispatch({
            type: actionTypes.SHOP_GROUPS_UPDATE,
            payload: updatedShopGroups
        })
    };
};

export const createShop = () => {
    return (dispatch, getState) => {
        const shopData = getState().shops.form.data;
        dispatch(requestStart(actionTypes.SHOP_CREATE_START));

        axios.post('/api/shops', shopData)
            .then(res => {
                dispatch(requestResponse(actionTypes.SHOP_CREATE_SUCCESS, res.data));
                dispatch(push(`/shops/${res.data._id}`));
            })
            .catch(error => requestResponse(actionTypes.SHOP_CREATE_FAIL, error));
    }
};

export const updateShop = (id) => {
    return (dispatch, getState) => {
        const shopData = {...getState().shops.form.data};
        dispatch(requestStart(actionTypes.SHOP_UPDATE_START));

        shopData.canSavePrice = shopData.groups.length && !shopData.groups.filter(group => !group.id).length;

        axios.put(`/api/shops/${id}`, shopData)
            .then(res => {
                dispatch(requestResponse(actionTypes.SHOP_UPDATE_SUCCESS, res.data));
                dispatch(push(`/shops/${id}`));
            })
            .catch(error => dispatch(requestResponse(actionTypes.SHOP_UPDATE_FAIL, error)));
    }
};

export const deleteShop = (id) => {
    return dispatch => {
        dispatch(requestStart(actionTypes.SHOP_DELETE_START));

        axios.delete(`/api/shops/${id}`)
            .then(res => {
                dispatch(requestResponse(actionTypes.SHOP_DELETE_SUCCESS, id));
                dispatch(push('/shops'));
            })
            .catch(error => dispatch(requestResponse(actionTypes.SHOP_DELETE_FAIL, error)));
    }
};

export const savePrice = (id) => {
    return (dispatch, getState) => {
        dispatch(requestStart(actionTypes.SHOP_SAVE_PRICE_START));

        const shop = getState().shops.form.data;

        fetch(`/api/shops/${id}/save-price`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res =>  {
                return res.blob()
            })
            .then(data => {
                dispatch(requestResponse(actionTypes.SHOP_SAVE_PRICE_SUCCESS, data));

                const time = new Date();
                saveAs(data, `${shop.name}_${time.toLocaleDateString()}.xlsx`);
            })
            .catch(error => requestResponse(actionTypes.SHOP_SAVE_PRICE_FAIL, error))
    }
};

export const shopClearState = () => (
    {
        type: actionTypes.SHOP_CLEAR_STATE
    }
);