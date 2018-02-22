import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import ShopsList from './ShopsList';
import Form from './Form';
import Dashboard from "./Dashboard";

class Shops extends Component {
    render() {
        return(
            <Switch>
                <Route path="/shops" exact component={ShopsList}/>
                <Route path="/shops/new" exact component={Form}/>
                <Route path="/shops/:id" component={Dashboard}/>
            </Switch>
        )
    }
}

export default Shops;