import React, {Component} from 'react';
import {compose} from "recompose";
import {withRouter} from 'react-router';
import {withStyles, Typography} from "material-ui-next";
import {deepOrange} from "material-ui-next/colors";

import ButtonCard from "../../../UI/ButtonCard/ButtonCard";

const styles = {
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    marginBottom: {
        marginBottom: 10
    },

    warning1: {
        backgroundColor: deepOrange[200]
    },
    warning2: {
        backgroundColor: deepOrange[300]
    },
    warning3: {
        backgroundColor: deepOrange[400]
    }

};

class ProvidersItem extends Component {

    clickHandler = () => {
        const id = this.props.provider._id;
        this.props.history.push(`/providers/${id}`);
    };

    render() {
        const {name, updateTime} = this.props.provider;
        const classes = this.props.classes;
        const updDate = new Date(updateTime);

        const now = Date.now();
        const difference = (now - updDate.getTime()) / (1000 * 3600 * 24);
        const warning = difference > 1 && difference < 2 ? 'warning1' :
            difference > 2 && difference < 3 ?  'warning2':
                difference > 3 ? 'warning3' : '';

        return (
            <ButtonCard className={classes[warning]} clicked={this.clickHandler}>
                <div className={classes.content}>
                    <Typography type="title" className={classes.marginBottom}>
                        {name}
                    </Typography>
                    <Typography className={classes.marginBottom}>
                        Обновлено: {updDate.toLocaleString("ru", {day: '2-digit', month: '2-digit', year: '2-digit'})}
                    </Typography>
                    <Typography className={classes.marginBottom}>
                        {difference > 1 ? `*Прайс не обновлялся больше ${difference ^ 0} суток!` : null}
                    </Typography>
                </div>
            </ButtonCard>
        );
    }
}

const enhance = compose(
    withRouter,
    withStyles(styles)
);

export default enhance(ProvidersItem);