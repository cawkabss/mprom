import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, withStyles} from "material-ui-next";

import ShopsItem from "./ShopsItem";
import AddButtonCard from "../../../UI/ButtonCard/AddButtonCard";
import Progress from "../../../UI/Progress/Progress";
import {loadShopsList} from "../../../store/actions/shops/actions";

const styles = {
    root: {
        padding: '0 15px'
    }
};

class ShopsList extends Component{

    componentWillMount(){
        this.props.loadShopsList();
    }

    addNewShopHandler = () => {
        const path = this.props.match.path;
        this.props.history.push(`${ path }/new`);
    };

    render() {
        const {shopLoad, providersLoad, shopsList, classes} = this.props;

        return (

            <section className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AddButtonCard clicked={ this.addNewShopHandler}>Добавить магазин</AddButtonCard>
                    </Grid>
                    {
                        shopsList.map( shop => {
                            return (
                                <Grid
                                    key={shop._id}
                                    item xs={12} sm={6} md={4} lg={3}
                                >
                                    <ShopsItem shop={shop} />
                                </Grid>
                            )
                        } )
                    }
                </Grid>

                <Progress show={shopLoad || providersLoad} />
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shopsList: state.shops.shopsList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadShopsList: () => dispatch(loadShopsList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopsList));