import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {
    IconButton,
    Typography,
    FormControlLabel,
    Button,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    withStyles
} from "material-ui-next";
import {grey} from 'material-ui-next/colors';
import classNames from 'classnames';

import {changeSearchingSettings, search} from "../../../store/actions/search/actions";

const styles = theme => (
    {
        root: {
            position: 'fixed',
            left: 0,
            width: '100%',
            zIndex: 5,
            transition: 'all .4s',
            backgroundColor: grey[300]
        },

        show: {
            opacity: 1,
            bottom: 0
        },

        hide: {
            opacity: 0,
            bottom: -50
        },

        content: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        group: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },

        controls: {
            width: 'auto',
            margin: '0 25px'
        },

        closeBtn: {
            position: 'absolute',
            padding: 0,
            width: 'auto',
            height: 'auto',
            right: 5,
            top: 5,
            color: theme.palette.primary.dark
        },
    }
);

class Settings extends Component {

    changeSettingsHandler = (event) => {
        event.persist();
        const propName = event.target.name;
        const propValue = event.target.value;

        this.props.changeSearchingSettings(propName, propValue);
    };

    searchHandler = () => {
        const {resultProduct, settings: {parseQuery, maxCount, timeOut}} = this.props;

        this.props.search(resultProduct[parseQuery], maxCount, timeOut)
    };

    render() {
        const classes = this.props.classes;
        const {
            show,
            toggleSettings,
            settings: {parseQuery, maxCount, timeOut}
        } = this.props;

        return (
            <Paper className={classNames(classes.root, show ? classes.show : classes.hide)}>
                <form className={classes.content}>
                    <Typography type="subheading">
                        Парсим по:
                    </Typography>
                    <RadioGroup
                        onChange={this.changeSettingsHandler}
                        name="parseQuery"
                        value={parseQuery}
                        className={classes.group}>
                        <FormControlLabel
                            className={classes.controls}
                            value="title"
                            control={<Radio />}
                            label="Названию"
                        />
                        <FormControlLabel
                            className={classes.controls}
                            value="vendorCode"
                            control={<Radio />}
                            label="Артикулу"
                        />
                    </RadioGroup>
                    <Typography type="subheading">
                        Количество:
                    </Typography>
                    <TextField
                        type="number"
                        onChange={this.changeSettingsHandler}
                        name="maxCount"
                        className={classes.controls}
                        value={maxCount}
                    />
                    <Typography type="subheading">
                        Задержка (сек):
                    </Typography>
                    <TextField
                        type="number"
                        onChange={this.changeSettingsHandler}
                        name="timeOut"
                        className={classes.controls}
                        value={timeOut}
                    />
                    <Button
                        color="primary"
                        onClick={this.searchHandler}>
                        Применить
                    </Button>

                    <IconButton
                        onClick={toggleSettings}
                        className={classNames('material-icons', classes.closeBtn)}
                    >
                        clear
                    </IconButton>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = state => (
    {
        resultProduct: state.search.resultProduct,
        settings: state.search.settings
    }
);

const mapDispatchToProps = dispatch => (
    {
        search: (query, maxCount, timeOut) => dispatch(search(query, maxCount, timeOut)),
        changeSearchingSettings: (propName, propValue) => dispatch(changeSearchingSettings(propName, propValue))
    }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Settings)));