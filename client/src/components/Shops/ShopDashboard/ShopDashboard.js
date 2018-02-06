import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";
import {withStyles} from 'material-ui-next';

import ShopControls from "./ShopControls";
import ShopsForm from "../ShopsForm/ShopsForm";
import ShopStatistics from "./ShopStatistics";
import {shopClearState} from "../../../store/actions/shops/actions";

const styles = {
    root: {
        padding: '0 15px'
    },

    paper: {
        padding: 12,
        textAlign: 'center',
        marginBottom: 3
    }
};

class ShopDashboard extends Component {

    componentWillUnmount() {
        this.props.shopClearState()
    }

    render() {
        const classes = this.props.classes;

        return (
            <section className={classes.root}>
                <ShopControls/>
                <Switch>
                    <Route path="/shops/:id" exact component={ShopStatistics}/>
                    <Route path="/shops/:id/edit" exact component={ShopsForm}/>
                </Switch>
            </section>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        shopClearState: () => dispatch(shopClearState())
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(ShopDashboard));
