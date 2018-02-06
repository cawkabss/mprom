import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ProvidersList from './ProvidersList';
import Dashboard from "./Dashboard";
import Form from "./Form/Form";

const Providers = props => (
    <Switch>
        <Route path="/providers" exact component={ProvidersList}/>
        <Route path="/providers/new" exact component={Form}/>
        <Route path="/providers/:id" component={Dashboard}/>
    </Switch>

);


export default Providers;