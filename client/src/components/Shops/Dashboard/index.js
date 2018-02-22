import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";
import {withStyles} from 'material-ui-next';

import ShopControls from "./Controls";
import ShopsForm from "../Form";
import ShopStatistics from "./Statistics";
import {getShopData, shopClearState} from "../../../AC/shops";
import Instagram from "./Instagram";

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

class Dashboard extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getShopData(id);
    }

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
                    <Route path="/shops/:id/edit" component={ShopsForm}/>
                    <Route path="/shops/:id/instagram"  component={Instagram}/>
                </Switch>
            </section>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getShopData: (id) => dispatch(getShopData(id)),
        shopClearState: () => dispatch(shopClearState())
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Dashboard));
