import * as actionTypes from '../../actions/shops/actionTypes';

const initialState = {
    shopsList: [],
    loading: false,
    error: false
};

const shopsReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.SHOPS_LIST_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.SHOPS_LIST_LOAD_SUCCESS:
            return {
                ...state,
                shopsList: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.SHOPS_LIST_LOAD_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.SHOP_DELETE_SUCCESS:
            return{
                ...state,
                shopsList: state.shopsList.filter( shop => shop._id !== action.payload),
            };

        case actionTypes.SHOP_CREATE_SUCCESS:
            return{
                ...state,
                shopsList: [...state.shopsList, action.payload],
            };

        case actionTypes.SHOP_UPDATE_SUCCESS:
            return{
                ...state,
                shopsList: state.shopsList.map(shop => {
                    return shop._id === action.payload._id ? action.payload : shop
                }),
            };

        default: return state;
    }
};

export default shopsReducer;