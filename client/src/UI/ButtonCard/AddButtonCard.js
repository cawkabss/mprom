import React from 'react';
import {Icon, Typography, withStyles} from "material-ui-next";
import classNames from 'classnames';

import ButtonCard from './ButtonCard';

const styles = theme => (
    {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            cursor: 'pointer'
        },

        text: {
            width: '100%',
            paddingTop: 10,
            textAlign: 'center',
            borderTop: '2px solid #ccc'
        },

        icon: {
            display: 'flex',
            flexDirection: 'column',
            fontSize: '40px',
            color: theme.palette.primary.dark,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
);

const AddButtonCard = (props) => {
    const classes = props.classes;

    return (
        <ButtonCard clicked={props.clicked}>
            <div className={classes.wrapper}>
                <Icon className={classNames("material-icons", classes.icon)}>add</Icon>
                <Typography type="subheading" className={classes.text}>
                    {props.children}
                </Typography>
            </div>
        </ButtonCard>
    )
};

export default withStyles(styles)(AddButtonCard);