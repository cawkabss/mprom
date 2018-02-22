import React, {Component} from 'react';
import {compose} from "recompose";
import {connect} from 'react-redux';
import {ValidatorForm} from 'react-form-validator-core';
import {TextValidator} from 'react-material-ui-form-validator';
import {
    Paper,
    Button,
    withStyles,
    Typography, Tabs, Tab, TextField, IconButton, Icon
} from 'material-ui-next';
import {amber} from "material-ui-next/colors";

import {
    confirmErrorHandler,
    providerDataChange,
    providerSettingsChange,
    addPriceRange,
    changePriceRange,
    createProvider,
    updateProvider,
    validationHandler, deletePriceRange
} from "../../../AC/providers";
import Progress from "../../../UI/Progress/Progress";
import withErrorHandler from "../../../hoc/WithErrorHandler";
import {formControlsSelector, providerValidationSelector} from "../../../selectors/providersSelector";
import classNames from "classnames";

const styles = theme => (
    {
        root: {
            padding: '0 15px'
        },

        paper: {
            padding: 15,
            textAlign: 'center'
        },

        marginBottom: {
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

        marginRight: {
            [theme.breakpoints.up('md')]: {
                marginRight: 15
            }
        },

        actions: {
            '& button': {
                marginRight: 15
            }
        },

        dialogTitle: {
            '& h2': {
                display: 'flex',
                alignItems: 'center'
            }
        },

        dialogTitleIcon: {
            marginRight: 10,
            color: amber[500]
        },
    }
);

class Form extends Component {

    state = {
        value: 0,
    };

    handleBlur = (event) => {
        // set true as second parameter to onBlur required validation
        this.refs[event.target.name].validate(event.target.value, true);

    };

    tabsHandler = (event, value) => {
        this.setState({ value });
    };

    changeHandler = (event) => {

        const propName = event.target.name;
        let propValue = event.target.value;

        if (propName === 'name' || propName === 'prefix' || propName === 'url') {
            this.props.providerDataChange(propName, propValue);
        }
        else {
            propValue = propValue.toUpperCase();
            this.props.providerSettingsChange(propName, propValue);
        }
    };

    validatorListener = propName => isValid => {
        this.props.validationHandler(propName, isValid);
    };

    cancelHandler = () => {
        this.props.history.goBack();
    };

    submitFormHandler = () => {
        const id = this.props.match.params.id;

        if (id) {
            this.props.updateProvider(id);
        }
        else {
            this.props.createProvider();
        }
    };

    getFormControls = (data, controls, classes) => {
        return controls.map(control => (
            <div key={control.name} className={classes.item}>
                <label className={classes.marginRight}>
                    {control.labelText}
                </label>
                <TextValidator
                    ref={control.name}
                    hintText={control.hintText}
                    onChange={this.changeHandler}
                    onBlur={this.handleBlur}
                    name={control.name}
                    value={data[control.name] || data.settings[control.name]}
                    validators={control.validations.validators}
                    errorMessages={control.validations.errorMessages}
                    validatorListener={this.validatorListener(control.name)}
                />
            </div>
        ))
    };

    changePriceRangeHandler = (event, index) => {
        const propName = event.target.name;
        const propValue = event.target.value;
        this.props.changePriceRange(propName, propValue, index)
    };

    deletePriceRangeHandler = index => {
        this.props.deletePriceRange(index);
    };

    getPriceRange = (priceRange, classes) => {
        return priceRange.map((item, index) => (
            <div key={index} className={classes.item}>
                <TextField
                    className={classes.marginRight}
                    name="from"
                    label="От"
                    value={item.from}
                    onChange={(event) => this.changePriceRangeHandler(event, index)}
                />
                <TextField
                    className={classes.marginRight}
                    name="to"
                    label="До"
                    value={item.to}
                    onChange={(event) => this.changePriceRangeHandler(event, index)}
                />
                <TextField
                    className={classes.marginRight}
                    name="percentage"
                    label="Наценка, %"
                    value={item.percentage}
                    onChange={(event) => this.changePriceRangeHandler(event, index)}
                />
                <IconButton
                    aria-label="delete!"
                    onClick={() => this.deletePriceRangeHandler(index)}
                >
                    <Icon className="material-icons">
                        clear
                    </Icon>
                </IconButton>
            </div>

        ))
    };

    render() {
        const {
            data,
            controls,
            priceRange,
            addPriceRange,
            loading,
            providerValid,
            classes
        } = this.props;
        const id = this.props.match.params.id;
        const { value } = this.state;

        return (
            <section className={classes.root}>
                <Paper className={classes.paper}>
                    <Tabs
                        className={classes.marginBottom}
                        value={value}
                        onChange={this.tabsHandler}
                        centered
                    >
                        <Tab label="Настройки" />
                        <Tab label="Цены" />
                    </Tabs>
                    {value === 0 && (
                        <div>
                            <ValidatorForm className={classes.form} onSubmit={() => {}}>

                                { this.getFormControls(data, controls, classes) }

                            </ValidatorForm>
                        </div>
                    )}
                    {value === 1 && (
                        <div className={classes.form}>
                            {
                                this.getPriceRange(priceRange, classes)
                            }
                            <Button
                                color="primary"
                                onClick={addPriceRange}
                            >
                                Добавить диапазон
                            </Button>
                        </div>
                    )}
                    <div className={classes.actions}>
                        <Button
                            raised
                            color="secondary"
                            onClick={this.cancelHandler}
                        >
                            Отмена
                        </Button>
                        <Button
                            raised
                            color="primary"
                            disabled={!providerValid}
                            onClick={this.submitFormHandler}
                        >
                            {id ? 'Обновить' : 'Добавить'}
                        </Button>
                    </div>
                </Paper>

                <Progress show={loading}/>
            </section>
        )
    }
}

const mapStateToProps = state => {
    const form = state.providers.form;
    return {
        data: form.data,
        controls: formControlsSelector(state),
        priceRange: form.data.priceRange,
        providerValid: providerValidationSelector(state),
        loading: form.loading,
        error: form.error
    }
};

const mapDispatchToProps = dispatch => (
    {
        providerDataChange: (propName, propValue) => dispatch(providerDataChange(propName, propValue)),
        providerSettingsChange: (propName, propValue) => dispatch(providerSettingsChange(propName, propValue)),
        validationHandler: (propName, isValid) => dispatch(validationHandler(propName, isValid)),
        addPriceRange: () => dispatch(addPriceRange()),
        deletePriceRange: (index) => dispatch(deletePriceRange(index)),
        changePriceRange: (propName, propValue, index) => dispatch(changePriceRange(propName, propValue, index)),
        createProvider: () => dispatch(createProvider()),
        updateProvider: (id) => dispatch(updateProvider(id)),
        confirmErrorHandler: () => dispatch(confirmErrorHandler()),
    }
);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withErrorHandler,
    withStyles(styles)
);

export default enhance(Form);