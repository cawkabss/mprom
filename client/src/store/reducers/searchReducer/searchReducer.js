import * as actionTypes from '../../actions/search/actionTypes';

const initialState = {
    settings: {
        parseQuery: 'title',
        maxCount: 10,
        timeOut: 0.5
    },
    finedProducts: [],
    resultProduct: {
        _id: '',
        title: '',
        description: '',
        images: [],
        keywords: '',
        properties: [],
        price: 0,
        vendorCode: '',
        category: {
            name: 'Без категории',
            url: ''
        }
    },
    loading: false,
    loadingText: '',
    isSearchEnd: false,
    isDoneParsing: false,
    captcha: false,
    error: false
};

const searchReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.PARSING_SET_PRODUCT_PART:
            return {
                ...state,
                resultProduct: {
                    ...state.resultProduct,
                    [action.partName]: action.partData
                }
            };

        case actionTypes.GET_SEARCHING_PRODUCT_DATA_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.GET_SEARCHING_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                resultProduct: action.payload,
                loading: false,
                error: false
            };

        case actionTypes.GET_SEARCHING_PRODUCT_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.SEARCHING_START:
            return {
                ...state,
                finedProducts: [],
                loading: true,
                isSearchEnd: false
            };

        case actionTypes.SEARCHING_SUCCESS:
            return {
                ...state,
                finedProducts: action.payload,
                loading: false,
                isSearchEnd: true,
                error: false,
            };

        case actionTypes.SEARCHING_CAPTCHA:
            return{
                ...state,
                loading: false,
                captcha: true,
                isSearchEnd: true
            };

        case actionTypes.SEARCHING_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
                isSearchEnd: true
            };

        case actionTypes.SEARCHING_SETTINGS_CHANGE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [action.propName]: action.propValue
                }
            };

        case actionTypes.PARSING_PRODUCTS_DONE:
            return {
                ...state,
               isDoneParsing: true
            };

        case actionTypes.SEARCHING_CLEAR_STATE:
            return initialState;



        default: return state;
    }
};

export default searchReducer;