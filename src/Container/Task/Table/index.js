import React from 'react';
import ReactTable from 'react-table';
import IconButton from '@material-ui/core/IconButton';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from "react-redux";
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
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Input } from 'reactstrap';
import classnames from 'classnames';
import TableData from './TableData';
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
            priority: 'None',
            activeTab: '1',
            description: '',
            summary: '',
            searchInput: '',
            deleteBtnHide: true,
            edit: false,
            id: 1,
            createdOn: '',
            completed: false,
            viewModal: false,
            viewData: null
        }
    }
    toggle = tab => {
        if (this.state.activeTab !== tab)
            this.setState({ activeTab: tab })
    }
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
        this.setState({ [name]: value });
    }

    popupToggle = () => {
        this.setState((preState) => {
            return { showModal: !preState.showModal }
        })
    }
    addToggle = () => {
        this.popupToggle();
        this.setState({
            summary: '', description: '', priority: 'None', selectedDate: new Date('2014-08-18T21:11:54'),
            edit: false
        })
    }

    editHandler = (id) => {
        let data = this.props.list.filter(f => id === f.id);
        this.setState({
            summary: data[0].summary, description: data[0].description,
            selectedDate: (data[0].dueDate), priority: data[0].priority, edit: true, id: id,
            createdOn: data[0].createdOn, completed: data[0].completed
        })
        this.popupToggle();
    }

    handleAddTask = () => {

        if (this.state.edit) {
            this.props.editTask({
                "id": parseInt(this.state.id),
                "summary": this.state.summary, "description": this.state.description, "completed": this.state.completed,
                "priority": this.state.priority, "createdOn": this.state.createdOn, "dueDate": this.state.selectedDate
            });
        }
        else {
            // console.log(this.state.summary, this.state.description, this.state.priority,
            //     createdOn, this.state.selectedDate);
            let createdOn = new Date();
            let dd = String(createdOn.getDate()).padStart(2, '0');
            let mm = String(createdOn.getMonth() + 1).padStart(2, '0');
            let yyyy = createdOn.getFullYear();
            createdOn = yyyy + '-' + mm + '-' + dd;
            this.props.addNewTask({
                "summary": this.state.summary, "description": this.state.description, "completed": false,
                "priority": this.state.priority, "createdOn": createdOn, "dueDate": this.state.selectedDate
            });
        }
        this.popupToggle();
    }

    reOpen = (id) => {
        let data = this.props.list.filter(f => id === f.id);
        this.props.editTask({
            "id": parseInt(id),
            "summary": data[0].summary, "description": data[0].description, "completed": !(data[0].completed),
            "priority": data[0].priority, "createdOn": data[0].createdOn, "dueDate": data[0].dueDate
        });
    }

    deleteHandler = () => {
        if (Object.keys(this.state.selected).length !== 0) {
            this.props.deleteTask(this.state.selected);
            this.setState({ selectedRow: null, selected: {}, deleteBtnHide: true, editBtnHide: true })
        }
    }

    viewDetails = (id) => {
        let data = this.props.list.filter(f => id === f.id);
        this.setState({ viewData: data }, () => {
            console.log('viewData', this.state.viewData, this.state.viewData[0].summary)
            this.viewToggle();
        })
    }
    viewToggle = () => {
        this.setState((prevState) => {
            return { viewModal: !prevState.viewModal }
        })
    }
    inputSearchHandler = (name, e) => {
        this.setState({ [name]: e.target.value }, () => {
            // this.props.searchTask({ "searchInput": this.state.searchInput });
            this.props.searchTaskList({ "searchInput": this.state.searchInput });
            // this.setState({ searchInput: '' })
            // if (this.state.activeTab === '1') {
            //     // All task -> list
            //     // this.props.searchData(this.state.searchInput)
            // }
            // else if (this.state.activeTab === '2') {
            //     // completed
            // }
            // else if (this.state.activeTab === '3') {
            //     // pending
            // }
        });
    }
    render() {
        const { list, completedTask, pendingTask } = this.props;

        let add_Edit_task = (
            <Dialog open={this.state.showModal} onClose={this.popupToggle}>
                <DialogTitle onClose={this.popupToggle} >
                    {!this.state.edit ? 'Add: Task' : 'Edit: Task'}
                </DialogTitle>
                <DialogContent>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'  >
                            <span
                            >Summary:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <input type='text'
                                value={this.state.summary}
                                style={{ width: '220px' }}
                                onChange={(event) => this.inputChangeHandler('summary', event.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'  >
                            <span
                            >Descriptions:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <textarea id="w3review" name="w3review" rows="4" cols="28" value={this.state.description}
                                onChange={(event) => this.inputChangeHandler('description', event.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Priority:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <select onClick={(event) => this.inputChangeHandler('priority', event.target.value)}
                            >
                                {prio.map((val) => (
                                    <option
                                    >
                                        {val.value}
                                    </option>
                                ))}
                            </select>
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Due Date:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <input type="date" value={this.state.selectedDate}
                                onChange={(event) => this.inputChangeHandler('selectedDate', event.target.value)}
                            />
                        </Col>
                    </Row>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ left: '-10%', position: 'relative' }}
                        onClick={this.popupToggle
                        }
                    >
                        Cancel
                    </Button>
                    <Button style={{
                        position: 'relative', left: '-4%'
                    }}
                        onClick={this.handleAddTask
                        }
                    >
                        {!this.state.edit ? 'Add' : 'Edit'}
                    </Button>
                </DialogActions>
            </Dialog >
        );

        let viewDetails = (
            <Dialog open={this.state.viewModal} onClose={this.viewToggle}>
                <DialogTitle onClose={this.viewToggle} >
                    {'View Details'}
                </DialogTitle>
                <DialogContent>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'  >
                            <span
                            >Summary:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <label>{this.state.viewData ? this.state.viewData[0].summary : null}</label>
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'  >
                            <span
                            >Descriptions:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <textarea id="w3review" name="w3review" rows="4" cols="28"
                                value={this.state.viewData ? this.state.viewData[0].description : null}
                                disabled={true}
                            />
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Priority:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <label>{this.state.viewData ? this.state.viewData[0].priority : null}</label>
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Created Date:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <label>{this.state.viewData ? this.state.viewData[0].createdOn : null}</label>
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Due Date:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <label>{this.state.viewData ? this.state.viewData[0].dueDate : null}</label>
                        </Col>
                    </Row>
                    <Row style={{ padding: '5px' }}>
                        <Col md='4' sm='4'>
                            <span >Current Status:</span>
                        </Col>
                        <Col md='8' sm='8'>
                            <label>{this.state.viewData ? this.state.viewData[0].completed ? 'Close' : 'Open' : null}</label>
                        </Col>
                    </Row>
                </DialogContent>
                <DialogActions>

                    <Button style={{
                        position: 'relative', left: '-4%'
                    }}
                        onClick={this.viewToggle
                        }
                    >
                        {'Close'}
                    </Button>
                </DialogActions>
            </Dialog >
        );
        return (
            <div>
                <Navbar />
                {add_Edit_task}
                {viewDetails}
                <div style={{ padding: '5%' }}>
                    <Row >
                        <Col sm="3">
                            <Input type="text" placeholder="Search.."
                                value={this.state.searchInput}
                                name="search2"
                                onChange={(event) => this.inputSearchHandler('searchInput', event)}
                            />
                        </Col>
                        <Col sm="6">
                            <Button className='button_color' onClick={() => this.addToggle()}>+ Add Task</Button>
                            {/* &nbsp;<Button disabled={this.state.editBtnHide} className='button_color' onClick={() => this.editHandler()}>Edit</Button> */}
                                    &nbsp;<Button disabled={this.state.deleteBtnHide} className='button_color' onClick={() => this.deleteHandler()}>Delete</Button>
                        </Col>
                    </Row>
                    <div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    All Task
                        </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Completed Task
                        </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); }}
                                >
                                    Pending Task
                        </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <TableData list={list} toggleRow={this.toggleRow} viewDetails={this.viewDetails}
                                    deleteBtnHide={this.state.deleteBtnHide} reOpen={this.reOpen}
                                    selected={this.state.selected} editHandler={this.editHandler} />
                            </TabPane>
                            <TabPane tabId="2">
                                <TableData list={completedTask} toggleRow={this.toggleRow} viewDetails={this.viewDetails}
                                    deleteBtnHide={this.state.deleteBtnHide} reOpen={this.reOpen}
                                    selected={this.state.selected} editHandler={this.editHandler} />
                            </TabPane>
                            <TabPane tabId="3">
                                <TableData list={pendingTask} toggleRow={this.toggleRow} viewDetails={this.viewDetails}
                                    deleteBtnHide={this.state.deleteBtnHide} reOpen={this.reOpen}
                                    selected={this.state.selected} editHandler={this.editHandler} />
                            </TabPane>
                        </TabContent>
                    </div>
                </div >

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.task.taskDetails,
        completedTask: state.task.completedTask,
        pendingTask: state.task.pendingTask
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...action
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Table))