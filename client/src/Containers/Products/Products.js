import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    withMobileDialog,
    withStyles
} from "material-ui-next";

import ProductsHeader from "./ProductsHeader";
import ProductCard from "./ProductCard";
import DataTable from "../../UI/DataTable/DataTable";
import Progress from "../../UI/Progress/Progress";
import {productsListClear, loadProductsList} from "../../store/actions/products/actions";

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

const styles = theme => (
    {
        root:{
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

class Products extends Component{

    state = {
        showModal: false,
        selectedProduct: ''
    };

    componentWillUnmount(){
        this.props.productsListClear();
    }

    handleOpen = (rowData, productIndex) => {

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

    render(){
        const {selectedProduct} = this.state;
        const {productsList, loading, classes, fullScreen} = this.props;
        const transformedProducts = productsList
            .map((product, i) => {
                return {
                    id: i,
                    image: <img alt="img" style={{height: '100%'}} src={product.images[0]}/>,
                    title: product.title,
                    vendorCode: product.vendorCode,
                    provider: <a href={product.provider.url} target="_blank">{product.provider.name}</a>,
                    providerPrice: product.price.providerPrice,
                    markup: product.price.markup,
                    ourPrice: product.price.ourPrice,
                    available: product.available,
                    count: product.count,
                    ordersCount: product.orders.length
                }
            });

        return (
            <section className={classes.root}>
                <ProductsHeader className={classes.margin}/>

                <DataTable
                    columns={TABLE_COLUMNS}
                    data={transformedProducts}
                    showPagination={true}
                    showRowHover={true}
                    onCellDoubleClick={this.handleOpen}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                />

                <Progress show={loading} />
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
                        <ProductCard selectedProduct={selectedProduct} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withMobileDialog()(Products)));