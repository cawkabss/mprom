import * as actionTypes from '../../actions/orders/actionTypes';

const initialState = {
    data: {
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        paidMethod: 'Наложка',
        deliveryMethod: 'НП',
        orderNumber: '',
    },
    product: '',
    orderValid: false,
    loading: false,
    error: false
};

const orderReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.ORDER_UPDATE_VALID:
            return {
                ...state,
                orderValid: action.isValid
            };

        case actionTypes.ORDER_CHANGE_DATA:
            return {
                ...state,
                data:{
                    ...state.data,
                    [action.propName]: action.propValue
                }
            };

        case actionTypes.ORDER_LOAD_PRODUCT_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDER_LOAD_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.ORDER_LOAD_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.ORDER_CREATE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.ORDERS_CONFIRM_ERROR:
            return {
                ...state,
                error: false
            };

        case actionTypes.ORDER_CREATE_SUCCESS:
            return initialState;

        default: return state;
    }
};

export default orderReducer;