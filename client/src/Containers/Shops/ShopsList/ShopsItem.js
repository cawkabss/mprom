import React, {Component} from 'react';
import {withRouter} from 'react-router';
import ButtonCard from "../../../UI/ButtonCard/ButtonCard";
import {Typography, withStyles} from "material-ui-next";

const styles = {
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }

};

class ShopsItem extends Component {

    clickHandler = () => {
        const id = this.props.shop._id;
        this.props.history.push(`/shops/${id}`);
    };

    render() {
        const {shop:{name}, classes} = this.props;

        return (
            <ButtonCard clicked={this.clickHandler}>
                <Typography type="title" className={classes.content}>
                    { name }
                </Typography>
            </ButtonCard>
        )
    }
}

export default  withRouter(withStyles(styles)(ShopsItem));