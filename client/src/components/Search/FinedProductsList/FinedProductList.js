import React from 'react';
import {connect} from "react-redux";
import {Grid, Typography} from "material-ui-next";

import ProductCard from "../ProductCard";

const finedProductsList = props => {
    const {finedProducts, parsing, isSearchEnd} = props;
    let result = null;

    if (isSearchEnd && !finedProducts.length) {
        result = <Typography type="title" style={{textAlign: 'center'}}>Ничего не найдено!</Typography>
    }
    else if (finedProducts.length) {
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
        finedProducts: state.search.finedProducts,
        loading: state.search.loading,
        isSearchEnd: state.search.isSearchEnd,
        error: state.search.error
    }
};

export default connect(mapStateToProps)(finedProductsList);