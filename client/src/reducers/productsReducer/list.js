import * as actionTypes from '../../AC/products/actionTypes';

const initialState = {
    data: [],
    loading: false,
    error: false
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.PRODUCTS_LIST_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PRODUCTS_LIST_LOAD_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false,

            };

        case actionTypes.PRODUCTS_LIST_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.PRODUCTS_LIST_CONFIRM_ERROR:
            return {
                ...state,
                error: false
            };

        case actionTypes.PRODUCTS_LIST_CLEAR:
            return initialState;

        default:
            return state;
    }
};

export default listReducer;