import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import {connect} from 'react-redux';
import {compose} from "recompose";
import {withStyles} from 'material-ui-next';

import Controls from "./Controls";
import Statistics from "./Statistics";
import PriceManager from "./Price";
import Form from "../Form/Form";
import {loadProductsStatistics, providerClearData} from "../../../store/actions/providers/actions";

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

class ProviderDashboard extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.loadProductsStatistics(id);
    }

    componentWillUnmount() {
        this.props.providerClearData()
    }

    render() {
        const {classes} = this.props;

        return (
            <section className={classes.root}>
                <Controls/>
                <Switch>
                    <Route path="/providers/:id" exact component={Statistics}/>
                    <Route path="/providers/:id/edit" exact component={Form}/>
                    <Route path="/providers/:id/price" exact component={PriceManager}/>
                </Switch>
            </section>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProductsStatistics: (id) => dispatch(loadProductsStatistics(id)),
        providerClearData: () => dispatch(providerClearData())
    }
};

const enhance = compose(
    connect(null, mapDispatchToProps),
    withStyles(styles)
);

export default enhance(ProviderDashboard);
