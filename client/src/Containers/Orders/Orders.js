import React from 'react';
import {Route} from "react-router-dom";

import OrdersDashboard from "./OrdersDashboard/OrdersDashboard";
import OrderForm from "./OrderForm/OrderForm";
import Wrapper from "../../hoc/Wrapper";

const orders = props => (
    <Wrapper>
        <Route path="/orders" exact component={OrdersDashboard}/>
        <Route path="/orders/create" component={OrderForm}/>
    </Wrapper>
);

export default orders;