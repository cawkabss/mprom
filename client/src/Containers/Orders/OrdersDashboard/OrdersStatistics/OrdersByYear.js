import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Paper, Typography} from 'material-ui-next';
import {pink} from 'material-ui-next/colors';
import { ResponsiveContainer, BarChart, Bar,} from 'recharts';
import Tooltip from "recharts/es6/component/Tooltip";
import XAxis from "recharts/es6/cartesian/XAxis";
import {getStatisticsByYear} from "../../../../store/actions/orders/actions";

const styles = {
    paper: {
        backgroundColor: pink[600],
        height: 150
    },
    graphic: {
        height: 95,
        padding: '5px 15px 0 15px'
    },
    heading: {
        color: '#fff',
        backgroundColor: pink[500],
        padding: 10
    }
};

class OrdersByYear extends Component {

    componentDidMount() {
        this.props.getStatisticsByYear();
    }

    render() {
        const {ordersByLastYear} = this.props;
        return (
            <Paper style={styles.paper}>
                <Typography type="subheading" style={styles.heading}>
                    Заказы за последний год
                </Typography>
                <div style={styles.graphic}>
                    <ResponsiveContainer>
                        <BarChart data={ordersByLastYear.sort((a,b) => a.index - b.index)}>
                            <Bar dataKey="orders" fill={pink[500]}/>
                            <XAxis dataKey="name" stroke="none" tick={{fill: '#fff'}}/>
                            <Tooltip/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return {
        ordersByLastYear: state.orders.ordersByLastYear
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getStatisticsByYear: () => dispatch(getStatisticsByYear())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersByYear);