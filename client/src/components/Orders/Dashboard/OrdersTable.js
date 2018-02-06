import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import Snackbar from "material-ui-next/Snackbar";
import { orange, green, pink } from 'material-ui-next/colors';

import Wrapper from "../../../hoc/Wrapper";
import DataTable from "../../../UI/DataTable/DataTable";
import {deleteOrders, updateOrders} from "../../../store/actions/orders/actions";

const TABLE_COLUMNS = [
    {
        key: 'date',
        label: 'Дата',
    },
    {
        key: 'orderNumber',
        label: 'Номер заказа/ТТН',
    },
    {
        key: 'customerName',
        label: 'Клиент',
    },
    {
        key: 'customerPhone',
        label: 'Телефон'
    },
    {
        key: 'customerEmail',
        label: 'E-mail'
    },
    {
        key: 'deliveryMethod',
        label: 'Доставка'
    },
    {
        key: 'paidMethod',
        label: 'Оплата'
    },
    {
        key: 'product',
        label: 'Товар (артикул)',
    },
    {
        key: 'markup',
        label: 'Выручка'
    },
    {
        key: 'status',
        label: 'Статус',
        sortable: true
    }
];

class OrdersTable extends Component{

    state = {
        snackbarOpen: false,
        snackbarMessage: ''
    };

    statusChangeHandler = (orders, status) => {

        const ordersForUpdate = this.props.orders
            .filter(order => orders.findIndex(i => i.id === order._id) > -1);

        this.props.updateOrders(ordersForUpdate, status)
            .then(() => this.openSnackbarHandler('Статус выбранных заказов успешно изменен!'));
    };

    deleteHandler = (orders) => {
        const ordersForDelete = this.props.orders
            .filter(order => orders.findIndex(i => i.id === order._id) > -1);

        this.props.deleteOrders(ordersForDelete)
            .then(() => this.openSnackbarHandler('Выбранные заказы успешно удалены!'))
    };

    openSnackbarHandler = (message) => {
        this.setState({
            snackbarOpen: true,
            snackbarMessage: message
        })
    };

    closeSnackbarHandler = () => {
        this.setState({snackbarOpen: false})
    };

    render(){
        const {orders} = this.props;

        const transformedOrders = orders.map((order) => {
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
                markup: order.product.price.markup,
                status: order.status,
            }
        });

        const toolbarActionsData = [
            {
                tooltip: 'Выполнен',
                handleClick: (orders) => this.statusChangeHandler(orders, 'Выполнен'),
                icon: 'thumb_up',
                iconColor: green[600]
            },
            {
                tooltip: 'Невыполнен',
                handleClick: (orders) => this.statusChangeHandler(orders, 'Невыполнен'),
                icon: 'thumb_down',
                iconColor: orange[600]
            },
            {
                tooltip: 'Удалить',
                handleClick: (orders) => this.deleteHandler(orders),
                icon: 'delete',
                iconColor: pink[600]
            }
        ];

        return (
            <Wrapper>
                <DataTable
                    columns={TABLE_COLUMNS}
                    data={transformedOrders}
                    showPagination={true}
                    showRowHover={true}
                    showToolbar={true}
                    showCheckboxes={true}
                    toolbarTitle={'Таблица заказов'}
                    toolbarActionsData={toolbarActionsData}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    autoHideDuration={2000}
                    onClose={this.closeSnackbarHandler}
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                />
            </Wrapper>
        )


    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrders: (orders, status) => dispatch(updateOrders(orders, status)),
        deleteOrders: (orders) => dispatch(deleteOrders(orders)),
    }
};

export default connect(null, mapDispatchToProps)(OrdersTable);
