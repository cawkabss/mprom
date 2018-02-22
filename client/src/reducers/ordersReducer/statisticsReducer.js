import * as actionTypes from '../../AC/orders/actionTypes';

const initialState = {
    ordersByLastYear: [],
    ordersByLastMonth: [],
    loading: false,
    error: false
};

const statisticsReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){

        case actionTypes.ORDERS_STATISTICS_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDERS_STATISTICS_LOAD_SUCCESS:
            return {
                ...state,
                ordersByLastYear: payload.ordersByLastYear,
                ordersByLastMonth: payload.ordersByLastMonth,
                loading: false,
                error: false
            };

        case actionTypes.ORDERS_STATISTICS_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        default: return state;
    }
};

export default statisticsReducer;