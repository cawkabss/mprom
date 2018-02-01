import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import ProvidersList from './ProvidersList/ProvidersList';
import ProviderDashboard from "./ProviderDashboard/ProviderDashboard";
import ProviderForm from "./ProviderForm/ProviderForm";

class Providers extends Component {
    render() {
        return (
            <Switch>
                <Route path="/providers" exact component={ProvidersList}/>
                <Route path="/providers/new" exact component={ProviderForm}/>
                <Route path="/providers/:id" component={ProviderDashboard}/>
            </Switch>

        )
    }

}

export default Providers;