import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class Board extends React.Component {
    render() {
        return (
            <div style={{width:"100%", display:"flex", flexWrap : "wrap", flexDirection: "row", justifyContent: "center"}}>
                <div className="BoardList" style={BoardList}>
                    <Link to='/notice' style={{fontWeight:"700", fontSize:"1.5rem"}}>공지사항</Link>
                    <h3 style={{fontSize:"1.5rem"}}>공지사항 리스트</h3>
                </div>
                <div className="BoardList" style={BoardList}>
                    <h1 style={{fontWeight:"700", fontSize:"1.5rem"}}>기술 블로그</h1>
                    <h3 style={{fontSize:"1.5rem"}}>리스트</h3>
                </div>
                <div className="BoardList" style={BoardList}>
                    <Link to='/guessipan' style={{fontWeight:"700", fontSize:"1.5rem"}}>자유게시판</Link>
                    <h3 style={{fontSize:"1.5rem"}}>리스트</h3>
                </div>
                <div className="BoardList" style={BoardList}>
                    <h1 style={{fontWeight:"700", fontSize:"1.5rem"}}>건의사항</h1>
                    <h3 style={{fontSize:"1.5rem"}}>건의사항 리스트</h3>
                </div>
            </div>

        );
    }
}

const BoardList = {
    fontFamily: 'nanumsquare',
    width: "200px",
    height: "400px",
    borderRadius: "10px",
    background:"white",
    margin: "1.5%",
    padding: "1%",
    boxShadow: "0 7px 7px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",

}


export default Board;