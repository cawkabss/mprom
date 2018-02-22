import {combineReducers} from 'redux';

import formReducer from './formReducer';
import listReducer from './listReducer';
import statisticsReducer from "./statisticsReducer";

export default combineReducers({
    form: formReducer,
    list: listReducer,
    statistics: statisticsReducer
});