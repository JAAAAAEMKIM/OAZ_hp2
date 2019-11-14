import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import './Home.css';
import ReactFullpage from '@fullpage/react-fullpage'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "fullpage.js/vendors/scrolloverflow"; 
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import PropTypes from 'prop-types'
import { getStatusRequest, logoutRequest } from '../actions/authentication';
import { connect } from 'react-redux';

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

        // const Fullpage = (isLoggedIn) => (
            
        //   );

        const login = (
            <ul>
                    <Link to = "/login"><h5>Sign In</h5></Link>
            </ul>
        );

        const logout = (
            <ul>
                <Link to = "" onClick={this.handleLogout}>
                    <h5>Sign Out</h5>
                </Link>
            </ul>
        );

        return (
                <div>
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
                                <div className="section" style={{ width:"100%", height:"100%", textAlign: "center"}}>
                                    {/* <AwesomeSlider style={{width:"100%", height:"100%"}}>
                                        <div data-src="https://images.mypetlife.co.kr/content/uploads/2019/07/12153720/cat-4265304_1920.jpg" />
                                        <div data-src="https://img9.yna.co.kr/etc/inner/KR/2019/04/08/AKR20190408066300073_01_i_P2.jpg" />
                                        <div data-src="https://i.ytimg.com/vi/lUkrXEMMJSg/maxresdefault.jpg" />
                                    </AwesomeSlider> 
                                    
                                    전체화면 슬라이더가 잘 안되서 차라리 조그만 갤러리처럼 넣는게 좋을 것 같아요
                                    
                                    */}
                                    
                                    <h1>OAZ HOMEPAGE</h1>
                                    <p/><p/><p/>
                                    <ul>
                                        <Link to="/home" className="brand-logo center"><h5>Home</h5><p/></Link>
                                        { this.props.status.isLoggedIn ? logout : login }
                                        <h6>OR</h6><p/>
                                        <Link to="/register" className="brand-logo center"><h5>Register</h5></Link>
                                    </ul>
                
                                </div>
                                <div className="section" style={{backgroundColor:"#ff5f45", color:"white",  textAlign: "center"}}>
                                    <h3>뭘 넣으면 좋을까요?</h3>
                                </div>
                                <div className="section" style={{backgroundColor:"#0798ec", color:"white",  textAlign: "center"}}>
                                    <h3>Slide up! </h3>
                                    <a onClick={() => fullpageApi.moveTo(1)} style={{fontStyle:{fontcolor:"white"}}}>
                                        Move Up!
                                    </a>
                                </div>
                
                            </div>
                        );
                    }}
                    />
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





