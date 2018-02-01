import React, { Component } from 'react';
import { connect } from 'react-redux';
import {DatePicker} from "material-ui";
import {
    MenuItem,
    Button,
    Paper,
    Checkbox,
    ListItemText,
    Select,
    Input,
    InputLabel,
    FormControl,
    withStyles
} from "material-ui-next";
import classNames from 'classnames';

import {loadProvidersList} from "../../../store/actions/providers/actions";
import {getOrdersList} from "../../../store/actions/orders/actions";

const styles = theme => (
    {
        root: {
            padding: 15
        },

        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',

            [theme.breakpoints.up('md')]:{
                flexDirection: 'row'
            }
        },

        item: {
            margin: '0 0 15px',

            [theme.breakpoints.up('md')]:{
                margin: 0
            }
        },

        action: {
            width: '100%',

            [theme.breakpoints.up('md')]:{
                width: 'auto'
            }
        },

        select:{
            width: '100%',
            maxWidth: 150
        }
    }
);

class OrdersFilter extends Component {

    state = {
        minDate: new Date(),
        maxDate: new Date(),
        providers: [],
        paidMethods:[],
        deliveryMethods: []
    };

    componentDidMount(){
        if(!this.props.providersList.length){
            this.props.loadProvidersList()
        }

        this.props.getOrdersList(this.state);
    }

    handleChangeMinDate = (event, date) => {
        this.setState({
            minDate: date,
        });
    };

    handleChangeMaxDate = (event, date) => {
        this.setState({
            maxDate: date,
        });
    };

    filterOrdersHandler = () => {
        this.props.getOrdersList(this.state);
    };



    formatMinDate = (date) => {
        const formatedDate = date;
        const options = {
            year: 'numeric',
            day: 'numeric',
            month: 'numeric',

        };
        formatedDate.setHours(0, 0, 0, 0);
        return formatedDate.toLocaleString("ru", options)
    };

    formatMaxDate = (date) => {
        const formatedDate = date;
        const options = {
            year: 'numeric',
            day: 'numeric',
            month: 'numeric',

        };
        formatedDate.setHours(23, 59, 59, 59);
        return formatedDate.toLocaleString("ru", options)
    };

    selectChangeHandler = propName => event => {
        this.setState({ [propName]: [...event.target.value] });
    };

    render() {
        const {classes, className} = this.props;

        return (
            <Paper className={classNames(classes.root, className)}>
                <form onSubmit={this.searchHandler} className={classes.form}>
                    <DatePicker
                        name="minDate"
                        formatDate={this.formatMinDate}
                        className={classes.item}
                        onChange={this.handleChangeMinDate}
                        autoOk={false}
                        defaultDate={this.state.minDate}
                        disableYearSelection={false}
                    />
                    <DatePicker
                        name="maxDate"
                        locale="en-US"
                        formatDate={this.formatMaxDate}
                        className={classes.item}
                        onChange={this.handleChangeMaxDate}
                        autoOk={false}
                        defaultDate={this.state.maxDate}
                        disableYearSelection={false}
                    />
                    <FormControl className={classNames(classes.select, classes.item)}>
                        <InputLabel htmlFor="select-provider">Поставщик</InputLabel>
                        <Select
                            multiple
                            autoWidth
                            value={[...this.state.providers]}
                            onChange={this.selectChangeHandler('providers')}
                            input={<Input id="select-provider" />}
                            renderValue={selected => selected.join(', ')}
                        >
                            {this.props.providersList.map(provider => (
                                <MenuItem key={provider._id} value={provider.name}>
                                    <Checkbox checked={
                                        this.state.providers.indexOf(provider.name) > -1
                                    } />
                                    <ListItemText primary={provider.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classNames(classes.select, classes.item)}>
                        <InputLabel htmlFor="select-paidMethod">Оплата</InputLabel>
                        <Select
                            multiple
                            autoWidth
                            value={[...this.state.paidMethods]}
                            onChange={this.selectChangeHandler('paidMethods')}
                            input={<Input id="select-paidMethod" />}
                            renderValue={selected => selected.join(', ')}
                        >
                                <MenuItem value="Наложка">
                                    <Checkbox checked={
                                        this.state.paidMethods.indexOf('Наложка') > -1
                                    } />
                                    <ListItemText primary="Наложка" />
                                </MenuItem>
                            <MenuItem value="Наличка">
                                <Checkbox checked={
                                    this.state.paidMethods.indexOf('Наличка') > -1
                                } />
                                <ListItemText primary="Наличка" />
                            </MenuItem>
                            <MenuItem value="Предоплата">
                                <Checkbox checked={
                                    this.state.paidMethods.indexOf('Предоплата') > -1
                                } />
                                <ListItemText primary="Предоплата" />
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classNames(classes.select, classes.item)}>
                        <InputLabel htmlFor="select-deliveryMethod">Доставка</InputLabel>
                        <Select
                            multiple
                            autoWidth
                            value={[...this.state.deliveryMethods]}
                            onChange={this.selectChangeHandler('deliveryMethods')}
                            input={<Input id="select-deliveryMethod" />}
                            renderValue={selected => selected.join(', ')}
                        >
                            <MenuItem value="НП">
                                <Checkbox checked={
                                    this.state.deliveryMethods.indexOf('НП') > -1
                                } />
                                <ListItemText primary="НП" />
                            </MenuItem>
                            <MenuItem value="Курьер">
                                <Checkbox checked={
                                    this.state.deliveryMethods.indexOf('Курьер') > -1
                                } />
                                <ListItemText primary="Курьер" />
                            </MenuItem>
                            <MenuItem value="Самовывоз">
                                <Checkbox checked={
                                    this.state.deliveryMethods.indexOf('Самовывоз') > -1
                                } />
                                <ListItemText primary="Самовывоз" />
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        raised
                        color="primary"
                        className={classes.action}
                        onClick={ this.filterOrdersHandler }
                    >
                        Показать
                    </Button>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return {
        providersList: state.providers.providersList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrdersList: (settings) => dispatch(getOrdersList(settings)),
        loadProvidersList: () => dispatch(loadProvidersList()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrdersFilter));