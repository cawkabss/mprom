import * as actionTypes from '../../AC/search/actionTypes';

const initialState = {
    parsedProduct: {
        _id: '',
        title: '',
        description: {
            html: '',
            text: ''
        },
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
    doneParsing: false,
    error: false
};

const parsingReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){

        case actionTypes.PARSING_SET_PRODUCT_PART:
            return {
                ...state,
                parsedProduct: {
                    ...state.parsedProduct,
                    [payload.partName]: payload.partData
                }
            };

        case actionTypes.GET_SEARCHING_PRODUCT_DATA_START:
            return {
                ...initialState,
                loading: true
            };

        case actionTypes.GET_SEARCHING_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                parsedProduct: payload,
                loading: false,
                error: false
            };

        case actionTypes.GET_SEARCHING_PRODUCT_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.PARSING_PRODUCTS_DONE:
            return {
                ...state,
                loading: false,
                doneParsing: true
            };

        default: return state;
    }
};

export default parsingReducer;