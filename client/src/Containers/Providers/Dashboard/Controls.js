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
import {compose, withState} from "recompose";

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

const Controls = props => {

    const id = props.match.params.id;
    const {provider, showDialog, classes} = props;

    const deleteClickHandler = () => {
        props.toggleDialog(true)
    };

    const cancelDeleteProviderHandler = () => {
        props.toggleDialog(false)
    };

    const confirmDeleteProviderHandler = () => {
        props.toggleDialog(false);

        props.deleteProvider(id)
    };
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
                    to={`/providers/${id}/price`}
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
                    onClick={deleteClickHandler}
                >
                    Удалить
                </Button>
            </Paper>

            <Dialog
                open={showDialog}
                onBackdropClick={cancelDeleteProviderHandler}
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
                        onClick={cancelDeleteProviderHandler}
                    >
                        Отмена
                    </Button>
                    <Button
                        color="secondary"
                        onClick={confirmDeleteProviderHandler}
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </Wrapper>
    )
};

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

const enhance = compose(
    withState('showDialog', 'toggleDialog', false),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhance(Controls);