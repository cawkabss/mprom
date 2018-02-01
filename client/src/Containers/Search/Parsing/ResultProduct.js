import React, {Component} from 'react';
import {Checkbox, Button, Typography} from "material-ui-next";
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Wrapper from "../../../hoc/Wrapper";
import ProductCard from "../ProductCard";
import {saveResultProduct} from "../../../store/actions/search/actions";

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
            result,
        } = this.props;

        const actions = [
            <Wrapper>
                <Button
                    raised
                    color="primary"
                    onClick={this.props.saveResultProduct}
                    disabled={
                        !this.state.canNext &&
                        (!result.images.length ||
                            !result.properties.length ||
                            !result.description ||
                            !result.keywords ||
                            !result.category)
                    }>
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
            <ProductCard product={result} actions={actions}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        result: state.search.resultProduct,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveResultProduct: () => dispatch(saveResultProduct())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResultProduct));