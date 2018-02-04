import React from 'react';
import {createSelector} from "reselect";

const productGetter = state => state.products.productsList;

const transformProductsList = productsList => (
    productsList
        .map((product, i) => {
            return {
                id: i,
                image: <img alt="img" style={{height: '100%'}} src={product.images[0]}/>,
                title: product.title,
                vendorCode: product.vendorCode,
                provider: <a href={product.provider.url} target="_blank">{product.provider.name}</a>,
                providerPrice: product.price.providerPrice,
                markup: product.price.markup,
                ourPrice: product.price.ourPrice,
                available: product.available,
                count: product.count,
                ordersCount: product.orders.length
            }
        })
);

const transformedProductsList = createSelector(productGetter, transformProductsList);

export default transformedProductsList;