import * as actionTypes from '../../AC/search/actionTypes';

const initialState = {
    data: [],
    settings: {
        parseQuery: 'title',
        query: '',
        maxCount: 10,
        timeOut: 0.5
    },
    searching: false,
    endSearching: false,
    captcha: false,
    error: false
};

const searchingReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){

        case actionTypes.SEARCHING_START:
            return {
                ...state,
                searching: true,
                endSearching: false,
            };

        case actionTypes.SEARCHING_SUCCESS:
            return {
                ...state,
                data: payload,
                searching: false,
                endSearching: true,
                error: false,
            };

        case actionTypes.SEARCHING_CAPTCHA:
            return{
                ...state,
                searching: false,
                endSearching: true,
                captcha: true,
            };

        case actionTypes.SEARCHING_FAIL:
            return{
                ...state,
                searching: false,
                endSearching: true,
                error: payload
            };

        case actionTypes.SEARCHING_SETTINGS_CHANGE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [payload.propName]: payload.propValue
                }
            };

        case actionTypes.SEARCHING_CLEAR_STATE:
            return initialState;



        default: return state;
    }
};

export default searchingReducer;