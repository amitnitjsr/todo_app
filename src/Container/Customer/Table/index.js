import React from 'react';
import ReactTable from 'react-table';
import IconButton from '@material-ui/core/IconButton';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
// import DateFnsUtils from '@date-io/date-fns';
import { bindActionCreators } from 'redux';
import Checkbox from '@material-ui/core/Checkbox';
import * as action from '../Action';
import Navbar from '../../../Component/Navbar/Navbar';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Row, Col, Input } from 'reactstrap';
import './Table.css';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
        // borderRadius: '2% 94% 3% 94% / 88% 6% 88% 6%'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        // color: theme.palette.grey[500]
    },
});

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle
            disableTypography
            className={classes.root}
            {...other}
        // style={{
        //     // boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
        //     // background: '#1f2859'
        //     // background: linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(222,8,152,1) 0%, rgba(240,142,37,1) 100%, rgba(245,178,7,0.969625350140056) 100%, rgba(255,0,219,1) 100%) !important;

        // }}
        >
            <Typography style={{ color: 'white' }} variant="h6">
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    style={{ color: 'grey' }}
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const prio = [{ label: 'None', value: 'None' }, { label: 'Low', value: 'Low' },
{ label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }]
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            selectedRow: null,
            showModal: false,
            selectedDate: new Date('2014-08-18T21:11:54'),
            priority: 'None'
        }
    }
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    handleDateChange = (date) => {
        this.setState(
            { selectedDate: date }
        );
    };
    toggleRow = (row) => {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[row.id] = !this.state.selected[row.id];
        this.setState({ selected: newSelected }, () => {
            if (this.state.selected[row.id] === false) {
                delete this.state.selected[row.id];
            }
            if (Object.keys(this.state.selected).length !== 0) {
                this.setState({ deleteBtnHide: false })
            }
            else {
                this.setState({ deleteBtnHide: true })
            }

        })
    }
    inputChangeHandler = (name, value) => {
        console.log("val", value)
        this.setState({ [name]: value });
    }

    popupToggle = () => {
        this.setState((preState) => {
            return { showModal: !preState.showModal }
        })
    }
    render() {
        const { list } = this.props;
        let add_Edit_task = (
            <Dialog open={this.state.showModal} onClose={this.popupToggle}>
                <DialogTitle onClose={this.popupToggle} >
                    {this.state.editAdd ? 'Add: Task' : 'Edit: Task'}
                </DialogTitle>
                <DialogContent>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'  >
                            <span
                            >Summary:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <input type='text' value={this.state.name}
                                style={{ width: '220px' }}
                                onChange={(event) => this.inputChangeHandler('name', event.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'  >
                            <span
                            >Descriptions:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <textarea id="w3review" name="w3review" rows="4" cols="28">

                            </textarea>
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Priority:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <form >
                                <select >
                                    {prio.map((val) => {
                                        return <option
                                            onChange={() => this.inputChangeHandler('priority', val.value)}>{val.value}</option>
                                    })}
                                </select>
                            </form>
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Due Date:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <input type="date" id="birthday" name="birthday" />
                        </Col>
                    </Row>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ left: '-10%', position: 'relative' }}
                        onClick={this.handleSubmit
                        }
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleSubmit
                        }
                        disabled={this.state.emailValidation
                            || this.state.phoneValidation}
                        className='button_pos'
                    >
                        {this.state.editAdd ? 'Add' : 'Edit'}
                    </Button>
                </DialogActions>
            </Dialog >
        );
        return (
            <div>
                <Navbar />
                {add_Edit_task}
                <div style={{ padding: '5%' }}>
                    <Button style={{
                        left: ' 2%',
                        position: 'relative'
                    }}
                        onClick={() => this.popupToggle()}

                    >
                        <i className="zmdi zmdi-account-add zmdi-hc-lg"></i>&nbsp;
                    Add Task
                </Button>

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
                                            checked={this.state.selected[row.row._original.id] === true}
                                            onChange={() => {
                                                this.toggleRow(row.row._original);
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
                                foldable: true
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
                                                onClick={() =>
                                                    this.props.history.push(
                                                        '/customer/edit/' + row.row._original.id + '/'
                                                    )}
                                            >
                                                <i className="zmdi zmdi-edit zmdi-hc-fnewstatusw table-icon" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => this.props.deleteCustomer({ 'id': row.row._original.id })}
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
                </div >
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.customer.customerDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...action
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Table))