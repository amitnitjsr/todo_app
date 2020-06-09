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
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
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
        console.log('toggleRow')
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[row.id] = !this.state.selected[row.id];
        this.setState({ selected: newSelected }, () => {
            console.log('toggleRow selected', this.state.selected)
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
    editHandler = (id) => {
        console.log('editHandler', id)
        this.popupToggle();
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
                            <input type='text' value={this.state.summary}
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
                            <form >
                                <select >
                                    {prio.map((val) => {
                                        return <option
                                            onClick={() => this.inputChangeHandler('priority', val.value)} >
                                            {val.value}
                                        </option>
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
                            <input type="date" value={this.state.date}
                                onChange={(event) => this.inputChangeHandler('date', event.target.value)}
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
                    <Button
                        onClick={this.handleSubmit
                        }
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
                                <TableData list={list} toggleRow={this.toggleRow}
                                    selected={this.state.selected} editHandler={this.editHandler} />
                            </TabPane>
                            <TabPane tabId="2">
                                <TableData list={list} toggleRow={this.toggleRow}
                                    selected={this.state.selected} editHandler={this.editHandler} />
                            </TabPane>
                            <TabPane tabId="3">
                                <TableData list={list} toggleRow={this.toggleRow}
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
        list: state.customer.customerDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...action
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Table))