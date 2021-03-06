import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from "recompose";
import {
    withMobileDialog,
    withStyles,
    Typography
} from "material-ui-next";

import Filter from "./Filter";
import DataTable from "../../UI/DataTable/DataTable";
import Modal from "./Modal";
import Progress from "../../UI/Progress/Progress";
import {productsListClear, loadProductsList, confirmErrorHandler} from "../../AC/products";
import {transformedProductsSelector} from '../../selectors/productsSelector';
import withErrorHandler from "../../hoc/WithErrorHandler";

const styles = theme => (
    {
        root: {
            padding: '0 15px'
        },

        margin: {
            marginBottom: 15
        },

        fullWidth: {
            maxWidth: '100%',

            [theme.breakpoints.up('sm')]: {
                maxWidth: '80%'
            }
        },

        actions: {
            justifyContent: 'center'
        }
    }
);

const TABLE_COLUMNS = [
    {
        key: 'image',
        label: 'Фото',
    },
    {
        key: 'title',
        label: 'Название',
    },
    {
        key: 'vendorCode',
        label: 'Артикул'
    },
    {
        key: 'provider',
        label: 'Поставщик',
    },
    {
        key: 'providerPrice',
        label: 'Оптовая цена',
        sortable: true
    },
    {
        key: 'markup',
        label: 'Наценка',
        sortable: true
    },
    {
        key: 'ourPrice',
        label: 'Наша цена',
        sortable: true
    },
    {
        key: 'available',
        label: 'Наличие',
    },
    {
        key: 'count',
        label: 'Остаток',
    },
    {
        key: 'ordersCount',
        label: 'Заказы',
        sortable: true
    }
];

class Products extends Component {

    state = {
        isOpenModal: false,
        selectedProduct: ''
    };

    componentWillUnmount() {
        this.props.productsListClear();
    }

    selectedProductHandler = (rowData, productIndex) => {

        const selectedProduct = this.props.productsList[rowData.id];
        this.setState({
            isOpenModal: true,
            selectedProduct
        });
    };

    closeModalHandler = () => {
        this.setState({isOpenModal: false});
    };

    createOrderHandler = (product) => {
        this.props.history.replace(`/orders/create?product=${product._id}`);
    };

    render() {
        const {selectedProduct, isOpenModal} = this.state;
        const {transformedProductsList, loading, classes} = this.props;

        return (
            <section className={classes.root}>
                <Filter className={classes.margin}/>
                <Typography>
                    *Для просмотра детальной информации или оформлении заказа сделайте двойной клик мышкой на товаре.
                </Typography>
                <DataTable
                    columns={TABLE_COLUMNS}
                    data={transformedProductsList}
                    showPagination={true}
                    showRowHover={true}
                    onCellDoubleClick={this.selectedProductHandler}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                />
                <Progress show={loading}/>
                <Modal
                    isOpen={isOpenModal}
                    handleClose={this.closeModalHandler}
                    selectedProduct={selectedProduct}
                    createOrderHandler={this.createOrderHandler}
                />
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productsList: state.products.list.data,
        transformedProductsList: transformedProductsSelector(state),
        loading: state.products.list.loading,
        error: state.products.list.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        productsListClear: () => dispatch(productsListClear()),
        loadProductsList: () => dispatch(loadProductsList()),
        confirmErrorHandler: () => dispatch(confirmErrorHandler())
    }
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withMobileDialog(),
    withErrorHandler
);

export default enhance(Products);