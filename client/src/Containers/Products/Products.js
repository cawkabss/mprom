import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from "recompose";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    withMobileDialog,
    withStyles, Typography
} from "material-ui-next";

import ProductsHeader from "./ProductsHeader";
import ProductCard from "./ProductCard";
import Progress from "../../UI/Progress/Progress";
import {productsListClear, loadProductsList} from "../../store/actions/products/actions";
import ProductsTable from "./ProductsTable";

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
        showModal: false,
        selectedProduct: ''
    };

    componentWillUnmount() {
        this.props.productsListClear();
    }

    selectedProductHandler = (rowData, productIndex) => {

        const selectedProduct = this.props.productsList[rowData.id];
        this.setState({
            showModal: true,
            selectedProduct
        });
    };

    handleClose = () => {
        this.setState({showModal: false});
    };

    createOrderHandler = (product) => {
        this.props.history.replace(`/orders/create?product=${product._id}`);
    };

    render() {
        const {selectedProduct} = this.state;
        const {productsList, loading, classes, fullScreen} = this.props;

        return (
            <section className={classes.root}>
                <ProductsHeader className={classes.margin}/>
                <Typography>
                    *Для просмотра детальной информации или оформлении заказа сделайте двойной клик мышкой на товаре.
                </Typography>
                <ProductsTable
                    productsList={productsList}
                    selectedProductHandler={this.selectedProductHandler}
                />
                <Progress show={loading}/>
                <Dialog
                    classes={{
                        fullWidth: classes.fullWidth
                    }}
                    fullScreen={fullScreen}
                    maxWidth={false}
                    fullWidth={true}
                    open={this.state.showModal}
                    onBackdropClick={this.handleClose}
                >
                    <DialogContent>
                        <ProductCard selectedProduct={selectedProduct}/>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button
                            raised
                            onClick={this.handleClose}
                            color="secondary"
                        >
                            Закрыть
                        </Button>
                        <Button
                            raised
                            color="primary"
                            onClick={() => this.createOrderHandler(selectedProduct)}
                        >
                            Оформить заказ
                        </Button>
                    </DialogActions>
                </Dialog>
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