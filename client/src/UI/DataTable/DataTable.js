import React, {Component} from 'react';
import Table from 'material-ui-next/Table';
import Paper from 'material-ui-next/Paper';
import {withStyles} from 'material-ui-next/styles';
import classNames from 'classnames';

import DataTableToolbar from './DataTableToolbar';
import DataTableHead from "./DataTableHead";
import DataTableFooter from "./DataTableFooter";
import DataTableBody from "./DataTableBody";

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
        cell: {
            height: 48,
            padding: '0 15px',
            whiteSpace: 'initial'
        }
    })
};

class DataTable extends Component {

    state = {
        page: 1,
        rowsPerPage: 10,
        order: 'desc',
        orderBy: '',
        selected: [],
        data: []
    };

    componentWillMount() {
        this.setState({
            data: this.props.data.map(i => Object.assign({}, i))
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({data: nextProps.data})
        }
    }

    handleSort = property => event => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({data, order, orderBy});
    };

    selectAllHandler = (event, checked) => {
        if (checked) {
            return this.setState({selected: this.state.data});
        }
        this.setState({selected: []});
    };

    selectHandler = selectItem => event => {
        const {selected} = this.state;
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

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    clearSelected = () => {
        this.setState({
            selected: []
        })
    };

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
            toolbarActionsData = [],
            showToolbar = false

        } = this.props;

        const {rowsPerPage, data, page, selected, order, orderBy} = this.state;

        return (
            <Paper className={classNames(classes.root, className)}>
                <DataTableToolbar
                    showToolbar={showToolbar}
                    selected={selected}
                    title={toolbarTitle}
                    toolbarActionsData={toolbarActionsData}
                    onActionClick={this.clearSelected}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <DataTableHead
                            cellClassName={classNames(classes.cell, classes.head)}
                            showCheckboxes={showCheckboxes}
                            selectedRowsCount={selected.length}
                            order={order}
                            orderBy={orderBy}
                            columnsData={columns}
                            selectAllHandler={this.selectAllHandler}
                            handleSort={this.handleSort}
                            rowCount={data.length}
                        />
                        <DataTableBody
                            columns={columns}
                            showPagination={showPagination}
                            showRowHover={showRowHover}
                            showCheckboxes={showCheckboxes}
                            data={data}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onCellClick={onCellClick}
                            onCellDoubleClick={onCellDoubleClick}
                            selectHandler={this.selectHandler}
                            selected={selected}
                        />
                        <DataTableFooter
                            showPagination={showPagination}
                            data={data}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={rowsPerPageOptions}
                            handleChangePage={this.handleChangePage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Table>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(DataTable);