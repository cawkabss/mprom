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

    return (
            <DataTable
                columns={TABLE_COLUMNS}
                data={productsList}
                showPagination={true}
                showRowHover={true}
                onCellDoubleClick={selectedProductHandler}
                rowsPerPageOptions={[10, 20, 50, 100]}
            />
    )
};

export default ProductsTable;