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

import {loadProvidersList} from "../../../AC/providers";
import {
    changeShopGroupId,
    changeShopName,
    changeShopProviders,
    shopClearState,
    createShop,
    updateShop,
    updateShopGroups,
    getShopData
} from "../../../AC/shops";
import Progress from "../../../UI/Progress/Progress";
import {providersListSelector} from "../../../selectors/providersSelector";

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

        input: {
            [theme.breakpoints.up('md')]: {
                marginRight: 15
            }
        },

    }
);

class Form extends Component {

    state = {
        id: null
    };

    componentDidMount() {
        const id = this.props.match.params.id;

        this.setState({id});

        if (id) {
            this.props.loadProvidersList()
                .then(() => this.props.getShopData(id))
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
        this.props.changeShopGroupId(groupName, groupValue);
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
                                renderValue={selected => (
                                    providersList
                                        .filter(provider => selected.indexOf(provider._id) > -1 )
                                        .map(provider => provider.name)
                                        .join(', ')
                                ) }
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
                        <hr/>
                        <Typography type="title" className={classes.title}>
                            <span>Группы</span>
                        </Typography>
                        {shop.groups.map(group => {

                            return (
                                <div key={group.name}>
                                    <div className={classes.item}>
                                        <label className={classes.label}>
                                            {`${group.name}:`}
                                        </label>
                                        <TextField
                                            className={classes.input}
                                            value={group.id}
                                            name="id"
                                            onChange={(e) => this.changedGroupIdHandler(e, group.name)}
                                            label="Номер"
                                        />
                                    </div>
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
        providersList: providersListSelector(state),
        providersListLoading: state.providers.list.loading,
        shop: state.shops.form.data,
        shopLoading: state.shops.form.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProvidersList: () => dispatch(loadProvidersList()),
        getShopData: (id) => dispatch(getShopData(id)),
        changeShopName: (shopName) => dispatch(changeShopName(shopName)),
        changeShopGroupId: (groupName, groupValue) => dispatch(changeShopGroupId(groupName, groupValue)),
        changeShopProviders: (providers) => dispatch(changeShopProviders(providers)),
        updateShopGroups: () => dispatch(updateShopGroups()),
        createShop: () => dispatch(createShop()),
        updateShop: (id) => dispatch(updateShop(id)),
        clearShopData: () => dispatch(shopClearState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Form));