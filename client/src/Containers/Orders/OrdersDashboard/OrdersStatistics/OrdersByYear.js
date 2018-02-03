import React from 'react';
import {Paper, Typography} from 'material-ui-next';
import {pink} from 'material-ui-next/colors';
import { ResponsiveContainer, BarChart, Bar,} from 'recharts';
import Tooltip from "recharts/es6/component/Tooltip";
import XAxis from "recharts/es6/cartesian/XAxis";

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

const OrdersByYear = ({ordersByYear}) => (
    (
        <Paper style={styles.paper}>
            <Typography type="subheading" style={styles.heading}>
                Заказы за последний год
            </Typography>
            <div style={styles.graphic}>
                <ResponsiveContainer>
                    <BarChart data={ordersByYear.sort((a,b) => a.index - b.index)}>
                        <Bar dataKey="orders" fill={pink[500]}/>
                        <XAxis dataKey="name" stroke="none" tick={{fill: '#fff'}}/>
                        <Tooltip/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Paper>
    )
);

export default OrdersByYear;