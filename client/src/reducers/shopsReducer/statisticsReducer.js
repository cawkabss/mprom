import * as actionTypes from '../../AC/shops/actionTypes';

const initialState = {
    productsCount: 0,
    ordersCount: 0,
    loading: false,
    error: false
};

const statisticsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){

        case actionTypes.SHOP_STATISTICS_LOAD_START:

            return {
                ...state,
                loading: true,
            };

        case actionTypes.SHOP_STATISTICS_LOAD_SUCCESS:

            return {
                ...state,
                productsCount: payload.productsCount,
                ordersCount: payload.ordersCount,
                loading: false,
                error: false
            };

        case actionTypes.SHOP_STATISTICS_LOAD_FAIL:

            return {
                ...state,
                loading: false,
                error: payload
            };

        default: return state;
    }
};

export default statisticsReducer;