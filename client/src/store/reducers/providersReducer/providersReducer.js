import * as actionTypes from '../../actions/providers/actionTypes';

const initialState = {
    providersList: [],
    loading: false,
    error: null
};

const providersReducer = (state = initialState, action) => {
  switch(action.type){

      case actionTypes.PROVIDERS_LIST_LOAD_START:
        return {
            ...state,
            loading: true
        };

      case actionTypes.PROVIDERS_LIST_LOAD_SUCCESS:
        return {
            ...state,
            providersList: action.payload,
            loading: false,
            error: false
        };

      case actionTypes.PROVIDERS_LIST_LOAD_FAIL:
        return{
            ...state,
            loading: false,
            error: action.payload
        };

      case actionTypes.PROVIDER_CREATE_SUCCESS:
          return{
              ...state,
              providersList: state.providersList.length ?
                  [...state.providersList, action.payload] : []
          };

      case actionTypes.PROVIDER_UPDATE_SUCCESS:
          return{
              ...state,
              providersList: state.providersList.map(provider => {
                  return provider._id === action.payload._id ? action.payload : provider
              })
          };

      case actionTypes.PROVIDER_UPDATE_PRODUCTS_SUCCESS:

              return {
                  ...state,
                  providersList: state.providersList.map(provider => {
                      return provider._id === action.payload[0]._id ? action.payload[0] : provider
                  })
              };

      case actionTypes.PROVIDER_DELETE_SUCCESS:
          return{
              ...state,
              providersList: state.providersList.filter( provider => provider._id !== action.payload),
          };

      default: return state;
  }
};

export default providersReducer;