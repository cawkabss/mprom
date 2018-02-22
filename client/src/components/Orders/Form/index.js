import React, {Component} from 'react';
import {compose} from "recompose";
import {connect} from 'react-redux';
import {ValidatorForm} from "react-form-validator-core";
import {TextValidator} from "react-material-ui-form-validator";
import {
    Paper,
    Typography,
    Button,
    withStyles,
    MenuItem,
    Select,
    Input,
} from "material-ui-next";
import Progress from "../../../UI/Progress/Progress";
import DataTable from "../../../UI/DataTable/DataTable";
import withErrorHandler from "../../../hoc/WithErrorHandler";
import {
    orderChangeData,
    createOrder,
    orderLoadProduct,
    confirmErrorHandler,
    validationHandler
} from "../../../AC/orders";
import {
    formControlsSelector,
    orderProductSelector,
    orderValidationSelector
} from "../../../selectors/ordersSelectors";

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
        productId: null
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

    changeHandler = (event) => {
        const propName = event.target.name;
        let propValue = event.target.value;

        this.props.changeOrderData(propName, propValue);
    };

    validatorListener = propName => isValid => {
        this.props.validationHandler(propName, isValid);
    };

    getFormControls = (data, controls, classes) => {
        return controls.map(control => {
            if(control.element === 'input') {
                return (
                    <div key={control.name} className={classes.item}>
                        <label className={classes.label}>
                            {control.labelText}
                        </label>
                        <TextValidator
                            ref={control.name}
                            onChange={this.changeHandler}
                            onBlur={this.handleBlur}
                            name={control.name}
                            value={data[control.name]}
                            validators={control.validations.validators}
                            errorMessages={control.validations.errorMessages}
                            validatorListener={this.validatorListener(control.name)}
                        />
                    </div>
                );
            }
            else {
                return (
                    <div key={control.name} className={classes.item}>
                        <label className={classes.label}>
                            {control.labelText}
                        </label>
                        <Select
                            autoWidth
                            value={data[control.name]}
                            onChange={this.changeHandler}
                            input={<Input name={control.name} />}
                        >
                            {
                                control.values.map(item => (
                                    <MenuItem value={item}>
                                        {item}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </div>
                );
            }

        })
    };

    render() {
        const {
            data,
            controls,
            orderFormValid,
            createOrderHandler,
            loading,
            product,
            classes
        } = this.props;

        return (
            <section className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography type="title" className={classes.title}>
                        <span>Новый заказ</span>
                    </Typography>
                    <DataTable
                        className={classes.table}
                        columns={TABLE_COLUMNS}
                        data={product}
                        showRowHover={true}
                        showPagination={false}
                    />
                    <ValidatorForm
                        className={classes.form}
                        onSubmit={() => {}}
                    >
                        {this.getFormControls(data, controls, classes)}
                        <Button
                            raised
                            color="primary"
                            disabled={!orderFormValid}
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
        data: state.orders.form.data,
        controls: formControlsSelector(state),
        product: orderProductSelector(state),
        loading: state.orders.form.loading,
        error: state.orders.form.error,
        orderFormValid: orderValidationSelector(state)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeOrderData: (propName, propValue) => dispatch(orderChangeData(propName, propValue)),
        validationHandler: (propName, isValid) => dispatch(validationHandler(propName, isValid)),
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