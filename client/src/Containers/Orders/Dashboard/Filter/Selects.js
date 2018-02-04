import React from 'react';
import {
    MenuItem,
    Checkbox,
    ListItemText,
    Select,
    Input,
    InputLabel,
    FormControl,
    withStyles
} from "material-ui-next";
import classNames from 'classnames';

import Wrapper from "../../../../hoc/Wrapper";

const styles = theme => (
    {
        item: {
            margin: '0 0 15px',

            [theme.breakpoints.up('md')]: {
                margin: 0
            }
        },

        select: {
            width: '100%',
            maxWidth: 150
        }
    }
);

const Selects = props => {
    const {
        providersList,
        providers,
        paidMethods,
        deliveryMethods,
        selectChangeHandler,
        classes
    } = props;

    const providersItems = providersList.map(provider => (
        <MenuItem key={provider._id} value={provider.name}>
            <Checkbox checked={
                providers.indexOf(provider.name) > -1
            }/>
            <ListItemText primary={provider.name}/>
        </MenuItem>
    ));
    const paidMethodsItems = ['Наложка', 'Наличка', 'Предоплата'].map(item => (
        <MenuItem key={item} value={item}>
            <Checkbox checked={
                paidMethods.indexOf(item) > -1
            }/>
            <ListItemText primary={item}/>
        </MenuItem>
    ));
    const deliveryMethodsItems = ['НП', 'Курьер', 'Самовывоз'].map(item => (
        <MenuItem key={item} value={item}>
            <Checkbox checked={
                deliveryMethods.indexOf(item) > -1
            }/>
            <ListItemText primary={item}/>
        </MenuItem>
    ));

    return (
        <Wrapper>
            <FormControl className={classNames(classes.select, classes.item)}>
                <InputLabel htmlFor="select-provider">Поставщик</InputLabel>
                <Select
                    multiple
                    autoWidth
                    value={[...providers]}
                    onChange={selectChangeHandler('providers')}
                    input={<Input id="select-provider"/>}
                    renderValue={selected => selected.join(', ')}
                >
                    {providersItems}
                </Select>
            </FormControl>
            <FormControl className={classNames(classes.select, classes.item)}>
                <InputLabel htmlFor="select-paidMethod">Оплата</InputLabel>
                <Select
                    multiple
                    autoWidth
                    value={[...paidMethods]}
                    onChange={selectChangeHandler('paidMethods')}
                    input={<Input id="select-paidMethod"/>}
                    renderValue={selected => selected.join(', ')}
                >
                    {paidMethodsItems}
                </Select>
            </FormControl>

            <FormControl className={classNames(classes.select, classes.item)}>
                <InputLabel htmlFor="select-deliveryMethod">Доставка</InputLabel>
                <Select
                    multiple
                    autoWidth
                    value={[...deliveryMethods]}
                    onChange={selectChangeHandler('deliveryMethods')}
                    input={<Input id="select-deliveryMethod"/>}
                    renderValue={selected => selected.join(', ')}
                >
                    {deliveryMethodsItems}
                </Select>
            </FormControl>
        </Wrapper>
    )
};

export default withStyles(styles)(Selects);