import * as actionTypes from '../../AC/providers/actionTypes';

const initialState = {
    data: {
        allProductsCount: 0,
        doneProductsCount: 0,
        unAvailableProductsCount: 0
    },
    loading: false,
    error: false
};

const statisticsReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){

        case actionTypes.PROVIDER_STATISTICS_LOAD_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_STATISTICS_LOAD_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_STATISTICS_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.PROVIDER_CONFIRM_ERROR:
            return {
                ...state,
                error: false
            };

        default: return state;
    }
};

export default statisticsReducer;