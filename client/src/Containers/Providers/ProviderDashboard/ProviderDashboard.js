import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";
import {withStyles} from 'material-ui-next';

import ProviderControls from "./ProviderControls";
import ProviderStatistics from "./ProviderStatistics";
import ProviderUploadPrice from "./ProviderUploadPrice";
import {providerClearData} from "../../../store/actions/providers/actions";
import ProviderForm from "../ProviderForm/ProviderForm";

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

    componentWillUnmount() {
        this.props.providerClearData()
    }

    render() {
        const classes = this.props.classes;

        return (
            <section className={classes.root}>
                <ProviderControls/>
                <Switch>
                    <Route path="/providers/:id" exact component={ProviderStatistics}/>
                    <Route path="/providers/:id/edit" exact component={ProviderForm}/>
                    <Route path="/providers/:id/upload-price" exact component={ProviderUploadPrice}/>
                </Switch>
            </section>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        providerClearData: () => dispatch(providerClearData())
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(ProviderDashboard));
