import React from 'react';
import {connect} from "react-redux";
import {Grid, Typography} from "material-ui-next";

import ProductCard from "../ProductCard";

const finedProductsList = props => {
    const {finedProducts, parsing, endSearching} = props;
    let result = null;

    if (endSearching && !finedProducts.length) {
        result = <Typography type="title" style={{textAlign: 'center'}}>Ничего не найдено!</Typography>
    }
    else if (endSearching && finedProducts.length) {
        result = (
            <Grid container spacing={24}>
                {finedProducts.map((product, index) => {
                    return (
                        <Grid
                            item
                            key={index}
                            xs={12} sm={12} md={parsing ? 6 : 4}
                        >
                            <ProductCard product={product} showAddBtn={parsing}/>
                        </Grid>
                    )
                })
                }
            </Grid>
        );
    }

    return result;
};

const mapStateToProps = (state) => {
    return {
        finedProducts: state.search.searching.data,
        searching: state.search.searching.searching,
        endSearching: state.search.searching.endSearching,
        error: state.search.searching.error
    }
};

export default connect(mapStateToProps)(finedProductsList);