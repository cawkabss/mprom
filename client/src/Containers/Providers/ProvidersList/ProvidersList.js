import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, withStyles} from 'material-ui-next';

import ProvidersItem from "./ProvidersItem";
import Progress from "../../../UI/Progress/Progress";
import AddButtonCard from "../../../UI/ButtonCard/AddButtonCard";
import {loadProvidersList} from "../../../store/actions/providers/actions";

const styles = {
    root: {
        padding: '0 15px'
    },
    red: {
        color: 'red'
    }
};

class ProvidersList extends Component {

    state = {
        selectedProviderId: '',
        showModal: false
    };

    componentDidMount() {

        if (!this.props.providersList.length) {

            this.props.loadProvidersList();
        }
    }

    addNewProviderHandler = () => {
        this.props.history.push(`/providers/new`);
    };

    render() {
        const {loading, providersList, classes} = this.props;

        return (
            <section className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AddButtonCard
                            clicked={this.addNewProviderHandler}
                        >
                            Добавить поставщика
                        </AddButtonCard>
                    </Grid>
                    {
                        providersList.map(provider => {
                            return (
                                <Grid
                                    key={provider._id}
                                    item xs={12} sm={6} md={4} lg={3}
                                >
                                    <ProvidersItem
                                        provider={provider}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>

                <Progress show={loading}/>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        providersList: state.providers.providersList,
        loading: state.providers.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProvidersList: () => dispatch(loadProvidersList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProvidersList));