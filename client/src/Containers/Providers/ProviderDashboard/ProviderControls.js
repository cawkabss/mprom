import React, {Component} from 'react';
import NavLink from "react-router-dom/NavLink";
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Icon,
    Paper,
    Typography,
    withStyles
} from "material-ui-next";
import {red, amber} from 'material-ui-next/colors';
import classNames from 'classnames';

import Wrapper from "../../../hoc/Wrapper";
import {deleteProvider} from "../../../store/actions/providers/actions";

const styles = theme => (
    {
        paper: {
            padding: 15,
            marginBottom: 15,
            textAlign: 'center'
        },

        action: {
            marginRight: 15,

            '&.active': {
                backgroundColor: theme.palette.primary.light,
                color: '#fff'
            }
        },

        dialogTitle: {
            '& h2': {
                display: 'flex',
                alignItems: 'center'
            }
        },

        dialogTitleIcon: {
            marginRight: 10,
            color: amber[500]
        },

        warning: {
            color: red[400]
        }
    }
);

class ProviderControls extends Component {

    state = {
        id: null,
        showDialog: false
    };

    componentWillMount() {
        const id = this.props.match.params.id;
        this.setState({id});
    }

    deleteClickHandler = () => {
        this.setState({
            showDialog: true
        })
    };

    cancelDeleteProviderHandler = () => {
        this.setState({
            showDialog: false
        })
    };

    confirmDeleteProviderHandler = () => {
        this.setState({
            showDialog: false
        });

        this.props.deleteProvider(this.state.id)
    };

    render() {
        const {provider, classes} = this.props;
        const id = this.state.id;

        return (
            <Wrapper>
                <Paper className={classes.paper}>
                    <Button
                        component={NavLink}
                        exact
                        to={`/providers/${id}`}
                        color="primary"
                        className={classes.action}
                    >
                        Статистика
                    </Button>
                    <Button
                        component={NavLink}
                        to={`/providers/${id}/edit`}
                        color="primary"
                        className={classes.action}
                    >
                        Изменить
                    </Button>
                    <Button
                        component={NavLink}
                        to={`/providers/${id}/upload-price`}
                        className={classes.action}
                        color="primary"
                    >
                        Загрузить/обновить прайс
                    </Button>
                    <Button
                        component={NavLink}
                        to={`/search/providers/${id}`}
                        disabled={!provider.allProductsCount ||
                        provider.allProductsCount === provider.doneProductsCount}
                        color="primary"
                        className={classes.action}
                    >
                        Парсинг
                    </Button>
                    <Button
                        color="secondary"
                        className={classes.action}
                        onClick={this.deleteClickHandler}
                    >
                        Удалить
                    </Button>
                </Paper>

                <Dialog
                    open={this.state.showDialog}
                    onBackdropClick={this.cancelDeleteProviderHandler}
                >
                    <DialogTitle className={classes.dialogTitle}>
                        <Icon className={classNames("material-icons",
                            classes.dialogTitleIcon)}
                        >
                            warning
                        </Icon>
                        Внимание!
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Вы действительно хотите удалить данного поставщика?
                        </Typography>
                        <Typography className={classes.warning}>
                            <strong>
                                Все товары, связанные с ними заказы, которые относяться к данному поставщику будут также удалены!
                            </strong>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.cancelDeleteProviderHandler}
                        >
                            Отмена
                        </Button>
                        <Button
                            color="secondary"
                            onClick={this.confirmDeleteProviderHandler}
                        >
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => (
    {
        provider: state.provider
    }
);

const mapDispatchToProps = dispatch => (
    {
        deleteProvider: (id) => dispatch(deleteProvider(id))
    }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProviderControls)));