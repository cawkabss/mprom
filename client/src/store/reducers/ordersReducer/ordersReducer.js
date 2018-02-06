import * as actionTypes from '../../actions/orders/actionTypes';

const initialState = {
    filteredOrders: [],
    ordersByLastYear: [],
    ordersByLastMonth: [],
    loading: false,
    error: false
};

const ordersReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.ORDERS_STATISTICS_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDERS_STATISTICS_LOAD_SUCCESS:
            return {
                ...state,
                ordersByLastYear: action.payload[0].data,
                ordersByLastMonth: action.payload[1].data,
                loading: false,
                error: false
            };

        case actionTypes.ORDERS_STATISTICS_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.ORDERS_LIST_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDERS_LIST_LOAD_SUCCESS:
            return {
                ...state,
                filteredOrders: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.ORDERS_LIST_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.ORDERS_UPDATE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDERS_UPDATE_SUCCESS:
            return {
                ...state,
                filteredOrders: state.filteredOrders.map(order => {
                    const index = action.payload.findIndex(uOrder => uOrder._id === order._id);

                    return index > -1 ? action.payload[index] : order;
                }),
                loading: false
            };

        case actionTypes.ORDERS_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.ORDERS_DELETE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDERS_DELETE_SUCCESS:
            return {
                ...state,
                filteredOrders: state.filteredOrders
                    .filter(order => action.payload.findIndex(i => i._id === order._id) === -1),
                loading: false
            };

        case actionTypes.ORDERS_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.ORDER_CREATE_SUCCESS:
            return {
                ...state,
                allOrders: state.filteredOrders.length ? [...state.filteredOrders, action.payload] : []
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

export default ordersReducer;