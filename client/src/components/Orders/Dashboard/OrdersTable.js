import React, { Component } from 'react';
import {connect} from 'react-redux';
import Snackbar from "material-ui-next/Snackbar";
import { orange, green, pink } from 'material-ui-next/colors';

import Wrapper from "../../../hoc/Wrapper";
import DataTable from "../../../UI/DataTable/DataTable";
import {deleteOrders, updateOrders} from "../../../AC/orders";
import {ordersListSelector} from "../../../selectors/ordersSelectors";

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
        key: 'price',
        label: 'Стоимость'
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
        this.props.updateOrders(orders, status)
            .then(() => this.openSnackbarHandler('Статус выбранных заказов успешно изменен!'));
    };

    deleteHandler = (orders) => {
        this.props.deleteOrders(orders)
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
                    data={orders}
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

const mapStateToProps = state => (
    {
        orders: ordersListSelector(state)
    }
);

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrders: (orders, status) => dispatch(updateOrders(orders, status)),
        deleteOrders: (orders) => dispatch(deleteOrders(orders)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);
