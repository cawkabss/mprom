import React, {Component} from 'react';
import {compose} from "recompose";
import {connect} from "react-redux";
import {Paper, Grid, Typography, withStyles} from "material-ui-next";
import {
    cyan, pink, purple, orange, green, indigo
} from 'material-ui-next/colors';

import InfoCard from "../../../../UI/InfoCard/InfoCard";
import OrdersByMonth from "./OrdersByMonth";
import OrdersByYear from "./OrdersByYear";
import {getOrdersStatistics} from "../../../../AC/orders";
import {detailStatisticsSelector} from "../../../../selectors/ordersSelectors";
import Progress from "../../../../UI/Progress/Progress";


const styles = {
    root: {
        padding: 12,
        textAlign: 'center',
        marginBottom: 3
    }
};

class Statistics extends Component {

    componentDidMount() {
        this.props.getOrdersStatistics();
    }

    render() {
        const {classes, detailStatistics, ordersByLastYear, ordersByLastMonth, loading} = this.props;

        const infoCardsData = [
            {
                icon: 'access_time',
                color: orange[600],
                title: "Ожидаемая",
                value: `${detailStatistics.waitingProfit} грн.`
            },
            {
                icon: 'done_all',
                color: cyan[600],
                title: "Фактическая",
                value: `${detailStatistics.profit} грн.`
            },
            {
                icon: 'attach_money',
                color: purple[600],
                title: "Оборот",
                value: `${detailStatistics.turn} грн.`
            },
            {
                icon: 'shopping_cart',
                color: indigo[600],
                title: "Всех заказов",
                value: detailStatistics.allOrdersCount
            },
            {
                icon: 'add_shopping_cart',
                color: green[600],
                title: "Подтвержденных",
                value: detailStatistics.doneOrdersCount
            },
            {
                icon: 'remove_shopping_cart',
                color: pink[600],
                title: "Не подтвержденных",
                value: detailStatistics.unfinished
            }
        ];

        return (
            <Paper className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography type="title">
                            Общая
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <OrdersByMonth ordersByMonth={ordersByLastMonth}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <OrdersByYear ordersByYear={ordersByLastYear}/>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography type="title">
                            Детальная (за выбранный период)
                        </Typography>
                    </Grid>
                    {
                        infoCardsData.map(infoCardData => (
                            <Grid item xs={12} sm={6} md={4}>
                                <InfoCard icon={infoCardData.icon}
                                          color={infoCardData.color}
                                          title={infoCardData.title}
                                          value={infoCardData.value}/>
                            </Grid>
                        ))
                    }
                </Grid>
                <Progress show={loading} />
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return {
        detailStatistics: detailStatisticsSelector(state),
        ordersByLastYear: state.orders.statistics.ordersByLastYear,
        ordersByLastMonth: state.orders.statistics.ordersByLastMonth,
        loading: state.orders.statistics.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getOrdersStatistics: () => dispatch(getOrdersStatistics())
    }
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhance(Statistics);