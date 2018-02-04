import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Paper, Button, withStyles, TextField} from "material-ui-next";
import classNames from 'classnames';

import {loadProductsList} from "../../store/actions/products/actions";
import {compose} from "recompose";

const styles = {
    root:{
        padding: 15
    },

    form: {
        display: 'flex'
    },

    input: {
        marginRight: 15
    },

    error: {
        border: '1px solid #ff643d'
    }

};

class Filter extends Component {

    state = {
        query: '',
        error: false
    };

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('find');

        if (query) {
            this.setState({query});
            this.props.loadProductsList(query);
        }
    }

    inputChangeHandler = (e) => {
        const query = e.target.value;
        this.setState({query});
    };

    searchHandler = (e) => {
        e.preventDefault();

        const query = this.state.query;

        if (query) {

            this.props.loadProductsList(query);
            this.props.history.push(`/products?find=${query}`);
            this.setState({
                error: false
            });
        } else {
            this.setState({
                error: true
            })
        }
    };

    render() {
        const {classes, className} = this.props;

        return (
            <Paper className={classNames(classes.root, className)}>
                <form className={classes.form} onSubmit={this.searchHandler}>
                    <TextField
                        fullWidth
                        error={this.state.error}
                        id="product-search"
                        placeholder="Введите артикул товара или слово 'all'"
                        className={classes.input}
                        value={this.state.query}
                        onChange={ this.inputChangeHandler }
                    />
                    <Button
                        raised
                        color="primary"
                        onClick={ this.searchHandler }
                    >
                        Поиск
                    </Button>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return {
        productsList: state.products.productsList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadProductsList: (query) => dispatch(loadProductsList(query))
    }
};

const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhance(Filter);