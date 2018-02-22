import React from 'react';
import {createSelector} from "reselect";
import {mapToArr} from "../helpers";
import {NavLink} from "react-router-dom";

const formControlsGetter = state => state.orders.form.controls;
const formProductsGetter = state => state.orders.form.product;
const ordersGetter = state => mapToArr(state.orders.list.data);

const validateOrderData = controls => {
    let orderValid = true;
    for (let key in controls) {
        orderValid = controls[key].validations.isValid && orderValid;
    }

    return orderValid;
};

const transformProductData = product => {
    return !product ? [] :
        [product].map((product) => {
            return {
                image: <img alt="img" style={{height: '100%'}} src={product.images[0]}/>,
                title: product.title,
                vendorCode: product.vendorCode,
                provider: <a href={product.provider.url} target="_blank">{product.provider.name}</a>,
                providerPrice: product.price.providerPrice,
                markup: product.price.markup,
                ourPrice: product.price.ourPrice,
                available: product.available,
                count: product.count,
                orderCount: product.orderCount
            }
        });
};

const transformOrdersData = orders => {
    return orders.map(order => {
        const orderDate = new Date(order.createTime);

        return {
            id: order._id,
            date: orderDate.toLocaleString("ru", {day: '2-digit', month: '2-digit', year: '2-digit'}),
            orderNumber: order.data.orderNumber,
            customerName: order.data.customerName,
            customerPhone: order.data.customerPhone,
            customerEmail: order.data.customerEmail,
            deliveryMethod: order.data.deliveryMethod,
            paidMethod: order.data.paidMethod,
            product: (
                <NavLink to={`/products?find=${order.product.vendorCode}`}>
                    {order.product.vendorCode}
                </NavLink>
            ),
            price: order.product.price.ourPrice,
            markup: order.product.price.markup,
            status: order.status,
        }
    });
} ;

const detailOrdersStatistics = orders => {
    const allOrdersCount = orders.length;
    const doneOrders = orders.filter(order => order.status === 'Выполнен');
    const doneOrdersCount = doneOrders.length;
    const waitingProfit = orders.map(order => order.product.price.markup)
        .reduce((prev, next) => prev + next, 0);
    const profit = doneOrders.map(order => order.product.price.markup)
        .reduce((prev, next) => prev + next, 0);
    const turn = doneOrders.map(order => order.product.price.ourPrice)
        .reduce((prev, next) => prev + next, 0);
    const unfinished = allOrdersCount - doneOrdersCount;

    return {
        allOrdersCount,
        doneOrdersCount,
        waitingProfit,
        profit,
        turn,
        unfinished
    }
};

export const formControlsSelector = createSelector(formControlsGetter, controls => mapToArr(controls));
export const orderValidationSelector = createSelector(formControlsGetter, validateOrderData);
export const orderProductSelector = createSelector(formProductsGetter, transformProductData);
export const detailStatisticsSelector = createSelector(ordersGetter, detailOrdersStatistics);
export const ordersListSelector = createSelector(ordersGetter, transformOrdersData);
