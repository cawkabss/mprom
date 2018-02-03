import React from 'react';
import {NavLink} from 'react-router-dom';
import {withState, compose} from 'recompose';
import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    Hidden,
    Icon,
    withStyles, IconButton
} from "material-ui-next";

import Navigation from "./Navigation";


const styles = {
    root: {
        width: '100%',
        color: '#fff'
    },
    flex: {
        flex: 1,
    },
    toolbar: {
        paddingRight: 15,
        paddingLeft: 15
    },

    link: {
        textDecoration: 'none',
    },

    title: {
        color: '#fff'
    },

    paperAnchorRight: {
        width: '40%'
    }
};


const Header = ({showDrawer, toggleDrawer, classes}) => {
    return (
        <header className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.flex}>
                        <NavLink to="/" className={classes.link}>
                            <Typography type="title" className={classes.title}>
                                MProm
                            </Typography>
                        </NavLink>
                    </div>
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            onClick={() => toggleDrawer(!showDrawer)}>
                            <Icon
                                className="material-icons"
                                aria-label="Menu"
                            >
                                menu
                            </Icon>
                        </IconButton>
                    </Hidden>
                    <Hidden mdDown>
                        <Navigation/>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Drawer
                classes={{
                    paperAnchorRight: classes.paperAnchorRight
                }}
                anchor="right"
                open={showDrawer}
                onClose={() => toggleDrawer(!showDrawer)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={() => toggleDrawer(!showDrawer)}
                >
                    <Navigation/>
                </div>
            </Drawer>
        </header>
    )
};

const enhance = compose(
    withState('showDrawer', 'toggleDrawer', false),
    withStyles(styles)
);

export default enhance(Header);