import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles, Paper, TextField, Button} from "material-ui-next";

import FinedProductsList from '../FinedProductsList/FinedProductList';
import Progress from "../../../UI/Progress/Progress";
import {search, searchingClearState} from "../../../store/actions/search/actions";

const styles = theme => (
    {
        root: {
            padding: '0 15px'
        },
        header: {
            marginBottom: 15
        },

        paper: {
            padding: 15
        },

        form: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column'
            }
        },

        item: {

            '&:first-child': {
                flex: 1
            },

            [theme.breakpoints.up('sm')]: {
                marginRight: 15
            },
            [theme.breakpoints.down('sm')]: {
                marginBottom: 15
            }
        }
    }
);

class Searching extends Component {

    state = {
        query: '',
        maxCount: 10,
        timeOut: 0.5
    };

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('query');
        const maxCount = params.get('maxCount') || this.state.maxCount;
        const timeOut = params.get('timeOut') || this.state.timeOut;

        if (query) {
            this.setState({query, maxCount, timeOut});
            this.props.search(query, maxCount, timeOut);
        }
    }

    componentWillUnmount() {
        this.props.searchingClearState()
    }

    inputChangeHandler = (e) => {
        const propName = e.target.name;
        const propValue = e.target.value;

        this.setState({[propName]: propValue});
    };

    searchHandler = () => {

        const {query, maxCount, timeOut} = this.state;

        if (query) {
            this.setState({
                error: false
            });

            this.props.search(query, maxCount, timeOut);
            this.props.history.push(`/search?query=${query}&maxCount=${maxCount}&timeOut=${timeOut}`);
        }
        else {
            this.setState({
                error: true
            })
        }
    };

    render() {
        const {loading, classes} = this.props;

        return (
            <section className={classes.root}>
                <header className={classes.header}>
                    <Paper className={classes.paper}>
                        <form onSubmit={this.searchHandler} className={classes.form}>
                            <TextField
                                type="text"
                                name="query"
                                label="Поиск товаров на prom.ua"
                                className={classes.item}
                                value={this.state.query}
                                onChange={this.inputChangeHandler}
                            />
                            <TextField
                                type="number"
                                name="maxCount"
                                label="Количество"
                                className={classes.item}
                                value={this.state.maxCount}
                                onChange={this.inputChangeHandler}
                            />
                            <TextField
                                type="number"
                                name="timeOut"
                                label="Задержка (сек)"
                                className={classes.item}
                                value={this.state.timeOut}
                                onChange={this.inputChangeHandler}
                            />
                            <Button raised
                                    color="primary"
                                    onClick={this.searchHandler}
                            >
                                Поиск
                            </Button>
                        </form>
                    </Paper>
                </header>

                <FinedProductsList/>

                <Progress show={loading} text={this.props.loadingText}/>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        finedProducts: state.search.finedProducts,
        loading: state.search.loading,
        error: state.search.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: (query, maxCount, timeOut) => dispatch(search(query, maxCount, timeOut)),
        searchingClearState: () => dispatch(searchingClearState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Searching));