import * as actionTypes from '../../actions/providers/actionTypes';

const initialState = {
    data: {
        _id: '',
        name: '',
        url: '',
        prefix: '',
        settings: {
            titleCell: '',
            vendorCodeCell: '',
            priceCell: '',
            recommendedPriceCell: '',
            descriptionCell: '',
            countCell: ''
        },
        updateTime: ''
    },
    allProductsCount: 0,
    doneProductsCount: 0,
    unAvailableProductsCount: 0,
    priceFile: null,
    parsedProducts: [],
    providerValid: false,
    priceFileUpload: false,
    loading: false,
    error: false
};

const providerReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.PROVIDER_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_LOAD_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.PROVIDER_DATA_CHANGE:
            return {
                ...state,
                data:{
                    ...state.data,
                    [action.propName]: action.propValue
                }
            };

        case actionTypes.PROVIDER_SETTINGS_CHANGE:
            return {
                ...state,
                data:{
                    ...state.data,
                    settings: {
                        ...state.data.settings,
                        [action.propName]: action.propValue
                    }
                }
            };

        case actionTypes.PROVIDER_VALID_CHANGE:
            return {
                ...state,
                providerValid: action.isValid
            };

        case actionTypes.PROVIDER_PRICE_FILE_PARSE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_PRICE_FILE_PARSE_SUCCESS:
            return {
                ...state,
                parsedProducts: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_PRICE_FILE_PARSE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.PROVIDER_UPDATE_PRODUCTS_START:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.PROVIDER_UPDATE_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload[1],
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_UPDATE_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.PROVIDER_CREATE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_CREATE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.PROVIDER_UPDATE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_UPDATE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.PROVIDER_DELETE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_DELETE_SUCCESS:
            return initialState;

        case actionTypes.PROVIDER_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.PROVIDER_CONFIRM_ERROR:
            return {
                ...state,
                error: false
            };

        case actionTypes.PROVIDER_PRODUCTS_STATISTICS_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_PRODUCTS_STATISTICS_LOAD_SUCCESS:
            return {
                ...state,
                allProductsCount: action.payload[0],
                doneProductsCount: action.payload[1],
                unAvailableProductsCount: action.payload[2],
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_PRODUCTS_STATISTICS_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.PROVIDER_CLEAR_DATA:
            return initialState;

        default: return state;
    }
};

export default providerReducer;