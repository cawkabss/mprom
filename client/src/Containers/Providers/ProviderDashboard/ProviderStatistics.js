import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Paper, Typography, withStyles} from 'material-ui-next';
import {green, red, blue} from "material-ui-next/colors";

import InfoCard from "./InfoCard";
import Wrapper from "../../../hoc/Wrapper";
import Progress from "../../../UI/Progress/Progress";
import {loadProductsStatistics} from "../../../store/actions/providers/actions";

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

class ProviderStatistics extends Component {
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.loadProductsStatistics(id);
    }

    render() {
        const {
            allProductsCount,
            doneProductsCount,
            unAvailableProductsCount,
            loading, classes
        } = this.props;

        return (
            <Wrapper>
                <Paper className={classes.paper}>
                    <Typography type="title" className={classes.title}>
                        Статистика по товарам
                    </Typography>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6} md={4}>
                            <InfoCard icon={'view_carousel'}
                                      color={blue[600]}
                                      title="Всех товаров"
                                      value={allProductsCount}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <InfoCard icon={'assignment_turned_in'}
                                      color={green[600]}
                                      title="Спарсеных товаров"
                                      value={doneProductsCount}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <InfoCard icon={'highlight_off'}
                                      color={red[600]}
                                      title="Нет в наличии"
                                      value={unAvailableProductsCount}/>
                        </Grid>
                    </Grid>
                </Paper>

                <Progress show={loading} />
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        allProductsCount: state.provider.allProductsCount,
        doneProductsCount: state.provider.doneProductsCount,
        unAvailableProductsCount: state.provider.unAvailableProductsCount,
        loading: state.provider.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadProductsStatistics: (id) => dispatch(loadProductsStatistics(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProviderStatistics));
