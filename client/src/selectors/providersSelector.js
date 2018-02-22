import {createSelector} from "reselect";
import {mapToArr} from "../helpers";

const providersListGetter = state => state.providers.list.data;
const formControlsGetter = state => state.providers.form.controls;

const validateProviderData = controls => {
    let providerValid = true;
    for (let key in controls) {
        providerValid = controls[key].validations.isValid && providerValid;
    }

    return providerValid;
};

export const providersListSelector = createSelector(providersListGetter, providers => mapToArr(providers));
export const formControlsSelector = createSelector(formControlsGetter, controls => mapToArr(controls));
export const providerValidationSelector = createSelector(formControlsGetter, validateProviderData);
