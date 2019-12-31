import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './oazhome.css';
import ReactFullpage from '@fullpage/react-fullpage'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "fullpage.js/vendors/scrolloverflow"; 
import PropTypes from 'prop-types'
import { getStatusRequest, logoutRequest } from '../actions/authentication';
import { connect } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import { MDBView, MDBMask, MDBContainer, MDBRow, MDBCol } from "mdbreact";
// Import Image Sources
import Logo from '../assets/images/logo.png';
import GrayLogo from '../assets/images/graylogo.png';
import SigninButton from '../assets/images/signin.png';
import SignoutButton from '../assets/images/signout.png';
import gallery4 from '../assets/images/gallery4.jpg';
import gallery5 from '../assets/images/gallery5.jpg';
import gallery6 from '../assets/images/gallery6.jpg';
import gallery7 from '../assets/images/gallery7.jpg';
import gallery8 from '../assets/images/gallery8.jpg';

import Timeline from '@salmanul/react-simple-timeline';
import '@salmanul/react-simple-timeline/styles/index.css';

import '../assets/fonts/nanumsquare.css';

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
        // const Fullpage = () => (
        //     <ReactFullpage
        //     callbacks = {"onLeave"}
        //     anchors = {["firstPage", "secondPage", "thirdPage"]}
        //     scrollOverflow = {false}
        //     navigation
        //     // licenseKey = {'YOUR_KEY_HERE'}
        //     scrollingSpeed = {1000} /* Options here */
        //     render={({ state, fullpageApi }) => {
          
                // return (
                //     <div>
                //         <div className="section" style={{width:"100%", height:"100%", textAlign: "center"}}>
                //             <img style = {{}}
                //                 src = "https://postfiles.pstatic.net/MjAxOTExMThfMjYz/MDAxNTc0MDA4MzY1OTAw.m0iK2ZscjesPu5QjZIqrv2FPvZ2-dSIPL5ySpx5S4v0g.Pn9Da0VIcMoGw-dzlS75B6t0TtCNi1KIXcy0CLmZqokg.PNG.uglycat8/KakaoTalk_20191118_0044542212.png?type=w773"
                //             />
                //             <Link to="/home" className="home-button"><h5>Home</h5></Link>
                //                 { this.props.status.isLoggedIn ? logout : login }        
                //         </div>
                //         <div className="section" style={{width:"100%", height:"100vh", textAlign: "center"}}>
                //             <img style={{width:"100%", height:"100vh", textAlign: "center"}}
                //                 src = "https://postfiles.pstatic.net/MjAxOTExMThfMTY4/MDAxNTc0MDYwODk5ODQ5.jT676l9OqowwCBO1vrOK7J1JUA__0H1Z66XDH5Ddguwg.5AZRBFVTYOgRW9_vntCuqFChh-iJPTzomvmt0_1_YH0g.PNG.uglycat8/KakaoTalk_20191118_023206916_01.png?type=w773"
                //             />
                //         </div>
                //         <div className="section" style={{width:"100%", height:"100vh", textAlign: "center"}}>
                //             <img style={{width:"100%", height:"100vh", textAlign: "center"}}
                //                 src = "https://postfiles.pstatic.net/MjAxOTExMThfNTEg/MDAxNTc0MDYwODk5ODI1.DmZgR1u3ej7bgbzpSOxl0cUguSVY2JBpALLSKtwT8yEg.rkteABs9Zp5m03DEBCilSMN-TV4AD3lMFUCGfh8c8Kcg.PNG.uglycat8/KakaoTalk_20191118_023852403.png?type=w773"
                //             />
                //         </div>
        
                //     </div>
                // );
        //       }}
        //     />
        //   );


        const login = (
            <ul>
                    <Link to = "/login" className="login-button">
                        <img src = {SigninButton}/>
                    </Link>
            </ul>
        );

        const logout = (
            <ul>
                <Link to = "" onClick={this.handleLogout} className="login-button">
                    <img src = {SignoutButton} />
                </Link>
            </ul>
        );

        const history =  {
            status: "2019",
            nodes: [
              {
                title: "1992, 하나와영 창설",
                dataIndex: "1992"
              },
              {
                title: "2016, 학회실 리뉴얼",
                dataIndex: "2016"
              },
              {
                title: "2019, 홈페이지 리뉴얼",
                dataIndex: "2019"
              }
            ]
          }
        
        return (
                <div>
                    <ReactFullpage
                    callbacks = {"onLeave"}
                    anchors = {["firstPage", "secondPage", "thirdPage", "fourthPage"]}
                    scrollOverflow = {false}
                    navigation= {true}
                    // licenseKey = {'YOUR_KEY_HERE'}
                    scrollingSpeed = {1000} /* Options here */
                    render={({ state, fullpageApi }) => {
                
                        return (
                            <div>
                                <div className="section" style={{ width:"100%", height:"100%", textAlign: "center", margin: "0px auto"}}>
                                    <img src = {Logo} style={{width:"100%", maxWidth:"773px"}}/>
                                    <Link to="/home" className="home-button"><h5 style={{fontWeight: "700"}}>Home</h5></Link>
                                        { this.props.status.isLoggedIn ? logout : login }
                                </div>
                                <div className="section" id="page2" style={{backgroundColor:"#2E2E2E", color:"white",  textAlign: "center"}}>
                                    <img src = {GrayLogo}/>
                                    <h3 style={{fontWeight: 'Light'}}>고려대학교 전기전자공학부 학회</h3>
                                    <h1 style={{fontWeight: 'Regular'}}>하나와영</h1>
                                    <h1>-</h1>
                                    <h5 style={{fontSize: '1rem', fontWeight: 'Light'}}>학회명은 컴퓨터가 이해하는 기본 숫자인 1과 0을 의미한다.</h5>
                                    <h5 style={{fontSize: '1rem', fontWeight: 'Light'}}>전기전자공학부 전공학회로 92학번을 중심으로 1992년 겨울 결성되었다.</h5>
                                    <h5 style={{fontSize: '1rem', fontWeight: 'Light'}}>주 분야는 컴퓨터 프로그래밍이고, 많은 토론과 세미나를 통해 역량을 키우고 있다.</h5>
                                    <h5 style={{fontSize: '1rem', fontWeight: 'Light'}}>도서관 안내 프로그램 등 다수의 프로그램을 개발, 발표하였다.</h5>
                                    <br/><br/><br/>
                                </div>
                                <div className="section" id= "page3" style={{width:"100%", height:"100vh", color:"white", padding: "0% 20%"}}>
                                    <Timeline
                                        mode='vertical'
                                        data={history}
                                        style={{fontWeight: 'Extrabold'}}
                                    />
                                    <h1></h1>
                                </div>
                                <div className="section" id= "page4" style={{backgroundColor:"#2E2E2E", padding:"0%"}}>
                                    <MDBContainer style={{width:"80%", margin:"0px auto", padding:"0px"}}>
                                        <MDBRow style={{margin:"0px", padding:"0px"}}>
                                            <MDBCol style={{margin:"0px", padding:"0px"}}>
                                                <MDBView hover zoom>
                                                    <img
                                                        src={gallery4}
                                                        className="img-fluid"
                                                        alt=""
                                                    />
                                                    <MDBMask className="flex-center" overlay={"black-strong"}>
                                                        <h1 style={{color:"white", fontWeight:"300", fontSize:"1.5rem", textAlign:"center"}}>중간발표<br/>2019.11.22</h1>
                                                    </MDBMask>
                                                </MDBView>
                                            </MDBCol>
                                            <MDBCol style={{margin:"0px", padding:"0px"}}>
                                                <MDBView hover zoom>
                                                    <img
                                                        src={gallery5}
                                                        className="img-fluid"
                                                        alt=""
                                                    />
                                                    <MDBMask className="flex-center" overlay={"black-strong"}>
                                                        <h1 style={{color:"white", fontWeight:"300", fontSize:"1.5rem", textAlign:"center"}}>중간발표<br/>2019.11.22</h1>
                                                    </MDBMask>
                                                </MDBView>
                                            </MDBCol>
                                            <MDBCol style={{margin:"0px", padding:"0px"}}>
                                                <MDBView hover zoom>
                                                    <img
                                                        src={gallery6}
                                                        className="img-fluid"
                                                        alt=""
                                                    />
                                                    <MDBMask className="flex-center" overlay={"black-strong"}>
                                                        <h1 style={{color:"white", fontWeight:"300", fontSize:"1.5rem", textAlign:"center"}}>중간발표<br/>2019.11.22</h1>
                                                    </MDBMask>
                                                </MDBView>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow style={{margin:"0px", padding:"0px"}}>
                                            <MDBCol style={{margin:"0px", padding:"0px"}}>
                                                <MDBView hover zoom>
                                                    <img
                                                        src={gallery7}
                                                        className="img-fluid"
                                                        alt=""
                                                    />
                                                    <MDBMask className="flex-center" overlay={"black-strong"}>
                                                        <h1 style={{color:"white", fontWeight:"300", fontSize:"1.5rem", textAlign:"center"}}>해커톤<br/>2019.12.29</h1>
                                                    </MDBMask>
                                                </MDBView>
                                            </MDBCol>
                                            <MDBCol style={{margin:"0px", padding:"0px"}}>
                                                <MDBView hover zoom>
                                                    <img
                                                        src={gallery8}
                                                        className="img-fluid"
                                                        alt=""
                                                    />
                                                    <MDBMask className="flex-center" overlay={"black-strong"}>
                                                        <h1 style={{color:"white", fontWeight:"300", fontSize:"1.5rem", textAlign:"center"}}>헤커톤<br/>2019.12.29</h1>
                                                    </MDBMask>
                                                </MDBView>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </div>
                                {/* <div className="section" style={{backgroundColor:"#ff5f45", color:"white",  textAlign: "center"}}>
                                    <h3>뭘 넣으면 좋을까요?</h3>
                                </div>
                                <div className="section" style={{backgroundColor:"#0798ec", color:"white",  textAlign: "center"}}>
                                    <h3>Slide up! </h3>
                                    <a onClick={() => fullpageApi.moveTo(1)} style={{fontStyle:{fontcolor:"white"}}}>
                                        Move Up!
                                    </a>
                                </div> */}
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





