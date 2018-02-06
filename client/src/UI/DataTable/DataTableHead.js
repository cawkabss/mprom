import React, {Component} from 'react';
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui-next/Table';
import Checkbox from 'material-ui-next/Checkbox';
import Tooltip from 'material-ui-next/Tooltip';

const DataTableHead = props => {

    const {
        columnsData,
        selectAllHandler,
        order,
        orderBy,
        selectedRowsCount,
        rowCount,
        showCheckboxes,
        cellClassName,
        handleSort
    } = props;



    return (
        <TableHead>
            <TableRow>
                {
                    showCheckboxes ? (
                        <TableCell padding='checkbox'>
                            <Checkbox
                                indeterminate={selectedRowsCount > 0 && selectedRowsCount < rowCount}
                                checked={selectedRowsCount === rowCount}
                                onChange={selectAllHandler}
                            />
                        </TableCell>
                    ) : null
                }
                {
                    columnsData.map(column => {
                        return (
                            <TableCell
                                className={cellClassName}
                                key={column.key}
                                numeric={!!column.numeric}
                                sortDirection={orderBy === column.key ? order : false}
                            >
                                {
                                    column.sortable ? (
                                            <Tooltip
                                                title="Сортировка"
                                                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                                enterDelay={300}
                                            >
                                                <TableSortLabel
                                                    active={orderBy === column.key}
                                                    direction={order}
                                                    onClick={handleSort(column.key)}
                                                >
                                                    {column.label}
                                                </TableSortLabel>
                                            </Tooltip>
                                        ) :
                                        column.label
                                }

                            </TableCell>
                        );
                    }, this)}
            </TableRow>
        </TableHead>
    );
};

export default DataTableHead;