import React from 'react';
import {Route} from "react-router-dom";

import Wrapper from "../../hoc/Wrapper";
import Searching from "./Searching/Searching";
import Parsing from "./Parsing/Parsing";
import Captcha from "./Captcha/Captcha";

const search = props => (
    <Wrapper>
        <Route path="/search" exact component={Searching}/>
        <Route path="/search/providers/:providerId" component={Parsing}/>
        <Route path="/search/captcha" component={Captcha}/>
    </Wrapper>
);

export default search;