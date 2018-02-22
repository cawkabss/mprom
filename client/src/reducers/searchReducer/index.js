import {combineReducers} from 'redux';
import parsingReducer from "./parsing";
import searchingReducer from "./searching";

export default combineReducers({
    searching: searchingReducer,
    parsing: parsingReducer
})