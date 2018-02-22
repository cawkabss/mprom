import * as actionTypes from '../../AC/orders/actionTypes';
import {arrToMap, removeProperty} from "../../helpers";

const initialState = {
    data: {},
    loading: false,
    error: false
};

const ordersListReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case actionTypes.ORDERS_LIST_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDERS_LIST_LOAD_SUCCESS:
            return {
                ...state,
                data: {
                    ...arrToMap(payload)
                },
                loading: false,
                error: false
            };

        case actionTypes.ORDERS_LIST_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.ORDERS_UPDATE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDERS_UPDATE_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...arrToMap(payload)
                },
                loading: false
            };

        case actionTypes.ORDERS_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.ORDERS_DELETE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDERS_DELETE_SUCCESS:
            const updatedData = payload.reduce((acc, next) => removeProperty(acc, next._id), state.data);

            return {
                ...state,
                data: updatedData,
                loading: false
            };

        case actionTypes.ORDERS_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.ORDERS_CONFIRM_ERROR:
            return {
                ...state,
                error: false
            };

        case actionTypes.ORDERS_LIST_CLEAR_STATE:
            return initialState;

        default: return state;
    }
};

export default ordersListReducer;