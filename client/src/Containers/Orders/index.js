import React from 'react';
import {Switch} from "react-router";
import {Route} from "react-router-dom";

import Dashboard from "./Dashboard";
import Form from "./Form";

const Orders = props => (
    <Switch>
        <Route path="/orders" exact component={Dashboard}/>
        <Route path="/orders/create" component={Form}/>
    </Switch>
);

export default Orders;