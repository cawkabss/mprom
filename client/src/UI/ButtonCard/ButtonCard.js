import React from 'react';
import {Paper, withStyles } from "material-ui-next";
import { lighten } from 'material-ui-next/styles/colorManipulator';
import classNames from 'classnames';

const styles = theme => (
    {
        paper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 200,
            padding: 10,
            transition: 'background-color .2s',
            overflow: 'hidden',
            cursor: 'pointer',

            '&:hover': {
                backgroundColor: theme.palette.type === 'light' ?
                    lighten(theme.palette.primary.light, 0.7) :
                    theme.palette.grey[400]
            }
        }
    }
);

const ButtonCard = (props) => {
    const classes = props.classes;

    return (
        <Paper className={classNames(classes.paper, props.className)} onClick={props.clicked}>
            {props.children}
        </Paper>
    );
};

export default withStyles(styles)(ButtonCard);