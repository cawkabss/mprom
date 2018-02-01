import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import withStyles from "material-ui-next/styles/withStyles";
import AppBar from "material-ui-next/AppBar";
import Toolbar from "material-ui-next/Toolbar";
import IconButton from "material-ui-next/IconButton";
import Typography from "material-ui-next/Typography";
import Drawer from "material-ui-next/Drawer";
import Hidden from "material-ui-next/Hidden";

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
                                onClick={this.toggleDrawer}
                                iconclassname="material-icons"
                                color="inherit" aria-label="Menu">
                                menu
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