import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import {connect} from 'react-redux';
import {compose} from "recompose";
import {withStyles} from 'material-ui-next';

import Controls from "./Controls";
import Statistics from "./Statistics";
import PriceManager from "./Price";
import Form from "../Form/index";
import {getProviderData, providerClearData} from "../../../AC/providers";
import Progress from "../../../UI/Progress/Progress";

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
        this.props.getProviderData(id);
    }

    componentWillUnmount() {
        this.props.providerClearData()
    }

    render() {
        const {loading, classes} = this.props;

        return (
            <section className={classes.root}>
                <Controls/>
                <Switch>
                    <Route path="/providers/:id" exact component={Statistics}/>
                    <Route path="/providers/:id/edit" exact component={Form}/>
                    <Route path="/providers/:id/price" exact component={PriceManager}/>
                </Switch>
                <Progress show={loading} />
            </section>
        )
    }
}

const mapStateToProps = state => (
    {
        loading: state.providers.form.loading
    }
);

const mapDispatchToProps = dispatch => (
    {
        getProviderData: (id) => dispatch(getProviderData(id)),
        providerClearData : () => dispatch(providerClearData())
    }
);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhance(ProviderDashboard);
