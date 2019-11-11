import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import './Home.css';
import ReactFullpage from '@fullpage/react-fullpage'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "fullpage.js/vendors/scrolloverflow"; 
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
// import ProgressBar from 'react-bootstrap/ProgressBar';

const fullpageOptions = {
    anchors: ["firstPage", "secondPage", "thirdPage"],
    sectionsColor: ["#282c34", "#ff5f45", "#0798ec"],
    callbacks: ["onLeave"],
    scrollOverflow: true,
  };
  
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
                <div className="section" style={{ width:"100%", height:"100%", textAlign: "center"}}>
                    {/* <AwesomeSlider style={{width:"100%", height:"100%"}}>
                        <div data-src="https://images.mypetlife.co.kr/content/uploads/2019/07/12153720/cat-4265304_1920.jpg" />
                        <div data-src="https://img9.yna.co.kr/etc/inner/KR/2019/04/08/AKR20190408066300073_01_i_P2.jpg" />
                        <div data-src="https://i.ytimg.com/vi/lUkrXEMMJSg/maxresdefault.jpg" />
                    </AwesomeSlider> 
                    
                    전체화면 슬라이더가 잘 안되서 차라리 조그만 갤러리처럼 넣는게 좋을 것 같아요
                    
                    */}
                    
                    <h1>OAZ HOMEPAGE</h1>
                    <p/>
                    <ul>
                        <Link to="/home" className="brand-logo center">HOME<p/></Link>
                        <Link to="/login" className="brand-logo center">Sign In<p/></Link>
                        OR<p/>
                        <Link to="/register" className="brand-logo center">Register</Link>
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
  );

class oazHome extends React.Component{
    render(){
        return (
            // <div>
            //     {<header>
            //       {/* <ProgressBar variant="info" now={50} /> */}
            //     </header>}
                <div>
                    <Fullpage title="하나와영 홈페이지"></Fullpage>

                </div>
            //   </div>
        );
    };
}

export default oazHome;





