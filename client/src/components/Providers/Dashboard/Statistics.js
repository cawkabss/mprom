import React from 'react';
import {compose} from "recompose";
import {connect} from 'react-redux';
import {Grid, Paper, Typography, withStyles} from 'material-ui-next';
import {green, red, blue} from "material-ui-next/colors";

import Wrapper from "../../../hoc/Wrapper";
import InfoCard from "../../../UI/InfoCard/InfoCard";
import Progress from "../../../UI/Progress/Progress";

const styles = {
    paper: {
        padding: 12,
        textAlign: 'center',
        marginBottom: 3
    },

    title: {
        marginBottom: 15,
        textAlign: 'center'
    }
};

const Statistics = props => {
    const {
        allProductsCount,
        doneProductsCount,
        unAvailableProductsCount,
        loading,
        classes
    } = props;

    const infoCardsData = [
        {
            icon: 'view_carousel',
            color: blue[600],
            title: "Всех товаров",
            value: allProductsCount
        },
        {
            icon: 'assignment_turned_in',
            color: green[600],
            title: "Спарсеных товаров",
            value: doneProductsCount
        },
        {
            icon: 'highlight_off',
            color: red[600],
            title: "Нет в наличии",
            value: unAvailableProductsCount
        }
    ];


    return (
        <Wrapper>
            <Paper className={classes.paper}>
                <Typography type="title" className={classes.title}>
                    Статистика по товарам
                </Typography>
                <Grid container spacing={24}>
                    {
                        infoCardsData.map(item => (
                            <Grid item xs={12} sm={6} md={4}>
                                <InfoCard icon={item.icon}
                                          color={item.color}
                                          title={item.title}
                                          value={item.value}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Paper>

            <Progress show={loading}/>
        </Wrapper>
    );
};

const mapStateToProps = state => {
    return {
        allProductsCount: state.provider.allProductsCount,
        doneProductsCount: state.provider.doneProductsCount,
        unAvailableProductsCount: state.provider.unAvailableProductsCount,
        loading: state.provider.loading
    }
};

const enhance = compose(
    connect(mapStateToProps),
    withStyles(styles)
);

export default enhance(Statistics);
