import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Paper,
    Grid,
    Typography,
    withStyles
} from 'material-ui-next';
import {yellow, purple} from "material-ui-next/colors";

import InfoCard from "./InfoCard";
import {loadShopStatistics} from "../../../store/actions/shops/actions";
import Wrapper from "../../../hoc/Wrapper";
import Progress from "../../../UI/Progress/Progress";

const styles = {
    paper: {
        padding: 12,
        textAlign: 'center',
        marginBottom: 3
    },

    title: {
        marginBottom: 15,
        textAlign: 'center'
    }
};

class ShopStatistics extends Component {
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.loadShopStatistics(id);
    }

    render() {
        const {productsCount, ordersCount, loading, classes} = this.props;
        return (
            <Wrapper>
                <Paper className={classes.paper}>
                    <Typography type="title" className={classes.title}>
                        Статистика
                    </Typography>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6} md={4}>
                            <InfoCard icon={'view_carousel'}
                                      color={yellow[600]}
                                      title="Всех товаров"
                                      value={productsCount}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <InfoCard icon={'shopping_basket'}
                                      color={purple[600]}
                                      title="Количество заказов"
                                      value={ordersCount}/>
                        </Grid>
                    </Grid>
                </Paper>

                <Progress show={loading} />
            </Wrapper>
        )
    }
}

const mapStateToProps = state => (
    {
        productsCount: state.shop.productsCount,
        ordersCount: state.shop.ordersCount,
        loading: state.shop.loading
    }
);

const mapDispatchToProps = dispatch => (
    {
        loadShopStatistics: (id) => dispatch(loadShopStatistics(id))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopStatistics));
