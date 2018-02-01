import React from 'react';

import Wrapper from '../../hoc/Wrapper';
import Header from "../../Components/Header/Header";

const style = {
    margin: '15px 0'
};

const layout = props => {

    return (
        <Wrapper>
            <Header/>
            <main style={style} className="cf">
                {props.children}
            </main>
        </Wrapper>
    )
};

export default layout;