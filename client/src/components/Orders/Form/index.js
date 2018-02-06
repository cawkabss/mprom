import React, {Component} from 'react';
import {branch, compose} from "recompose";
import {connect} from 'react-redux';
import {ValidatorForm} from "react-form-validator-core";
import {TextValidator} from "react-material-ui-form-validator";
import {
    Paper,
    Typography,
    Button,
    withStyles,
    Select,
    Input,
    MenuItem,
} from "material-ui-next";

import Progress from "../../../UI/Progress/Progress";
import DataTable from "../../../UI/DataTable/DataTable";
import {
    orderChangeData, orderUpdateValid, createOrder,
    orderLoadProduct,
    confirmErrorHandler
} from "../../../store/actions/orders/actions";
import withErrorHandler from "../../../hoc/WithErrorHandler";

const TABLE_COLUMNS = [
    {
        key: 'image',
        label: 'Фото',
    },
    {
        key: 'title',
        label: 'Название',
    },
    {
        key: 'vendorCode',
        label: 'Артикул'
    },
    {
        key: 'provider',
        label: 'Поставщик',
    },
    {
        key: 'providerPrice',
        label: 'Оптовая цена',
    },
    {
        key: 'markup',
        label: 'Наценка',
    },
    {
        key: 'ourPrice',
        label: 'Наша цена',
    }
];


const styles = theme => (
    {
        root: {
            padding: '0 15px',
            textAlign: 'center'
        },

        paper: {
            padding: 15
        },

        title: {
            marginBottom: 15
        },

        table: {
            marginBottom: 15
        },

        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },

        item: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 15,

            [theme.breakpoints.up('md')]: {
                flexDirection: 'row'
            }
        },

        label: {
            [theme.breakpoints.up('md')]: {
                marginRight: 15
            }
        }
    }
);

class Form extends Component {

    state = {
        validation: {
            customerName: false,
            customerPhone: false,
            customerEmail: true,
            orderNumber: false
        },
        productId: null,
        providerId: null
    };

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const productId = params.get('product');

        if (!productId) {
            this.props.history.replace('/products');
        }
        else {
            this.props.getProduct(productId);
            this.setState({productId});
        }
    }

    handleBlur = (event) => {
        // set true as second parameter to onBlur required validation
        this.refs[event.target.name].validate(event.target.value, true);
    };

    changeOrderDataHandler = (event) => {
        const propName = event.target.name;
        let propValue = event.target.value;

        this.props.changeOrderData(propName, propValue);
    };

    checkOrderValidity = () => {
        const validation = this.state.validation;
        let orderValid = true;

        for (let key in validation) {
            orderValid = validation[key] && orderValid;
        }

        this.props.updateOrderValid(orderValid);
    };

    orderValidatorListener = propName => isValid => {

        this.setState(prevState => {
            return {
                validation: {
                    ...prevState.validation,
                    [propName]: isValid
                }
            }
        }, this.checkOrderValidity);
    };

    render() {
        const {
            orderData,
            orderValid,
            createOrderHandler,
            loading,
            product,
            classes
        } = this.props;

        const transformedProduct = !product ? [] :
            [product].map((product) => {
                return {
                    image: <img alt="img" style={{height: '100%'}} src={product.images[0]}/>,
                    title: product.title,
                    vendorCode: product.vendorCode,
                    provider: <a href={product.provider.url} target="_blank">{product.provider.name}</a>,
                    providerPrice: product.price.providerPrice,
                    markup: product.price.markup,
                    ourPrice: product.price.ourPrice,
                    available: product.available,
                    count: product.count,
                    orderCount: product.orderCount
                }
            });

        return (
            <section className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography type="title" className={classes.title}>
                        <span>Новый заказ</span>
                    </Typography>
                    <DataTable
                        className={classes.table}
                        columns={TABLE_COLUMNS}
                        data={transformedProduct}
                        showRowHover={true}
                        showPagination={false}
                    />
                    <ValidatorForm
                        className={classes.form}
                        onSubmit={createOrderHandler}>
                        <div className={classes.item}>
                            <label className={classes.label}>
                                Введите имя клиента (обязательно):
                            </label>
                            <TextValidator
                                ref="customerName"
                                onChange={this.changeOrderDataHandler}
                                onBlur={this.handleBlur}
                                name="customerName"
                                value={orderData.customerName}
                                validators={['required']}
                                errorMessages={['Обязательное поле!']}
                                validatorListener={this.orderValidatorListener("customerName")}
                            />
                        </div>
                        <div className={classes.item}>
                            <label className={classes.label}>
                                Введите номер тел. клиента (обязательно):
                            </label>
                            <TextValidator
                                ref="customerPhone"
                                onChange={this.changeOrderDataHandler}
                                onBlur={this.handleBlur}
                                name="customerPhone"
                                value={orderData.customerPhone}
                                validators={['required', 'isNumber']}
                                errorMessages={['Обязательное поле!', 'Только цыфры!']}
                                validatorListener={this.orderValidatorListener("customerPhone")}
                            />

                        </div>
                        <div className={classes.item}>
                            <label className={classes.label}>
                                Введите E-mail покупателя (опционально):
                            </label>
                            <TextValidator
                                ref="customerEmail"
                                onChange={this.changeOrderDataHandler}
                                onBlur={this.handleBlur}
                                name="customerEmail"
                                value={orderData.customerEmail}
                                validators={['isEmail']}
                                errorMessages={['Неверный формат!']}
                                validatorListener={this.orderValidatorListener("customerEmail")}
                            />
                        </div>
                        <div className={classes.item}>
                            <label className={classes.label}>
                                Выберите метод доставки:
                            </label>
                            <Select
                                autoWidth
                                value={orderData.deliveryMethod}
                                onChange={this.changeOrderDataHandler}
                                input={<Input id="select-deliveryMethod" name="deliveryMethod" />}
                            >
                                <MenuItem value="НП">
                                    НП
                                </MenuItem>
                                <MenuItem value="Курьер">
                                    Курьер
                                </MenuItem>
                                <MenuItem value="Самовывоз">
                                    Самовывоз
                                </MenuItem>
                            </Select>
                        </div>
                        <div className={classes.item}>
                            <label className={classes.label}>
                                Выберите метод оплаты:
                            </label>
                            <Select
                                autoWidth
                                value={orderData.paidMethod}
                                onChange={this.changeOrderDataHandler}
                                input={<Input id="select-paidMethod" name="paidMethod" />}
                            >
                                <MenuItem value="Наложка">
                                    Наложка
                                </MenuItem>
                                <MenuItem value="Предоплата">
                                    Предоплата
                                </MenuItem>
                                <MenuItem value="Наличка">
                                    Наличка
                                </MenuItem>
                            </Select>
                        </div>
                        <div className={classes.item}>
                            <label className={classes.label}>
                                Введите номер заказа/ТТН (обязательно):
                            </label>
                            <TextValidator
                                ref="orderNumber"
                                onChange={this.changeOrderDataHandler}
                                onBlur={this.handleBlur}
                                name="orderNumber"
                                value={orderData.orderNumber}
                                validators={['required']}
                                errorMessages={['Обязательное поле!']}
                                validatorListener={this.orderValidatorListener("orderNumber")}
                            />
                        </div>
                        <Button
                            raised
                            color="primary"
                            disabled={!orderValid}
                            onClick={() => createOrderHandler(this.state.productId)}
                        >
                            Оформить заказ
                        </Button>
                    </ValidatorForm>
                </Paper>

                <Progress show={loading}/>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        orderData: state.order.data,
        product: state.order.product,
        orderValid: state.order.orderValid,
        loading: state.order.loading,
        error: state.order.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateOrderValid: (isValid) => dispatch(orderUpdateValid(isValid)),
        changeOrderData: (propName, propValue) => dispatch(orderChangeData(propName, propValue)),
        createOrderHandler: (productId) => dispatch(createOrder(productId)),
        getProduct: (id) => dispatch(orderLoadProduct(id)),
        confirmErrorHandler: () => dispatch(confirmErrorHandler())
    }
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withErrorHandler,
    withStyles(styles),
);

export default enhance(Form);