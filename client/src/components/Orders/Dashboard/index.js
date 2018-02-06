import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {
    Button,
    Icon,
    withStyles,
    Collapse
} from "material-ui-next";

import Filter from "./Filter";
import Statistics from './Statistics'
import OrdersTable from "./OrdersTable";
import Progress from "../../../UI/Progress/Progress";
import {clearOrdersList, confirmErrorHandler} from "../../../store/actions/orders/actions";
import {withState} from "recompose";
import withErrorHandler from "../../../hoc/WithErrorHandler";

const styles = {
    root: {
        padding: '0 15px'
    },

    margin: {
        marginBottom: 15
    }
};

class Dashboard extends Component {

    componentWillUnmount() {
        this.props.clearOrdersList();
    }

    render() {
        const {filteredOrders, showStatistics, toggleStatistics, loading, classes} = this.props;

        return (
            <section className={classes.root}>
                <Filter className={classes.margin}/>

                <div className={classes.margin}>
                    <Button
                        onClick={() => toggleStatistics(!showStatistics)}
                        fullWidth={true}
                    >
                        Статистика
                        <Icon className="material-icons">
                            {showStatistics ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                        </Icon>
                    </Button>
                    <Collapse in={showStatistics}>
                        <Statistics/>
                    </Collapse>
                </div>
                <OrdersTable
                    orders={filteredOrders}
                />
                <Progress show={loading}/>
            </section>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        filteredOrders: state.orders.filteredOrders,
        loading: state.orders.loading,
        error: state.orders.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearOrdersList: () => dispatch(clearOrdersList()),
        confirmErrorHandler: () => dispatch(confirmErrorHandler())
    }
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withState('showStatistics', 'toggleStatistics', false),
    withStyles(styles),
    withErrorHandler
);

export default enhance(Dashboard);