import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Icon,
    withStyles,
    Collapse
} from "material-ui-next";

import OrdersFilter from "./OrdersFilter";
import OrdersStatistics from './OrdersStatistics/OrdersStatistics'
import OrdersTable from "./OrdersTable";
import Progress from "../../../UI/Progress/Progress";
import {clearOrdersList} from "../../../store/actions/orders/actions";

const styles = {
    root: {
        padding: '0 15px'
    },

    margin: {
        marginBottom: 15
    }
};

class OrdersDashboard extends Component{

    state = {
        showStatistics: false,
    };

    componentWillUnmount(){
        this.props.clearOrdersList();
    }

    toggleStatisticsHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                showStatistics: !prevState.showStatistics
            }
        })
    };

    render(){
        const {filteredOrders, loading, classes} = this.props;
        const {showStatistics} = this.state;

        return (
            <section className={classes.root}>
                <OrdersFilter className={classes.margin}/>

                <div className={classes.margin}>
                    <Button
                        onClick={this.toggleStatisticsHandler}
                        fullWidth={true}
                    >
                        Статистика
                        <Icon className="material-icons">
                            {showStatistics ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                        </Icon>
                    </Button>
                    <Collapse in={this.state.showStatistics}>
                        <OrdersStatistics />
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
        clearOrdersList: () => dispatch(clearOrdersList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrdersDashboard));