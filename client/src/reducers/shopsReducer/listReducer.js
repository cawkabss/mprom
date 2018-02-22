import * as actionTypes from '../../AC/shops/actionTypes';
import {arrToMap, removeProperty} from "../../helpers";

const initialState = {
    data: {},
    loading: false,
    loaded: false,
    error: false
};

const listReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){

        case actionTypes.SHOPS_LIST_LOAD_START:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.SHOPS_LIST_LOAD_SUCCESS:
            return {
                ...state,
                data: arrToMap(payload),
                loading: false,
                loaded: true,
                error: false
            };

        case actionTypes.SHOPS_LIST_LOAD_FAIL:
            return{
                ...state,
                loading: false,
                loaded: false,
                error: payload
            };

        case actionTypes.SHOP_DELETE_SUCCESS:
            return{
                ...state,
                data: removeProperty(state.data, payload),
            };

        case actionTypes.SHOP_CREATE_SUCCESS:
            return{
                ...state,
                data: {
                    ...state.data,
                    [payload._id]: {
                        ...payload
                    }
                },
            };

        case actionTypes.SHOP_UPDATE_SUCCESS:
            return{
                ...state,
                data: {
                    ...state.data,
                    [payload._id]: {
                        ...payload
                    }
                },
            };

        default: return state;
    }
};

export default listReducer;