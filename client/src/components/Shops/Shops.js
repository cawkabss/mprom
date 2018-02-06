import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import ShopsList from './ShopsList/ShopsList';
import ShopsForm from './ShopsForm/ShopsForm';
import ShopDashboard from "./ShopDashboard/ShopDashboard";

class Shops extends Component {
    render() {
        return(
            <Switch>
                <Route path="/shops" exact component={ShopsList}/>
                <Route path="/shops/new" exact component={ShopsForm}/>
                <Route path="/shops/:id" component={ShopDashboard}/>
            </Switch>
        )
    }
}

export default Shops;