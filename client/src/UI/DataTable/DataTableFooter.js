import React from 'react';
import { TableRow, TableFooter, TablePagination} from 'material-ui-next/Table';

const DataTableFooter = props => {
    const {
        data,
        rowsPerPage,
        rowsPerPageOptions,
        page,
        showPagination,
        handleChangePage,
        handleChangeRowsPerPage
    } = props;

    return !showPagination ? null :
        (
            <TableFooter>
                <TableRow>
                    <TablePagination
                        colSpan={6}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={rowsPerPageOptions}
                        page={page}
                        backiconbuttonprops={{
                            'aria-label': 'Previous Page',
                        }}
                        nexticonbuttonprops={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableRow>
            </TableFooter>
        )

};

export default DataTableFooter;