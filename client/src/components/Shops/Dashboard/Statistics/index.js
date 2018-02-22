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
import {loadShopStatistics} from "../../../../AC/shops/index";
import Wrapper from "../../../../hoc/Wrapper";
import Progress from "../../../../UI/Progress/Progress";

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

        const infoCardsData = [
            {
                icon: 'view_carousel',
                color: yellow[600],
                title: "Всех товаров",
                value: productsCount
            },
            {
                icon: 'shopping_basket',
                color: purple[600],
                title: "Количество заказов",
                value: ordersCount
            }
        ];

        return (
            <Wrapper>
                <Paper className={classes.paper}>
                    <Typography type="title" className={classes.title}>
                        Статистика
                    </Typography>
                    <Grid container spacing={24}>
                        {
                            infoCardsData.map(item => (
                                <Grid key={item.title} item xs={12} sm={6} md={4}>
                                    <InfoCard icon={item.icon}
                                              color={item.color}
                                              title={item.title}
                                              value={item.value}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Paper>

                <Progress show={loading} />
            </Wrapper>
        )
    }
}

const mapStateToProps = state => (
    {
        productsCount: state.shops.statistics.productsCount,
        ordersCount: state.shops.statistics.ordersCount,
        loading: state.shops.statistics.loading
    }
);

const mapDispatchToProps = dispatch => (
    {
        loadShopStatistics: (id) => dispatch(loadShopStatistics(id))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopStatistics));
