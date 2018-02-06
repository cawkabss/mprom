import React from 'react';

import Wrapper from '../../hoc/Wrapper';
import Header from "../Header/Header";

const style = {
    margin: '15px 0'
};

const Layout = props => {

    return (
        <Wrapper>
            <Header/>
            <main style={style}>
                {props.children}
            </main>
        </Wrapper>
    )
};

export default Layout;