import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import Logo from '../assets/images/logo.png';
import Form from 'react-bootstrap/Form';


class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            id: "",
            name: "",
            provider: "",
            auth: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleKeyPress(e) {
        if(e.charCode==13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;
        
        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleRegister() {
        let id = this.state.username;
        let pw = this.state.password;
        
        this.props.onRegister(id, pw).then(
            (result) => {
                if(!result) {
                    this.setState({
                        username: '',
                        password: ''
                    });
                }
            }
        );
    }
    
    render() {

        const responseGoogle = (res) => {
            console.log("success\n");
            console.log(res)
            this.setState({
                id:res.googleId,
                name:res.profileObj.name,
                provider:'google',
                auth: true
            });
            
            console.log(this.state.auth)
            // window.location.reload();
        }
    
        const responseFail = (err) => {
            console.log('failed')
            console.error(err.tokenObj);
        }

        const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>Username</label>
                    <input
                    name="username"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.username}/>
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress}/>
                </div>
            </div>
        );

        const loginView = (
            <div >
                <div className="card-content" >
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn" onClick={this.handleLogin} >SUBMIT</a>
                    </div>
                </div>

                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? 
                        <Link to="/register">Create Account</Link>
                        {/* {this.state.auth
                        ?
                        <Link to="/register">Sign Up</Link>
                        :
                        <GoogleLogin
                            redirectUri= "http://localhost:4000/home"
                            clientId= {process.env.LICENSE_KEY}
                            buttonText="Sign Up with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseFail}
                            cookiePolicy={'single_host_origin'}
                            />} */}
                        </div>
                    </div>
                </div>

            </div>
        );

        const registerView = (
            this.state.auth ?
            <div className="card-content">
                <Form>                    
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter Name" type="text"/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control placeholder="Enter Student ID" type="number" name="quantity" min="1900000000" max="2030000000"/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    
                   
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"  
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                            name="password"
                            className="validate"
                            onChange={this.handleChange}
                            value={this.state.password}
                            onKeyPress={this.handleKeyPress}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                <div className="row">
                    {/* {inputBoxes} */}
                    <a className="waves-effect waves-light btn"
                        onClick={this.handleRegister}>CREATE</a>
                </div>
                </Form>

            </div>
            :
            <GoogleLogin
                redirectUri= "http://localhost:4000/home"
                clientId= {process.env.LICENSE_KEY}
                buttonText="Sign Up with Google"
                onSuccess={responseGoogle}
                onFailure={responseFail}
                cookiePolicy={'single_host_origin'}
                />
        );
        return (
            <div className="container auth">
                <Link to="/">
                    <div className="logo">
                        <img src = {Logo} style={{height:"200px"}}/>
                    </div>
                </Link>
                <div className="card">
                    {this.props.mode ? loginView : registerView }
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: PropTypes.bool,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func
};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined"); },
    onRegister: (id, pw) => { console.error("register function not defined"); }
};


export default Authentication;

 