import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    IconButton,
    Tooltip,
    Grid,
    withStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button
} from "material-ui-next";
import {orange} from 'material-ui-next/colors';
import {Sticky, StickyContainer} from "react-sticky";
import classNames from 'classnames';

import ResultProduct from "./ResultProduct";
import FinedProductsList from '../FinedProductsList/FinedProductList';
import Settings from "./Settings";
import Progress from "../../../UI/Progress/Progress";
import {
    parsing,
    searchingClearState
} from "../../../store/actions/search/actions";

const styles = {
    root: {
        padding: '0 15px'
    },

    sticky: {
        height: '100%'
    },

    settingsButton: {
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 2,
        width: 'auto',
        height: 'auto',
        padding: 0,
        color: orange[500],
        fontSize: 30
    }
};

class Parsing extends Component {

    state = {
        settingsShow: false
    };

    componentDidMount() {
        const id = this.props.match.params.providerId;
        this.props.parsing(id)
    }

    componentWillUnmount() {
        this.props.searchingClearState();
    }

    toggleSettings = () => {
        this.setState(prevState => {
            return {
                settingsShow: !prevState.settingsShow
            }
        })
    };

    confirmDialogHandler = () => {
        const id = this.props.match.params.providerId;
        this.props.history.push(`/providers/${id}`);
    };

    render() {
        const {loading, classes} = this.props;

        return (
            <section className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={12} md={4}>
                        <StickyContainer className={classes.sticky}>
                            <Sticky>
                                {
                                    ({isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight}) => {

                                        return (<div style={{...style, height: '100%', overflowY: 'scroll'}}>
                                            <ResultProduct/>
                                        </div>)
                                    }
                                }
                            </Sticky>

                        </StickyContainer>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <FinedProductsList parsing/>
                    </Grid>
                </Grid>
                <Tooltip title="Изменить параметры парсинга" placement="top-start">
                    <IconButton
                        onClick={this.toggleSettings}
                        className={classNames('material-icons', classes.settingsButton)}
                    >
                        settings
                    </IconButton>
                </Tooltip>

                <Settings
                    show={this.state.settingsShow}
                    toggleSettings={this.toggleSettings}
                />

                <Dialog
                    open={this.props.isDoneParsing}
                    onBackdropClick={this.confirmDialogHandler}
                >
                    <DialogTitle>Парсинг закончен!</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Все товары поставщика успешно заполнены!
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.confirmDialogHandler}
                        >
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <Progress show={loading}/>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.search.settings,
        isDoneParsing: state.search.isDoneParsing,
        loading: state.search.loading,
        error: state.search.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        parsing: (id) => dispatch(parsing(id)),
        searchingClearState: () => dispatch(searchingClearState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Parsing));