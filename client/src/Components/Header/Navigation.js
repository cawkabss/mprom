import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from "material-ui-next/styles/withStyles";
import Button from "material-ui-next/Button";

const styles = theme => {
    return (
        {

            button: {
                color: '#fff',
                '&.active': {
                    backgroundColor: theme.palette.primary.dark
                },

                [theme.breakpoints.down('md')]: {
                    color: '#000',
                    width: '100%',

                    '&.active': {
                        color: '#fff'
                    }
                }
            },

            list: {
                [theme.breakpoints.up('md')]: {
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    listStyle: 'none',
                }
            },
            item: {

                [theme.breakpoints.up('md')]: {
                    marginRight: 5,
                    '&:last-child': {
                        marginRight: 'none'
                    }

                },

                [theme.breakpoints.down('md')]: {
                    marginRight: 'none',
                    margin: '5px 0'
                }
            }
        }
    );

};


class Navigation extends Component {

    render(){
        const { classes } = this.props;
        return (
            <nav>
                <ul className={classes.list}>
                    <li className={classes.item}>
                        <Button component={NavLink} to="/products" className={classes.button}>
                            Товары
                        </Button>
                    </li>
                    <li className={classes.item}>
                        <Button component={NavLink} to="/providers" className={classes.button}>
                            поставщики
                        </Button>
                    </li>
                    <li className={classes.item}>
                        <Button component={NavLink} to="/shops" className={classes.button}>
                            магазины
                        </Button>
                    </li>
                    <li className={classes.item}>
                        <Button component={NavLink} to="/orders" className={classes.button}>
                            Заказы
                        </Button>
                    </li>
                    <li className={classes.item}>
                        <Button component={NavLink} to="/search" className={classes.button}>
                            Поиск
                        </Button>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withStyles(styles)(Navigation);