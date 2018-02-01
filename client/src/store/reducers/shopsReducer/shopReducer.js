import * as actionTypes from '../../actions/shops/actionTypes';

const initialState = {
    data: {
        name: '',
        groups: [], // {name: '', id: ''}
        providers: [], // id
        canSavePrice: false
    },
    productsCount: 0,
    ordersCount: 0,
    loading: false,
    error: false
};

const shopReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.SHOP_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.SHOP_LOAD_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.SHOP_LOAD_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.SHOP_STATISTICS_LOAD_START:

            return {
                ...state,
                loading: true,
            };

        case actionTypes.SHOP_STATISTICS_LOAD_SUCCESS:

            return {
                ...state,
                productsCount: action.payload[0],
                ordersCount: action.payload[1],
                loading: false,
                error: false
            };

        case actionTypes.SHOP_STATISTICS_LOAD_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.SHOP_CHANGE_NAME:
            return{
                ...state,
                data: {
                    ...state.data,
                    name: action.shopName
                }
            };

        case actionTypes.SHOP_CHANGE_GROUP_VALUE:
            return{
                ...state,
                data: {
                    ...state.data,
                    groups: state.data.groups.map(group => group.name === action.groupName ?
                        {...group, id: action.groupValue} : group)
                }
            };

        case actionTypes.SHOP_CHANGE_PROVIDERS:
            return{
                ...state,
                data: {
                    ...state.data,
                    providers: action.providers
                }
            };

        case actionTypes.SHOP_GROUPS_UPDATE:
            return{
                ...state,
                data: {
                    ...state.data,
                    groups: action.groups
                }
            };

        case actionTypes.SHOP_CREATE_START:
            return{
                ...state,
                loading: true
            };

        case actionTypes.SHOP_CREATE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.SHOP_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.SHOP_UPDATE_START:
            return{
                ...state,
                loading: true
            };

        case actionTypes.SHOP_UPDATE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.SHOP_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.SHOP_SAVE_PRICE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.SHOP_SAVE_PRICE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            };

        case actionTypes.SHOP_SAVE_PRICE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.SHOP_CLEAR_STATE:
            console.log('clear')
            return initialState;

        default: return state;
    }
};

export default shopReducer;