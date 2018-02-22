import React, {Component} from 'react';
import {compose} from "recompose";
import {connect} from 'react-redux';
import {Grid, Paper, Typography, withStyles} from 'material-ui-next';
import {green, red, blue} from "material-ui-next/colors";

import Wrapper from "../../../hoc/Wrapper";
import InfoCard from "../../../UI/InfoCard/InfoCard";
import Progress from "../../../UI/Progress/Progress";
import {loadStatistics} from "../../../AC/providers";
import {withRouter} from "react-router";

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

class Statistics extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.loadStatistics(id)
    }

    render() {
        const {
            allProductsCount,
            doneProductsCount,
            unAvailableProductsCount,
            loading,
            classes
        } = this.props;

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
                            infoCardsData.map(card => (
                                <Grid key={card.title} item xs={12} sm={6} md={4}>
                                    <InfoCard icon={card.icon}
                                              color={card.color}
                                              title={card.title}
                                              value={card.value}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Paper>

                <Progress show={loading}/>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    const statistics = state.providers.statistics;
    return {
        allProductsCount: statistics.data.allProductsCount,
        doneProductsCount: statistics.data.doneProductsCount,
        unAvailableProductsCount: statistics.data.unAvailableProductsCount,
        loading: statistics.loading
    }
};

const mapDispatchToProps = dispatch => (
    {
        loadStatistics: (id) => dispatch(loadStatistics(id))
    }
);

const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
);

export default enhance(Statistics);
