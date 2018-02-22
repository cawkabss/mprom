import {createSelector} from "reselect";
import {mapToArr} from "../helpers";

const shopsListGetter = state => state.shops.list.data;

export const shopsListSelector = createSelector(shopsListGetter, shops => mapToArr(shops));