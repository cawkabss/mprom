import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
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


class Header extends Component {
    state = {
        openDrawer: false
    };

    toggleDrawer = () => {
        this.setState(prevState => {
            return {
                openDrawer: !prevState.openDrawer
            }
        })
    };

    render() {
        const {classes} = this.props;
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
                                onClick={this.toggleDrawer}>
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
                    open={this.state.openDrawer}
                    onClose={this.toggleDrawer}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                    >
                        <Navigation/>
                    </div>
                </Drawer>
            </header>
        )
    }
}

export default withStyles(styles)(Header);