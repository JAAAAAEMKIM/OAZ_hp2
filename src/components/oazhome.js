import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './oazhome.css';
import ReactFullpage from '@fullpage/react-fullpage'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "fullpage.js/vendors/scrolloverflow"; 
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import PropTypes from 'prop-types'
import { getStatusRequest, logoutRequest } from '../actions/authentication';
import { connect } from 'react-redux';

import { createBrowserHistory } from 'history'

const browserHistory = createBrowserHistory();

class oazHome extends React.Component{

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logoutRequest().then(
            () => {
                Materialize.toast('Good Bye!', 2000, 'blue');

                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                this.props.history.push('/');
            }
        );
    }

    render(){
        // console.log(this.handleLogout)

        const Fullpage = () => (
            <ReactFullpage
            callbacks = {"onLeave"}
            anchors = {["firstPage", "secondPage", "thirdPage"]}
            scrollOverflow = {false}
            navigation
            // licenseKey = {'YOUR_KEY_HERE'}
            scrollingSpeed = {1000} /* Options here */
            render={({ state, fullpageApi }) => {
          
                return (
                    <div>
                        <div className="section" style={{width:"100%", height:"100%", textAlign: "center"}}>
                            <img style = {{}}
                                src = "https://postfiles.pstatic.net/MjAxOTExMThfMjYz/MDAxNTc0MDA4MzY1OTAw.m0iK2ZscjesPu5QjZIqrv2FPvZ2-dSIPL5ySpx5S4v0g.Pn9Da0VIcMoGw-dzlS75B6t0TtCNi1KIXcy0CLmZqokg.PNG.uglycat8/KakaoTalk_20191118_0044542212.png?type=w773"
                            />
                            <Link to="/home" className="home-button"><h5>Home</h5></Link>
                                { this.props.status.isLoggedIn ? logout : login }        
                        </div>
                        <div className="section" style={{width:"100%", height:"100vh", textAlign: "center"}}>
                            <img style={{width:"100%", height:"100vh", textAlign: "center"}}
                                src = "https://postfiles.pstatic.net/MjAxOTExMThfMTY4/MDAxNTc0MDYwODk5ODQ5.jT676l9OqowwCBO1vrOK7J1JUA__0H1Z66XDH5Ddguwg.5AZRBFVTYOgRW9_vntCuqFChh-iJPTzomvmt0_1_YH0g.PNG.uglycat8/KakaoTalk_20191118_023206916_01.png?type=w773"
                            />
                        </div>
                        <div className="section" style={{width:"100%", height:"100vh", textAlign: "center"}}>
                            <img style={{width:"100%", height:"100vh", textAlign: "center"}}
                                src = "https://postfiles.pstatic.net/MjAxOTExMThfNTEg/MDAxNTc0MDYwODk5ODI1.DmZgR1u3ej7bgbzpSOxl0cUguSVY2JBpALLSKtwT8yEg.rkteABs9Zp5m03DEBCilSMN-TV4AD3lMFUCGfh8c8Kcg.PNG.uglycat8/KakaoTalk_20191118_023852403.png?type=w773"
                            />
                        </div>
        
                    </div>
                );
              }}
            />
          );

        const login = (
            <ul>
                    <Link to = "/login" className="login-button">
                        <img src = "https://postfiles.pstatic.net/MjAxOTExMThfMTkx/MDAxNTc0MDEwMTMwMDk0.TDMMMOb7ECLvLKEN8j00KD8fOW68IeftwuRhJ8wOiA8g.h0JmKipupGcZhXsD78C8bQCYvCQT_lwcV0VQ3r5RDJkg.PNG.uglycat8/qwww.png?type=w773" />
                    </Link>
            </ul>
        );

        const logout = (
            <ul>
                <Link to = "" onClick={this.handleLogout} className="login-button">
                    <img src = "https://postfiles.pstatic.net/MjAxOTExMThfMTkx/MDAxNTc0MDEwMTMwMDk0.TDMMMOb7ECLvLKEN8j00KD8fOW68IeftwuRhJ8wOiA8g.h0JmKipupGcZhXsD78C8bQCYvCQT_lwcV0VQ3r5RDJkg.PNG.uglycat8/qwww.png?type=w773" />
                </Link>
            </ul>
        );

        return (
                <div>
                    <Fullpage title="하나와영 홈페이지"></Fullpage>
                </div>
        );
    };
}

oazHome.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};

oazHome.defaultProps = {
    isLoggedIn: false,
    // onLogout: () => { console.error("logout function not defined");}
};

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(oazHome);





