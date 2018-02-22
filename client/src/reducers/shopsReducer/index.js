import {combineReducers} from 'redux';

import listReducer from "./listReducer";
import formReducer from "./formReducer";
import statisticsReducer from "./statisticsReducer";

export default combineReducers({
    list: listReducer,
    form: formReducer,
    statistics: statisticsReducer
})