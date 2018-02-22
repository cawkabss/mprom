import * as actionTypes from '../../AC/providers/actionTypes';
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

        case actionTypes.PROVIDERS_LIST_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDERS_LIST_LOAD_SUCCESS:

            return {
                ...state,
                data: arrToMap(action.payload),
                loading: false,
                loaded: true,
                error: false
            };

        case actionTypes.PROVIDERS_LIST_LOAD_FAIL:
            return{
                ...state,
                loading: false,
                loaded: false,
                error: payload
            };

        case actionTypes.PROVIDER_CREATE_SUCCESS:
            return{
                ...state,
                data: {
                    ...state.data,
                    [payload._id]: payload,
                }
            };

        case actionTypes.PROVIDER_UPDATE_SUCCESS:
            return{
                ...state,
                data: {
                    ...state.data,
                    [payload._id]: payload,
                }
            };

        case actionTypes.PROVIDER_DELETE_SUCCESS:
            return{
                ...state,
                data: removeProperty(state.data, payload),
            };

        case actionTypes.PROVIDER_CONFIRM_ERROR:
            return {
                ...state,
                error: false
            };

        default: return state;
    }
};

export default listReducer;