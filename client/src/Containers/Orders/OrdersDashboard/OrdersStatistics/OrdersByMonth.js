import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Paper, Typography} from 'material-ui-next';
import {purple} from 'material-ui-next/colors';
import {LineChart, Line, ResponsiveContainer} from 'recharts';
import Tooltip from "recharts/es6/component/Tooltip";
import XAxis from "recharts/es6/cartesian/XAxis";
import {getStatisticsByMonth} from "../../../../store/actions/orders/actions";

const styles = {
    paper: {
        backgroundColor: purple[500],
        height: 150,

    },
    graphic: {
        height: 95,
        padding: '5px 15px 0 15px'
    },
    heading: {
        color: '#fff',
        backgroundColor: purple[600],
        padding: 10,
    }
};

class OrdersByMonth extends Component {

    componentDidMount() {
        this.props.getStatisticsByMonth();
    }

    render(){
        const {ordersByLastMonth} = this.props;
        return (
            <Paper style={styles.paper}>
                <Typography type="subheading" style={styles.heading}>
                    За текущий месяц
                </Typography>
                <div style={styles.graphic}>
                    <ResponsiveContainer >
                        <LineChart data={ordersByLastMonth}>
                            <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} />
                            <XAxis dataKey="day" stroke="none" tick={{fill: '#fff'}}/>
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return{
        ordersByLastMonth: state.orders.ordersByLastMonth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getStatisticsByMonth: () => dispatch(getStatisticsByMonth())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersByMonth);