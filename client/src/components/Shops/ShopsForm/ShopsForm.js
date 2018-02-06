import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Button,
    withStyles,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Select,
    Checkbox,
    ListItemText,
    Input,
} from "material-ui-next";

import {loadProvidersList} from "../../../store/actions/providers/actions";
import {
    changeShopGroup,
    changeShopName,
    changeShopProviders,
    shopClearState,
    createShop,
    loadShop,
    updateShop,
    updateShopGroups
} from "../../../store/actions/shops/actions";
import Progress from "../../../UI/Progress/Progress";

const styles = theme => (
    {
        root: {
            padding: '0 15px'
        },

        paper: {
            padding: 15,
            textAlign: 'center'
        },

        title: {
            marginBottom: 15,
        },

        actions: {
            marginTop: 15,
            textAlign: 'center'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },

        item: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 15,

            [theme.breakpoints.up('md')]: {
                flexDirection: 'row'
            }
        },

        label: {
            [theme.breakpoints.up('md')]: {
                marginRight: 15
            }
        },

    }
);

class ShopForm extends Component {

    state = {
        id: null
    };

    componentDidMount() {
        const id = this.props.match.params.id;

        this.setState({id});

        if (id) {
            this.props.loadProvidersList()
                .then(() => this.props.shopLoad(id))
                .then(this.props.updateShopGroups);
        } else {
            this.props.loadProvidersList()
        }

    }

    chooseProvider = (event) => {
        let shopProviders = event.target.value;

        this.props.changeShopProviders(shopProviders);
    };

    submitFormHandler = () => {
        const id = this.state.id;

        if (id) {
            this.props.updateShop(id);

        } else {
            this.props.createShop();
        }
    };

    changeNameHandler = (event) => {
        event.persist();

        const shopName = event.target.value;
        this.props.changeShopName(shopName)
    };

    changedGroupIdHandler = (event, groupName) => {
        event.persist();

        const groupValue = event.target.value;
        this.props.changeShopGroup(groupName, groupValue);
    };

    render() {
        const {shop, shopLoading, providersListLoading, providersList, classes} = this.props;
        const actionLabel = this.state.id ? "Сохранить" : "Добавить";
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography type="title" className={classes.title}>
                        <span>Настройки</span>
                    </Typography>
                    <form className={classes.form} onSubmit={this.submitFormHandler}>
                        <div className={classes.item}>
                            <label className={classes.label}>
                                Введите имя магазина (обязательно):
                            </label>
                            <TextField
                                value={shop.name}
                                name="name"
                                onChange={this.changeNameHandler}
                                placeholder="Пример: GoodToys"/>
                        </div>
                        <div className={classes.item}>
                            <label className={classes.label}>
                                Выберите поставщиков:
                            </label>
                            <Select
                                multiple
                                autoWidth
                                value={shop.providers}
                                onChange={this.chooseProvider}
                                input={<Input id="select-provider" />}
                                renderValue={selected => {
                                    return providersList
                                        .filter(provider => selected.indexOf(provider._id) > -1 )
                                        .map(provider => provider.name)
                                        .join(', ')
                                } }
                            >
                                {providersList.map(provider => (
                                    <MenuItem key={provider._id} value={provider._id}>
                                        <Checkbox checked={
                                            shop.providers.indexOf(provider._id) > -1
                                        } />
                                        <ListItemText primary={provider.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        {shop.groups.map((group) => {
                            return (
                                <div key={group.name} className={classes.item}>
                                    <label className={classes.label}>
                                        {group.name}:
                                    </label>
                                    <TextField
                                        value={group.id}
                                        name="id"
                                        onChange={(e) => this.changedGroupIdHandler(e, group.name)}
                                        placeholder="Пример: 23543642"
                                    />
                                </div>
                            )
                        })}

                        <div className={classes.actions}>
                            <Button
                                raised
                                color="primary"
                                onClick={this.submitFormHandler}
                            >
                                {actionLabel}
                            </Button>
                        </div>
                    </form>
                </Paper>

                <Progress show={shopLoading || providersListLoading}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        providersList: state.providers.providersList,
        providersListLoading: state.providers.loading,
        shop: state.shop.data,
        shopLoading: state.shop.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProvidersList: () => dispatch(loadProvidersList()),
        shopLoad: (id) => dispatch(loadShop(id)),
        changeShopName: (shopName) => dispatch(changeShopName(shopName)),
        changeShopGroup: (groupName, groupValue) => dispatch(changeShopGroup(groupName, groupValue)),
        changeShopProviders: (providers) => dispatch(changeShopProviders(providers)),
        updateShopGroups: () => dispatch(updateShopGroups()),
        createShop: () => dispatch(createShop()),
        updateShop: (id) => dispatch(updateShop(id)),
        clearShopData: () => dispatch(shopClearState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopForm));