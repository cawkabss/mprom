import React from 'react';
import {withStyles} from 'material-ui-next/styles';
import {TableBody, TableCell, TableRow} from 'material-ui-next/Table';
import Checkbox from "material-ui-next/Checkbox/";

const styles = theme => ({
    cell: {
        height: 48,
        padding: '0 15px',
        whiteSpace: 'initial'
    }
});

const DataTableBody = props => {

    const {
        classes,
        columns,
        showPagination,
        showRowHover,
        showCheckboxes,
        data,
        rowsPerPage,
        page,
        onCellClick,
        onCellDoubleClick,
        selectHandler,
        selected
    } = props;

    const productsOnPage = showPagination && (data.length > rowsPerPage) ?
        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data;

    const isSelected = item => selected.findIndex(i => i.id === item.id) !== -1;

    return (
        <TableBody>
            {
                productsOnPage.map((product, i) => {
                    return (
                        <TableRow key={i}
                                  hover={showRowHover}
                                  role="checkbox"
                                  aria-checked={isSelected(product)}
                                  tabIndex={-1}
                                  selected={isSelected(product)}
                        >
                            {
                                !showCheckboxes ? null :
                                    (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={selectHandler(product)}
                                                checked={isSelected}/>
                                        </TableCell>
                                    )
                            }

                            {
                                columns.map(column => (
                                    <TableCell
                                        key={column.key}
                                        onDoubleClick={
                                            () => onCellDoubleClick ? onCellDoubleClick(product) : null
                                        }
                                        onClick={() => onCellClick ? onCellClick(product) : null}
                                        className={classes.cell}
                                    >
                                        {product[column.key]}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    );
                })
            }
        </TableBody>
    );

};

export default withStyles(styles)(DataTableBody);