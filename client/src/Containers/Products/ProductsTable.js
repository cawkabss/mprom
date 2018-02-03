import React from 'react';

import DataTable from "../../UI/DataTable/DataTable";

const TABLE_COLUMNS = [
    {
        key: 'image',
        label: 'Фото',
    },
    {
        key: 'title',
        label: 'Название',
    },
    {
        key: 'vendorCode',
        label: 'Артикул'
    },
    {
        key: 'provider',
        label: 'Поставщик',
    },
    {
        key: 'providerPrice',
        label: 'Оптовая цена',
        sortable: true
    },
    {
        key: 'markup',
        label: 'Наценка',
        sortable: true
    },
    {
        key: 'ourPrice',
        label: 'Наша цена',
        sortable: true
    },
    {
        key: 'available',
        label: 'Наличие',
    },
    {
        key: 'count',
        label: 'Остаток',
    },
    {
        key: 'ordersCount',
        label: 'Заказы',
        sortable: true
    }
];

const ProductsTable = ({productsList, selectedProductHandler}) => {
    const transformedProducts = productsList
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
        });

    return (
            <DataTable
                columns={TABLE_COLUMNS}
                data={transformedProducts}
                showPagination={true}
                showRowHover={true}
                onCellDoubleClick={selectedProductHandler}
                rowsPerPageOptions={[10, 20, 50, 100]}
            />
    )
};

export default ProductsTable;