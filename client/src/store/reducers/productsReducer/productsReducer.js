import * as actionTypes from '../../actions/products/actionTypes';

const initialState = {
    productsList: [],
    query: 'all',
    loading: false,
    error: false
};

const productsReducer = (state = initialState, action) => {
  switch(action.type){

      case actionTypes.PRODUCTS_LIST_LOAD_START:
          return {
              ...state,
              loading: true
          };

      case actionTypes.PRODUCTS_LIST_LOAD_SUCCESS:
          return {
              ...state,
              productsList: action.payload,
              loading: false,
              error: false,

          };

      case actionTypes.PRODUCTS_LIST_LOAD_FAIL:
          return {
              ...state,
              loading: false,
              error: action.payload
          };

      case actionTypes.PRODUCTS_LIST_CLEAR:
          return initialState;

      default: return state;
  }
};

export default productsReducer;