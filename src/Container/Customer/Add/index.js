import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from '../Action';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Row, Col, Button } from 'reactstrap';
import signin from '../../../asset/images/signin-image.webp';
import Navbar from '../../../Component/Navbar/Navbar';
import './AddEdit.css';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        boxShadow: "0px 0px 1px 1px lightgrey"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const AddEdit = (props) => {

    const classes = useStyles();
    const [name, setName] = useState('');
    const [custId, setcustId] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');


    useEffect(() => {
        const { id } = props.match.params;
        const { list } = props;
        if (id) {
            const finalList = list.filter(d => d.id === parseInt(id));
            if (finalList.length) {
                const data = finalList[0];
                setName(data.name);
                setcustId(data.customer_id);
                setPhone(data.phone);
                setEmail(data.email);
                setGender(data.gender);
            }
        }
    }, [props.match.params.id, props])

    const saveHandler = () => {
        if (props.match.params.id) {
            props.editCustomer({ "id": parseInt(props.match.params.id), "name": name, "customer_id": custId, "phone": phone, "gender": gender, "email": email });
            props.history.push('/customer');
        }
        else {
            props.addNewCustomer({ "name": name, "customer_id": custId, "phone": phone, "gender": gender, "email": email });
            props.history.push('/customer');
        }
    }

    const handleTextChange = (event, name) => {
        const value = event.target.value;
        if (name === "custid") {
            setcustId(value);
        }
        else if (name === "name") {
            setName(value);
        }
        else if (name === "phone") {
            setPhone(value);
        }
        else if (name === "email") {
            setEmail(value);
        }
        else if (name === "gender") {
            setGender(value)
        }
    };

    return (
        <div>
            <Navbar />
            <Container component="main" maxWidth="md" style={{ padding: '4%' }}>
                <div className={classes.paper}>
                    <form className={classes.form}>
                        <Row>
                            <Col>
                                <img src={signin} alt="signin" /><br /><br /><br />
                            </Col>
                            <Col>
                                {props.match.params.id ? <h1>Edit Customer</h1> : <h1>Add Customer</h1>}
                                <TextField
                                    id="input-with-icon-textfield"
                                    placeholder="Customer ID"
                                    value={custId}
                                    onChange={(event) => handleTextChange(event, "custid")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <i className="fa fa-id-card" aria-hidden="true"></i>
                                            </InputAdornment>
                                        ),
                                    }}
                                /><br /><br />
                                <TextField
                                    id="input-with-icon-textfield"
                                    placeholder="Customer Name"
                                    value={name}
                                    onChange={(event) => handleTextChange(event, "name")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <i className="zmdi zmdi-account zmdi-hc-lg"></i>
                                            </InputAdornment>
                                        ),
                                    }}
                                /><br /><br />
                                <TextField
                                    id="input-with-icon-textfield"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(event) => handleTextChange(event, "email")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <i className="zmdi zmdi-email"></i>
                                            </InputAdornment>
                                        ),
                                    }}
                                /><br /><br />
                                <TextField
                                    id="input-with-icon-textfield"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(event) => handleTextChange(event, "phone")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <i className="zmdi zmdi-phone"></i>
                                            </InputAdornment>
                                        ),
                                    }}
                                /><br /><br />
                                <TextField
                                    id="input-with-icon-textfield"
                                    placeholder="Gender"
                                    value={gender}
                                    onChange={(event) => handleTextChange(event, "gender")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <i className="fa fa-mars"></i>
                                            </InputAdornment>
                                        ),
                                    }}
                                /><br /><br />

                                <Button style={{ backgroundColor: '#6384f9', width: '18%' }}
                                    onClick={() => saveHandler()}
                                >Add</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            <Button style={{ backgroundColor: '#6384f9' }}
                                    onClick={() => props.history.push('/customer')}
                                >Cancel</Button>
                                <br /><br />
                            </Col>
                        </Row>
                    </form>
                </div>
            </Container>
        </div>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);
