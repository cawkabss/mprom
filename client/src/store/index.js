import {createStore, combineReducers, applyMiddleware} from 'redux';
import history from '../history';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import providersReducer from '../reducers/providersReducer';
import searchReducer from "../reducers/searchReducer";
import productsReducer from "../reducers/productsReducer";
import shopsReducer from "../reducers/shopsReducer";
import ordersReducer from "../reducers/ordersReducer";

const router = routerMiddleware(history);

const rootReducer = combineReducers({
    providers: providersReducer,
    products: productsReducer,
    shops: shopsReducer,
    search: searchReducer,
    orders: ordersReducer,
    router: routerReducer
});

const store = createStore(rootReducer, applyMiddleware(router, thunk));

export default store;

window.store = store;