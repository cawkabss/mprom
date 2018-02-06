import {createStore, combineReducers, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import providersReducer from '../store/reducers/providersReducer/providersReducer';
import searchReducer from "./reducers/searchReducer/searchReducer";
import productsReducer from "./reducers/productsReducer/productsReducer";
import shopsReducer from "./reducers/shopsReducer/shopsReducer";
import providerReducer from "./reducers/providersReducer/ProviderReducer";
import shopReducer from "./reducers/shopsReducer/shopReducer";
import orderReducer from "./reducers/ordersReducer/orderReducer";
import ordersReducer from "./reducers/ordersReducer/ordersReducer";

export const history = createHistory();
const router = routerMiddleware(history);

const rootReducer = combineReducers({
    providers: providersReducer,
    provider: providerReducer,
    products: productsReducer,
    shops: shopsReducer,
    shop: shopReducer,
    search: searchReducer,
    order: orderReducer,
    orders: ordersReducer,
    router: routerReducer
});

const store = createStore(rootReducer, applyMiddleware(router, thunk));

export default store;

window.store = store;