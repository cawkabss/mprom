import React, {Component} from 'react';
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui-next/Table';
import Checkbox from 'material-ui-next/Checkbox';
import Tooltip from 'material-ui-next/Tooltip';

class DataTableHead extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {
            columnsData,
            onSelectAllClick,
            order,
            orderBy,
            selectedRowsCount,
            rowCount,
            showCheckboxes,
            cellClassName
        } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {
                        showCheckboxes ? (
                            <TableCell padding='checkbox'>
                                <Checkbox
                                    indeterminate={selectedRowsCount > 0 && selectedRowsCount < rowCount}
                                    checked={selectedRowsCount === rowCount}
                                    onChange={onSelectAllClick}
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
                                                onClick={this.createSortHandler(column.key)}
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
    }
}

export default DataTableHead;