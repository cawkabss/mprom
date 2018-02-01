import React, {PureComponent} from 'react';
import { withStyles } from 'material-ui-next/styles';
import Table, { TableBody, TableCell, TableRow, TableFooter, TablePagination } from 'material-ui-next/Table';
import Paper from 'material-ui-next/Paper';
import DataTableToolbar from './DataTableToolbar';
import DataTableHead from "./DataTableHead";
import Checkbox from "material-ui-next/Checkbox/";
import classNames from 'classnames';

const styles = theme => {
    return ({
        root: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 700,
            tableLayout: 'auto',
        },
        head: {
            fontWeight: 700
        },
        cell:{
            height: 48,
            padding: '0 15px',
            whiteSpace: 'initial'
        }
    })
};

class DataTable extends PureComponent {

    state = {
        page: 1,
        rowsPerPage: 10,
        order: 'desc',
        orderBy: '',
        selected: [],
        data: []
    };

    componentWillMount(){
        this.setState({
            data: this.props.data.map(i => Object.assign({}, i))
        })
    }

    componentWillReceiveProps(nextProps){

        if(this.props.data !== nextProps.data) {
            this.setState({data: nextProps.data})
        }
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.props.data.map((n, i) => n) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, selectItem) => {
        const { selected } = this.state;
        const selectedIndex = selected.findIndex(i => selectItem.id === i.id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, selectItem);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    clearSelected = () => {
        this.setState({
            selected: []
        })
    };

    isSelected = item => this.state.selected.findIndex(i => i.id === item.id) !== -1;

    render() {
        const {
            classes,
            className,
            columns,
            rowsPerPageOptions = [5, 10, 20],
            showPagination = true,
            showRowHover = true,
            showCheckboxes = false,
            onCellClick,
            onCellDoubleClick,
            toolbarTitle = '',
            toolBarActions = [],
            selectedToolbarActions = [],
            showToolbar = false

        } = this.props;

        const {rowsPerPage, data, page, selected, order, orderBy} = this.state;
        const productsOnPage = showPagination && (data.length > rowsPerPage) ?
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data;

        return (
            <Paper className={classNames(classes.root, className)}>
                {showToolbar ? (
                    <DataTableToolbar
                        selected={selected}
                        title={toolbarTitle}
                        actions={toolBarActions}
                        selectedActions={selectedToolbarActions}
                        onActionClick={this.clearSelected}
                    />
                ) : null}
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <DataTableHead
                            cellClassName={classNames(classes.cell, classes.head)}
                            showCheckboxes={showCheckboxes}
                            selectedRowsCount={selected.length}
                            order={order}
                            orderBy={orderBy}
                            columnsData={columns}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                    <TableBody>
                        {productsOnPage.map((n, i) => {
                            const isSelected = this.isSelected(n);
                            return (
                                <TableRow key={i}
                                          hover={showRowHover}
                                          role="checkbox"
                                          aria-checked={isSelected}
                                          tabIndex={-1}
                                          selected={isSelected}
                                >
                                    { showCheckboxes ? (
                                        <TableCell padding="checkbox" >
                                            <Checkbox
                                                onClick={event => this.handleClick(event, n)}
                                                checked={isSelected} />
                                        </TableCell> ) : null
                                    }

                                    {columns.map(column => {
                                        return (
                                            <TableCell
                                                key={column.key}
                                                onDoubleClick={
                                                    () => onCellDoubleClick ? onCellDoubleClick(n, i) : null
                                                }
                                                onClick={() => onCellClick ? onCellClick(n, i) : null}
                                                className={classes.cell}>{n[column.key]}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    {
                        showPagination ?

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
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter> :

                            null
                    }
                </Table>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(DataTable);