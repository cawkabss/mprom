import * as actionTypes from '../../AC/providers/actionTypes';

const initialState = {
    data: {
        _id: '',
        name: '',
        url: '',
        prefix: '',
        settings: {
            titleCell: '',
            vendorCodeCell: '',
            priceCell: '',
            recommendedPriceCell: '',
            descriptionCell: '',
            countCell: ''
        },
        priceRange: [
            {
                from: 0,
                to: 99999,
                percentage: 20
            }
        ],
        categories: [],
        updateTime: ''
    },
    controls: {
        name: {
            name:'name',
            labelText: 'Введите имя поставщика (обязательно):',
            hintText: 'Пример: RoyalToys',
            validations: {
                validators: ['required'],
                errorMessages: ['Обязательное поле!'],
                isValid: false
            }
        },
        url: {
            name:'url',
            labelText: 'Введите сайт поставщика (обязательно):',
            hintText: 'Пример: http://royaltoys.com.ua',
            validations: {
                validators: ['required', 'matchRegexp:https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)'],
                errorMessages: ['Обязательное поле!', 'Неверный формат ссылки!'],
                isValid: false
            }
        },
        prefix: {
            name:'prefix',
            labelText: 'Введите уникальный префикс поставщика (обязательно):',
            hintText: 'Пример: rt',
            validations: {
                validators: ['required', 'matchRegexp:^[a-zA-Z]+$'],
                errorMessages: ['Обязательное поле!', 'Только английские буквы!'],
                isValid: false
            }
        },
        titleCell: {
            name:'titleCell',
            labelText: 'Номер колонки в Excel с названием позиции (обязательно):',
            hintText: 'Пример: А',
            validations: {
                validators: ['required', 'maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$'],
                errorMessages: ['Обязательное поле!', 'Максимум 1 символ', 'Только английские буквы!'],
                isValid: false
            }
        },
        vendorCodeCell: {
            name:'vendorCodeCell',
            labelText: 'Номер колонки в Excel с артикулом (обязательно):',
            hintText: 'Пример: B',
            validations: {
                validators: ['required', 'maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$'],
                errorMessages: ['Обязательное поле!', 'Максимум 1 символ', 'Только английские буквы!'],
                isValid: false
            }
        },
        priceCell: {
            name:'priceCell',
            labelText: 'Номер колонки в Excel с ценой (обязательно):',
            hintText: 'Пример: C',
            validations: {
                validators: ['required', 'maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$'],
                errorMessages: ['Обязательное поле!', 'Максимум 1 символ', 'Только английские буквы!'],
                isValid: false
            }
        },
        recommendedPriceCell: {
            name:'recommendedPriceCell',
            labelText: 'Номер колонки в Excel с рекомендованной ценой (опционально):',
            hintText: 'Пример: D',
            validations: {
                validators: ['maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$'],
                errorMessages: ['Максимум 1 символ', 'Только английские буквы!'],
                isValid: true
            }
        },
        descriptionCell: {
            name:'descriptionCell',
            labelText: 'Номер колонки в Excel с описанием (опционально):',
            hintText: 'Пример: E',
            validations: {
                validators: ['maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$'],
                errorMessages: ['Максимум 1 символ', 'Только английские буквы!'],
                isValid: true
            }
        },
        countCell: {
            name:'countCell',
            labelText: 'Номер колонки в Excel с остатками (опционально):',
            hintText: 'Пример: F',
            validations: {
                validators: ['maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$'],
                errorMessages: ['Максимум 1 символ', 'Только английские буквы!'],
                isValid: true
            }
        }
    },
    priceFile: null,
    parsedProducts: [],
    priceFileUpload: false,
    loading: false,
    error: false
};

const formReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){

        case actionTypes.PROVIDER_GET_DATA_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_GET_DATA_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_GET_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.PROVIDER_DATA_CHANGE:
            return {
                ...state,
                data:{
                    ...state.data,
                    [payload.propName]: payload.propValue
                }
            };

        case actionTypes.PROVIDER_PRICE_RANGE_ADD:
            const item = {
              from: state.data.priceRange.length ? state.data.priceRange[state.data.priceRange.length - 1].to : 0,
              to: 99999,
              percentage: 20
            };

            return {
                ...state,
                data:{
                    ...state.data,
                    priceRange: [...state.data.priceRange, item]
                }
            };

        case actionTypes.PROVIDER_PRICE_RANGE_DELETE:

            return {
                ...state,
                data:{
                    ...state.data,
                    priceRange: state.data.priceRange.filter((item,index) => index !== payload.index)
                }
            };

        case actionTypes.PROVIDER_PRICE_RANGE_CHANGE:

            return {
                ...state,
                data:{
                    ...state.data,
                    priceRange: state.data.priceRange.map((item, index) => {
                        if(index === payload.index) {
                            return {
                                ...item,
                                [payload.propName] : +payload.propValue
                            }
                        }
                        return item;
                    })
                }
            };

        case actionTypes.PROVIDER_SETTINGS_CHANGE:
            return {
                ...state,
                data:{
                    ...state.data,
                    settings: {
                        ...state.data.settings,
                        [payload.propName]: payload.propValue
                    }
                }
            };

        case actionTypes.PROVIDER_VALIDATION_HANDLER:
            return {
                ...state,
                controls:{
                    ...state.controls,
                    [payload.propName]: {
                        ...state.controls[payload.propName],
                        validations: {
                            ...state.controls[payload.propName].validations,
                            isValid: payload.isValid
                        }
                    }
                }
            };

        case actionTypes.PROVIDER_CREATE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_CREATE_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.PROVIDER_UPDATE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_UPDATE_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.PROVIDER_PRICE_FILE_PARSE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_PRICE_FILE_PARSE_SUCCESS:
            return {
                ...state,
                parsedProducts: payload,
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_PRICE_FILE_PARSE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.PROVIDER_UPDATE_PRODUCTS_START:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.PROVIDER_UPDATE_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            };

        case actionTypes.PROVIDER_UPDATE_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.PROVIDER_DELETE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PROVIDER_DELETE_SUCCESS:
            return initialState;

        case actionTypes.PROVIDER_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.PROVIDER_CONFIRM_ERROR:
            return {
                ...state,
                error: false
            };

        case actionTypes.PROVIDER_CLEAR_DATA:
            return initialState;

        default: return state
    }
};

export default formReducer;