import * as actionTypes from '../../AC/shops/actionTypes';

const initialState = {
    data: {
        name: '',
        groups: [], // {name: '', id: ''}
        providers: [], // id
        canSavePrice: false
    },
    loading: false,
    error: false
};

const formReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){

        case actionTypes.SHOP_LOAD_START:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.SHOP_LOAD_SUCCESS:

            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };

        case actionTypes.SHOP_LOAD_FAIL:

            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.SHOP_CHANGE_NAME:
            return{
                ...state,
                data: {
                    ...state.data,
                    name: payload
                }
            };

        case actionTypes.SHOP_CHANGE_GROUP_ID:
            return{
                ...state,
                data: {
                    ...state.data,
                    groups: state.data.groups.map(group => group.name === payload.groupName ?
                        {...group, id: payload.groupValue} : group)
                }
            };

        case actionTypes.SHOP_CHANGE_PROVIDERS:
            return{
                ...state,
                data: {
                    ...state.data,
                    providers: payload
                }
            };

        case actionTypes.SHOP_GROUPS_UPDATE:
            return{
                ...state,
                data: {
                    ...state.data,
                    groups: payload
                }
            };

        case actionTypes.SHOP_CREATE_START:
            return{
                ...state,
                loading: true,
            };

        case actionTypes.SHOP_CREATE_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };

        case actionTypes.SHOP_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.SHOP_UPDATE_START:
            return{
                ...state,
                loading: true,
            };

        case actionTypes.SHOP_UPDATE_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };

        case actionTypes.SHOP_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.SHOP_SAVE_PRICE_START:
            return {
                ...state,
                loading: true,
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
                error: payload
            };

        case actionTypes.SHOP_CLEAR_STATE:
            return initialState;

        default: return state;
    }
};

export default formReducer;