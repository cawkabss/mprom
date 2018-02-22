import * as actionTypes from '../../AC/orders/actionTypes';

const initialState = {
    data: {
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        paidMethod: 'Наложка',
        deliveryMethod: 'НП',
        orderNumber: '',
    },
    controls: {
        customerName: {
            element: 'input',
            name:'customerName',
            labelText: 'Введите имя клиента (обязательно):',
            validations: {
                validators: ['required'],
                errorMessages: ['Обязательное поле!'],
                isValid: false
            }
        },
        customerPhone: {
            element: 'input',
            name:'customerPhone',
            labelText: 'Введите номер тел. клиента (обязательно):',
            validations: {
                validators: ['required', 'isNumber'],
                errorMessages: ['Обязательное поле!', 'Только цыфры!'],
                isValid: false
            }
        },
        orderNumber: {
            element: 'input',
            name:'orderNumber',
            labelText: 'Введите номер заказа/ТТН (обязательно):',
            validations: {
                validators: ['required'],
                errorMessages: ['Обязательное поле!'],
                isValid: false
            }
        },
        customerEmail: {
            element: 'input',
            name:'customerEmail',
            labelText: 'Введите E-mail клиента (опционально):',
            validations: {
                validators: ['isEmail'],
                errorMessages: ['Неверный формат!'],
                isValid: false
            }
        },
        deliveryMethod: {
            element: 'select',
            values: ['НП', 'Курьер', 'Самовывоз'],
            name:'deliveryMethod',
            labelText: 'Выберите метод доставки:',
            validations: {
                // validators: ['required'],
                // errorMessages: ['Обязательное поле!'],
                isValid: true
            }
        },
        paidMethod: {
            element: 'select',
            values: ['Наложка', 'Предоплата', 'Наличка'],
            name:'paidMethod',
            labelText: 'Выберите метод оплаты:',
            validations: {
                // validators: ['required'],
                // errorMessages: ['Обязательное поле!'],
                isValid: true
            }
        }
    },
    product: '',
    orderValid: false,
    loading: false,
    error: false
};

const orderFormReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){

        case actionTypes.ORDER_CHANGE_DATA:
            return {
                ...state,
                data:{
                    ...state.data,
                    [payload.propName]: payload.propValue
                }
            };

        case actionTypes.ORDER_VALIDATION_HANDLER:
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

        case actionTypes.ORDER_LOAD_PRODUCT_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDER_LOAD_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload,
                loading: false,
                error: false
            };

        case actionTypes.ORDER_LOAD_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.ORDER_CREATE_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.ORDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };

        case actionTypes.ORDERS_CONFIRM_ERROR:
            return {
                ...state,
                error: false
            };

        case actionTypes.ORDER_CREATE_SUCCESS:
            return initialState;

        default: return state;
    }
};

export default orderFormReducer;