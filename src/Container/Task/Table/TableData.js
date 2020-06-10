import React, { Component } from 'react';
import ReactTable from 'react-table';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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
                            // accessor: 'summary',
                            className: 'text-center',
                            foldable: true,
                            filterable: false,
                            Cell: (row) => {
                                return (
                                    <div>
                                        <Tooltip title={'Click on, View All Details'} placement="top">
                                            <span onClick={() => this.props.viewDetails(row.row._original.id)} style={{ cursor: 'pointer' }} >
                                                {row.row._original.summary}
                                            </span>
                                        </Tooltip>
                                    </div>
                                );
                            }
                        },
                        {
                            Header: () => <div className="Header" >Priority</div>,
                            accessor: 'priority',
                            foldable: true,
                            className: 'text-center',
                        },
                        {
                            Header: () => <div className="Header" >Current Status</div>,
                            // accessor: 'priority',
                            foldable: true,
                            className: 'text-center',
                            Cell: (row) => {
                                return (
                                    <span >{row.row._original.completed ? 'Close' : 'Pending'}</span>
                                )
                            },
                        },
                        {
                            Header: () => <div className="Header" >Created On</div>,
                            accessor: 'createdOn',
                            foldable: true,
                            className: 'text-center',
                        },
                        {
                            Header: () => <div className="Header" >Due Date</div>,
                            accessor: 'dueDate',
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
                                    <span className="action" >
                                        <IconButton disabled={!this.props.deleteBtnHide}
                                            onClick={() => this.props.editHandler(row.row._original.id)
                                            }
                                        >
                                            <i className="zmdi zmdi-edit zmdi-hc-fnewstatusw table-icon" />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => this.props.reOpen(row.row._original.id)}
                                        >
                                            <span style={{ fontSize: '12px' }}>{row.row._original.completed ? 're-open' : 'open'}</span>
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
