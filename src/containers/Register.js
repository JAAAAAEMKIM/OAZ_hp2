// src/containers/Register.js
import React from 'react';
import Authentication from '../components/Authentication';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/authentication';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);    
    }

    handleRegister(name, stdno, id, pw) {
        console.log("id: "+id, "name: ", name, "stdno: ", stdno, "pw: ", pw);

        return this.props.registerRequest(name, stdno, id, pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    Materialize.toast('Success! Please log in.', 2000, 'blue');
                    this.props.history.push('/login');
                    return true;
                } else {
                    /*
                        ERROR CODES:
                            1: BAD ID
                            2: BAD PASSWORD
                            3: ID EXISTS
                            4: BAD USERNAME
                            5: BAD STDNO
                    */
                    let errorMessage = [
                        'Invalid ID',
                        'Password is too short',
                        'ID already exists',
                        'Invalid Username',
                        'Invalid Student ID',
                    ];

                    console.log("error code: ", this.props.errorCode.response.data.code)
                    let $toastContent = $('<span style="color: #B00000">' + errorMessage[this.props.errorCode.response.data.code - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Authentication mode = {false} onRegister={this.handleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (username, stdno, id, pw) => {
            return dispatch(registerRequest(username, stdno, id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);