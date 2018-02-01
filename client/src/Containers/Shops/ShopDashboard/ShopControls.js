import React, {Component} from 'react';
import NavLink from "react-router-dom/NavLink";
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Typography,
    withStyles
} from "material-ui-next";

import Wrapper from "../../../hoc/Wrapper";
import {deleteShop, loadShop} from "../../../store/actions/shops/actions";
import {savePrice} from "../../../store/actions/shops/actions";

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
        }
    }
);

class ShopControls extends Component {

    state = {
        id: null,
        showDialog: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({id});
        this.props.loadShop(id);
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

        this.props.deleteShop(this.state.id)
    };

    render() {
        const {classes, savePrice} = this.props;
        const id = this.state.id;

        return (
            <Wrapper>
                <Paper className={classes.paper}>
                    <Button
                        component={NavLink}
                        exact
                        to={`/shops/${id}`}
                        color="primary"
                        className={classes.action}
                    >
                        Статистика
                    </Button>
                    <Button
                        component={NavLink}
                        to={`/shops/${id}/edit`}
                        color="primary"
                        className={classes.action}
                    >
                        Изменить
                    </Button>
                    <Button
                        className={classes.action}
                        color="primary"
                        disabled={!this.props.shop.canSavePrice}
                        onClick={() => savePrice(id)}
                    >
                        Скачать прайс
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
                    <DialogTitle>Внимание!</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Вы действительно хотите удалить даный магазин?
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

const mapStateToProps = state => {
    return {
        shop: state.shop.data
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteShop: (id) => dispatch(deleteShop(id)),
        loadShop: (id) => dispatch(loadShop(id)),
        savePrice: (id) => dispatch(savePrice(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopControls)));