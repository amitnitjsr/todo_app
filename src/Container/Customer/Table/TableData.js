import React, { Component } from 'react';
import ReactTable from 'react-table';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

export default class Table extends Component {
    render() {
        const { list } = this.props;
        return (
            <div>
                <ReactTable
                    data={list ? list : []}
                    columns={[
                        {
                            Header: () => <div className="ID"><i className="zmdi zmdi-plus" /></div>,
                            accessor: 'id',
                            className: 'text-center',
                            Cell: (row) => {
                                return (
                                    <Checkbox
                                        checked={this.props.selected[row.row._original.id] === true}
                                        onChange={() => {
                                            this.props.toggleRow(row.row._original);
                                        }}
                                    />
                                )
                            },
                            sortable: false,
                            filterable: false,
                            foldable: true,
                            width: 75
                        },
                        {
                            Header: () => <div className="Header" >Summary</div>,
                            accessor: 'name',
                            className: 'text-center',
                            foldable: true,
                            filterable: false,
                        },
                        {
                            Header: () => <div className="Header" >Priority</div>,
                            accessor: 'email',
                            foldable: true,
                            className: 'text-center',
                        },
                        {
                            Header: () => <div className="Header" >Created On</div>,
                            accessor: 'phone',
                            foldable: true,
                            className: 'text-center',
                        },
                        {
                            Header: () => <div className="Header" >Due Date</div>,
                            accessor: 'phone',
                            foldable: true,
                            className: 'text-center',
                        },
                        {
                            Header: () => <div className="Header" >Action</div>,
                            sortable: false,
                            filterable: false,
                            className: 'Action',
                            id: 'button',
                            width: 150,
                            Cell: (row) => {
                                return (
                                    <span className="action">
                                        <IconButton
                                            onClick={() => this.props.editHandler(row.row._original.id)
                                            }
                                        >
                                            <i className="zmdi zmdi-edit zmdi-hc-fnewstatusw table-icon" />
                                        </IconButton>
                                        <IconButton
                                        // onClick={() => this.props.deleteCustomer({ 'id': row.row._original.id })}
                                        >
                                            <i className="zmdi zmdi-delete zmdi-hc-fw table-icon" />
                                        </IconButton>
                                    </span>
                                );
                            }
                        },
                    ]}
                    pageSize={list.length}
                    showPaginationBottom={false}
                />

            </div>
        )
    }
}
