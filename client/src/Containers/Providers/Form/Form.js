import React, {Component} from 'react';
import {compose} from "recompose";
import {connect} from 'react-redux';
import {ValidatorForm} from 'react-form-validator-core';
import {TextValidator} from 'react-material-ui-form-validator';
import {
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    withStyles,
    Typography, Icon
} from 'material-ui-next';
import {amber} from "material-ui-next/colors";
import classNames from "classnames";

import {
    confirmError,
    providerDataChange,
    providerSettingsChange,
    providerValidChange,
    createProvider,
    loadProvider,
    updateProvider
} from "../../../store/actions/providers/actions";
import Progress from "../../../UI/Progress/Progress";

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

        label: {
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
        validation: {
            name: false,
            url: false,
            prefix: false,
            titleCell: false,
            vendorCodeCell: false,
            descriptionCell: true,
            priceCell: false,
            recommendedPriceCell: true,
            countCell: true
        },
    };

    componentDidMount() {
        const id = this.props.match.params.id;

        if (id) {
            this.props.loadProvider(id)
                .then(() => {
                    const fields = this.state.validation;

                    for (let key in fields) {
                        if (this.refs[key].props.value) {
                            this.refs[key].validate(this.refs[key].props.value)
                        }
                    }
                });
        }
    }

    handleBlur = (event) => {
        // set true as second parameter to onBlur required validation
        this.refs[event.target.name].validate(event.target.value, true);

    };

    changeHandler = (event) => {

        const propName = event.target.name;
        let propValue = event.target.value;

        if (propName !== 'name' && propName !== 'prefix' && propName !== 'url') {
            propValue = propValue.toUpperCase();
        }

        if (propName === 'name' || propName === 'prefix' || propName === 'url') {
            this.props.providerDataChange(propName, propValue);
        }
        else {
            this.props.providerSettingsChange(propName, propValue);
        }
    };

    updateProviderValid = () => {
        const validation = this.state.validation;
        let providerValid = true;

        for (let key in validation) {
            providerValid = validation[key] && providerValid;
        }

        this.props.providerValidChange(providerValid);
    };

    validatorListener = propName => isValid => {
        this.setState(prevState => {
            return {
                validation: {
                    ...prevState.validation,
                    [propName]: isValid
                }
            }
        }, this.updateProviderValid);
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

    render() {
        const {provider, loading, error, confirmError, providerValid, classes} = this.props;
        const id = this.props.match.params.id;

        return (
            <section className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography type="title" className={classes.marginBottom}>
                        <span>Настройки</span>
                    </Typography>
                    <ValidatorForm className={classes.form} onSubmit={() => {
                    }}>
                        <div className={classes.item}>
                            <label className={classes.label}>
                                Введите имя поставщика (обязательно):
                            </label>
                            <TextValidator
                                ref="name"
                                hintText="Пример: RoyalToys"
                                onChange={this.changeHandler}
                                onBlur={this.handleBlur}
                                name="name"
                                value={provider.name}
                                validators={['required']}
                                errorMessages={['Обязательное поле!']}
                                validatorListener={this.validatorListener("name")}
                            />
                        </div>

                        <div className={classes.item}>
                            <label className={classes.label}>
                                Введите сайт поставщика (обязательно):
                            </label>
                            <TextValidator
                                ref="url"
                                hintText="Пример: http://royaltoys.com.ua"
                                onChange={this.changeHandler}
                                onBlur={this.handleBlur}
                                name="url"
                                value={provider.url}
                                validators={['required', 'matchRegexp:https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)']}
                                errorMessages={['Обязательное поле!', 'Неверный формат ссылки!']}
                                validatorListener={this.validatorListener("url")}
                            />
                        </div>

                        <div className={classes.item}>
                            <label className={classes.label}>
                                Введите уникальный префикс поставщика (обязательно):
                            </label>
                            <TextValidator
                                ref="prefix"
                                hintText="Пример: rt"
                                onChange={this.changeHandler}
                                onBlur={this.handleBlur}
                                name="prefix"
                                value={provider.prefix}
                                validators={['required', 'matchRegexp:^[a-zA-Z]+$']}
                                errorMessages={['Обязательное поле!', 'Только английские буквы!']}
                                validatorListener={this.validatorListener("prefix")}
                            />
                        </div>

                        <div className={classes.item}>
                            <label className={classes.label}>
                                Номер колонки в Excel с названием позиции (обязательно):
                            </label>
                            <TextValidator
                                ref="titleCell"
                                hintText="Пример: А"
                                onChange={this.changeHandler}
                                onBlur={this.handleBlur}
                                name="titleCell"
                                value={provider.settings.titleCell}
                                validators={['required', 'maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$']}
                                errorMessages={['Обязательное поле!', 'Максимум 1 символ', 'Только английские буквы!']}
                                validatorListener={this.validatorListener("titleCell")}
                            />
                        </div>

                        <div className={classes.item}>
                            <label className={classes.label}>
                                Номер колонки в Excel с артикулом (обязательно):
                            </label>
                            <TextValidator
                                ref="vendorCodeCell"
                                hintText="Пример: B"
                                onChange={this.changeHandler}
                                onBlur={this.handleBlur}
                                name="vendorCodeCell"
                                value={provider.settings.vendorCodeCell}
                                validators={['required', 'maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$']}
                                errorMessages={['Обязательное поле!', 'Максимум 1 символ', 'Только английские буквы!']}
                                validatorListener={this.validatorListener("vendorCodeCell")}
                            />
                        </div>

                        <div className={classes.item}>
                            <label className={classes.label}>
                                Номер колонки в Excel с ценой (обязательно):
                            </label>
                            <TextValidator
                                ref="priceCell"
                                hintText="Пример: C"
                                onChange={this.changeHandler}
                                onBlur={this.handleBlur}
                                name="priceCell"
                                value={provider.settings.priceCell}
                                validators={['required', 'maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$']}
                                errorMessages={['Обязательное поле!', 'Максимум 1 символ', 'Только английские буквы!']}
                                validatorListener={this.validatorListener("priceCell")}
                            />
                        </div>

                        <div className={classes.item}>
                            <label className={classes.label}>
                                Номер колонки в Excel с рекомендованной ценой (опционально):
                            </label>
                            <TextValidator
                                ref="recommendedPriceCell"
                                hintText="Пример: D"
                                onChange={this.changeHandler}
                                onBlur={this.handleBlur}
                                name="recommendedPriceCell"
                                value={provider.settings.recommendedPriceCell}
                                validators={['maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$']}
                                errorMessages={['Максимум 1 символ', 'Только английские буквы!']}
                                validatorListener={this.validatorListener("recommendedPriceCell")}
                            />
                        </div>

                        <div className={classes.item}>
                            <label className={classes.label}>
                                Номер колонки в Excel с описанием (опционально):
                            </label>
                            <TextValidator
                                ref="descriptionCell"
                                hintText="Пример: E"
                                onChange={this.changeHandler}
                                onBlur={this.handleBlur}
                                name="descriptionCell"
                                value={provider.settings.descriptionCell}
                                validators={['maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$']}
                                errorMessages={['Максимум 1 символ', 'Только английские буквы!']}
                                validatorListener={this.validatorListener("descriptionCell")}
                            />
                        </div>

                        <div className={classes.item}>
                            <label className={classes.label}>
                                Номер колонки в Excel с остатками (опционально):
                            </label>
                            <TextValidator
                                ref="countCell"
                                hintText="Пример: F"
                                onChange={this.changeHandler}
                                onBlur={this.handleBlur}
                                name="countCell"
                                value={provider.settings.countCell}
                                validators={['maxStringLength:1', 'matchRegexp:^[a-zA-Z]+$']}
                                errorMessages={['Максимум 1 символ', 'Только английские буквы!']}
                                validatorListener={this.validatorListener("countCell")}
                            />
                        </div>
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
                    </ValidatorForm>
                </Paper>

                <Dialog
                    open={!!error}
                    onBackdropClick={confirmError}
                >
                    <DialogTitle className={classes.dialogTitle}>
                        <Icon className={classNames("material-icons",
                            classes.dialogTitleIcon)}
                        >
                            error_outline
                        </Icon>
                        Ошибка!
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            {error && error.response ? error.response.data : 'Что-то пошло не так... '}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="secondary"
                            onClick={confirmError}
                        >
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <Progress show={loading}/>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        provider: state.provider.data,
        providerValid: state.provider.providerValid,
        loading: state.provider.loading,
        error: state.provider.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        providerDataChange: (propName, propValue) => dispatch(providerDataChange(propName, propValue)),
        providerSettingsChange: (propName, propValue) => dispatch(providerSettingsChange(propName, propValue)),
        providerValidChange: (isValid) => dispatch(providerValidChange(isValid)),
        createProvider: () => dispatch(createProvider()),
        updateProvider: (id) => dispatch(updateProvider(id)),
        confirmError: () => dispatch(confirmError()),
        loadProvider: (id) => dispatch(loadProvider(id))
    }
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhance(Form);