import React from 'react';
import {Paper, Grid, Typography, withStyles} from "material-ui-next";
import {
    cyan, pink, purple, orange, green, indigo
} from 'material-ui-next/colors';

import InfoCard from "./InfoCard";
import OrdersByMonth from "./OrdersByMonth";
import OrdersByYear from "./OrdersByYear";

const styles = {
    root: {
        padding: 12,
        textAlign: 'center',
        marginBottom: 3
    }
};

const ordersStatistics = (props) => {
    const classes = props.classes;

    const orders = props.filteredOrders;
    const allOrdersCount = orders.length;
    const doneOrders = orders.filter(order => order.status === 'Выполнен');
    const doneOrdersCount = doneOrders.length;
    const waitingProfit = orders.map(order => order.product.price.markup)
        .reduce((prev, next) => prev + next, 0);
    const profit = doneOrders.map(order => order.product.price.markup)
        .reduce((prev, next) => prev + next, 0);
    const turn = doneOrders.map(order => order.product.price.ourPrice)
        .reduce((prev, next) => prev + next, 0);

    return (
        <Paper className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Typography type="title">
                        Общая
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <OrdersByMonth/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <OrdersByYear/>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Typography type="title">
                        Детальная (за выбранный период)
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <InfoCard icon={'access_time'}
                              color={orange[600]}
                              title="Ожидаемая"
                              value={`${waitingProfit} грн.`}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <InfoCard icon={'done_all'}
                              color={cyan[600]}
                              title="Фактическая"
                              value={`${profit} грн.`}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <InfoCard icon={'attach_money'}
                              color={purple[600]}
                              title="Оборот"
                              value={`${turn} грн.`}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <InfoCard icon={'shopping_cart'}
                              color={indigo[600]}
                              title="Всех заказов"
                              value={allOrdersCount}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <InfoCard icon={'playlist_add_check'}
                              color={green[600]}
                              title="Подтвержденных"
                              value={doneOrdersCount}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <InfoCard icon={'remove_shopping_cart'}
                              color={pink[600]}
                              title="Не подтвержденных"
                              value={allOrdersCount - doneOrdersCount}/>
                </Grid>
            </Grid>
        </Paper>
    )
};

export default withStyles(styles)(ordersStatistics);