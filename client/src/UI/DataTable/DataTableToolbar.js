import React from 'react';
import {withStyles} from 'material-ui-next/styles';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import IconButton from 'material-ui-next/IconButton';
import Tooltip from 'material-ui-next/Tooltip';
import classNames from 'classnames';
import {Icon} from "material-ui-next";

const toolbarStyles = theme => ({
    root: {
        paddingRight: 2,
    },
    highlight:
        {
            color: '#fff',
            backgroundColor: theme.palette.grey[300],
        },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        display: 'flex',
        color: '#fff',
    },
    title: {
        flex: '0 0 auto',
    },
});

const DataTableToolbar = (props) => {
    const {showToolbar, selected, classes, title, toolbarActionsData, onActionClick} = props;

    const toolbarTitle = selected.length > 0 ?
        (<Typography type="subheading">{selected.length} Выбрано</Typography>) :
        (<Typography type="title">{title}</Typography>);


    const toolbarActions = !selected.length ? null :
        toolbarActionsData.map((action, i) => {
            return (
                <Tooltip key={i} title={action.tooltip}>
                    <IconButton
                        style={{color: action.iconColor ? action.iconColor : 'inherit'}}
                        onClick={() => {
                            onActionClick();
                            action.handleClick(selected);
                        }}>
                        <Icon
                            className="material-icons"
                            aria-label="Menu"
                        >
                            {action.icon}
                        </Icon>
                    </IconButton>
                </Tooltip>
            )
        });

    return !showToolbar ? null :
        (
            <Toolbar
                className={classNames(classes.root, {[classes.highlight]: selected.length > 0})}
            >
                <div className={classes.title}>
                    {toolbarTitle}
                </div>
                <div className={classes.spacer}/>
                <div className={classes.actions}>
                    {toolbarActions}
                </div>
            </Toolbar>
        )
};

export default withStyles(toolbarStyles)(DataTableToolbar);