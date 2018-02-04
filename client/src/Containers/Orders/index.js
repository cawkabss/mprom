import React from 'react';
import {Route} from "react-router-dom";

import Dashboard from "./Dashboard";
import Form from "./Form";
import Wrapper from "../../hoc/Wrapper";

const orders = props => (
    <Wrapper>
        <Route path="/orders" exact component={Dashboard}/>
        <Route path="/orders/create" component={Form}/>
    </Wrapper>
);

export default orders;