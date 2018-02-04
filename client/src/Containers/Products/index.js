import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from "recompose";
import {
    withMobileDialog,
    withStyles,
    Typography
} from "material-ui-next";

import Filter from "./Filter";
import Progress from "../../UI/Progress/Progress";
import ProductsTable from "./ProductsTable";
import Modal from "./Modal";
import {productsListClear, loadProductsList} from "../../store/actions/products/actions";

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
        const {productsList, loading, classes} = this.props;

        return (
            <section className={classes.root}>
                <Filter className={classes.margin}/>
                <Typography>
                    *Для просмотра детальной информации или оформлении заказа сделайте двойной клик мышкой на товаре.
                </Typography>
                <ProductsTable
                    productsList={productsList}
                    selectedProductHandler={this.selectedProductHandler}
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
        productsList: state.products.productsList,
        loading: state.products.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        productsListClear: () => dispatch(productsListClear()),
        loadProductsList: () => dispatch(loadProductsList())
    }
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withMobileDialog()
);

export default enhance(Products);