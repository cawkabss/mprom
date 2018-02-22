import React, {Component} from 'react';
import {Checkbox, Button, Typography} from "material-ui-next";
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Wrapper from "../../../hoc/Wrapper";
import ProductCard from "../ProductCard";
import {saveResultProduct} from "../../../AC/search";

class ResultProduct extends Component {

    state = {
        canNext: false
    };

    checkHandler = (e) => {
        this.setState({
            canNext: !e.target.checked
        })
    };

    render() {

        const {
            parsedProduct,
        } = this.props;

        const actions = [
            <Wrapper>
                <Button
                    raised
                    color="primary"
                    onClick={this.props.saveResultProduct}
                    disabled={
                        !this.state.canNext &&
                        (
                            !parsedProduct.images.length ||
                            !parsedProduct.properties.length ||
                            !parsedProduct.description.html ||
                            !parsedProduct.keywords ||
                            !parsedProduct.category
                        )}>
                    Далее
                </Button>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Checkbox
                        onChange={this.checkHandler}
                        checked={!this.state.canNext}
                    />
                    <Typography>
                        Продолжить только при полном заполнении!
                    </Typography>
                </div>
            </Wrapper>
        ];

        return (
            <ProductCard product={parsedProduct} actions={actions}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        parsedProduct: state.search.parsing.parsedProduct,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveResultProduct: () => dispatch(saveResultProduct())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResultProduct));