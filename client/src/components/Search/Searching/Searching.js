import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles, Paper, TextField, Button} from "material-ui-next";

import FinedProductsList from '../FinedProductsList/FinedProductList';
import Progress from "../../../UI/Progress/Progress";
import {changeSearchingSettings, search, searchingClearState} from "../../../AC/search";

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

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('query');

        if (query) {
            const maxCount = params.get('maxCount') || this.props.settings.maxCount;
            const timeOut = params.get('timeOut') || this.props.settings.timeOut;
            this.props.changeSearchingSettings('query', query);
            this.props.changeSearchingSettings('maxCount', maxCount);
            this.props.changeSearchingSettings('timeOut', timeOut);

            this.props.search(query, maxCount, timeOut);
        }
    }

    componentWillUnmount() {
        this.props.searchingClearState()
    }

    inputChangeHandler = (e) => {
        const propName = e.target.name;
        const propValue = e.target.value;

        this.props.changeSearchingSettings(propName, propValue);
    };

    searchHandler = () => {

        const {query, maxCount, timeOut} = this.props.settings;

        if (query) {

            this.props.search(query, maxCount, timeOut);
            this.props.history.push(`/search?query=${query}&maxCount=${maxCount}&timeOut=${timeOut}`);
        }
    };

    render() {
        const {settings, searching, endSearching, classes} = this.props;

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
                                value={settings.query}
                                onChange={this.inputChangeHandler}
                            />
                            <TextField
                                type="number"
                                name="maxCount"
                                label="Количество"
                                className={classes.item}
                                value={settings.maxCount}
                                onChange={this.inputChangeHandler}
                            />
                            <TextField
                                type="number"
                                name="timeOut"
                                label="Задержка (сек)"
                                className={classes.item}
                                value={settings.timeOut}
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

                <Progress show={searching && !endSearching}/>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        finedProducts: state.search.searching.data,
        searching: state.search.searching.searching,
        settings: state.search.searching.settings,
        endSearching: state.search.searching.endSearching,
        error: state.search.searching.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: (query, maxCount, timeOut) => dispatch(search(query, maxCount, timeOut)),
        changeSearchingSettings: (propName, propValue) => dispatch(changeSearchingSettings(propName, propValue)),
        searchingClearState: () => dispatch(searchingClearState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Searching));