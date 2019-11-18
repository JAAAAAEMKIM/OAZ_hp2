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

<<<<<<< HEAD
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
=======
        // const Fullpage = (isLoggedIn) => (
            
        //   );
>>>>>>> 21854ae6cfc1926bc3ac23a70a9d1fab21468573

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





