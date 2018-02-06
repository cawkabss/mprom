import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from "recompose";
import {
    Button,
    Paper,
    withStyles
} from "material-ui-next";
import classNames from 'classnames';

import DateRange from "./DateRange";
import Selects from "./Selects";
import {loadProvidersList} from "../../../../store/actions/providers/actions";
import {getOrdersList} from "../../../../store/actions/orders/actions";

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

            [theme.breakpoints.up('md')]: {
                flexDirection: 'row'
            }
        },

        item: {
            margin: '0 0 15px',

            [theme.breakpoints.up('md')]: {
                margin: 0
            }
        },

        action: {
            width: '100%',

            [theme.breakpoints.up('md')]: {
                width: 'auto'
            }
        },

        select: {
            width: '100%',
            maxWidth: 150
        }
    }
);

class Filter extends Component {

    state = {
        minDate: new Date(),
        maxDate: new Date(),
        providers: [],
        paidMethods: [],
        deliveryMethods: []
    };

    componentDidMount() {
        if (!this.props.providersList.length) {
            this.props.loadProvidersList();
        }

        this.props.getOrdersList(this.state);
    }

    handleChangeDate =  type => (event, date) => {
        this.setState({
            [type]: date,
        });
    };

    filterOrdersHandler = () => {
        this.props.getOrdersList(this.state);
    };

    formatDate = type => date => {
        const formatedDate = date;
        const options = {
            year: 'numeric',
            day: 'numeric',
            month: 'numeric',
        };

        if (type === 'minDate') {
            formatedDate.setHours(0, 0, 0, 0);
        }
        else {
            formatedDate.setHours(23, 59, 59, 59);
        }

        return formatedDate.toLocaleString("ru", options);
    };

    selectChangeHandler = propName => event => {
        this.setState({[propName]: [...event.target.value]});
    };

    render() {
        const {providersList, classes, className} = this.props;
        const {minDate, maxDate, providers, paidMethods, deliveryMethods} = this.state;

        return (
            <Paper className={classNames(classes.root, className)}>
                <form onSubmit={this.searchHandler} className={classes.form}>
                    <DateRange
                        minDate={minDate}
                        maxDate={maxDate}
                        formatDate={this.formatDate}
                        handleChangeDate={this.handleChangeDate}
                    />
                    <Selects
                        providersList={providersList}
                        providers={providers}
                        paidMethods={paidMethods}
                        deliveryMethods={deliveryMethods}
                        selectChangeHandler={this.selectChangeHandler}
                    />
                    <Button
                        raised
                        color="primary"
                        className={classes.action}
                        onClick={this.filterOrdersHandler}
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

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhance(Filter);