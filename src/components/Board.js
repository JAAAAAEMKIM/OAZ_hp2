import React from 'react';
import PropTypes from 'prop-types';
import './Board.css';
import { connect } from 'react-redux';
import {Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router-dom';
import {MemoThumbnail} from 'components';
import { 
    memoPostRequest,
    memoListRequest, 
    memoEditRequest,
    memoRemoveRequest, 
    memoRemoveFromData, 
    memoStarRequest
}from 'actions/memo';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.loadNewMemo = this.loadNewMemo.bind(this);
    }

    componentDidMount() {
        // LOAD NEW MEMO EVERY 5 SECONDS
        const loadMemoLoop = () => {
            this.loadNewMemo().then(
                () => {
                    this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
                }
            );
        };
        this.props.memoListRequest(true).then(
            () => {
                console.log(this.props.memoData);
                // BEGIN NEW MEMO LOADING LOOP
                loadMemoLoop();
            }
        );
    }

    componentWillUnmount() {
        // STOPS THE loadMemoLoop
        clearTimeout(this.memoLoaderTimeoutId);
    }

    loadNewMemo() {
        // CANCEL IF THERE IS A PENDING REQUEST
        if(this.props.listStatus === 'WAITING') 
            return new Promise((resolve, reject)=> {
                resolve();
            });
        
        // IF PAGE IS EMPTY, DO THE INITIAL LOADING
        if(this.props.memoData.length === 0 )
            return this.props.memoListRequest(true);
            
        return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
    }

    render() {
        return (
            <div style={{width:"100%", display:"flex", flexWrap : "wrap", flexDirection: "row", justifyContent: "center"}}>
                <div className="BoardList" style={BoardList}>
                    <Link to='/notice' style={{fontWeight:"700", fontSize:"1.5rem"}}>공지 사항</Link>
                    <h3 style={{fontSize:"1.5rem"}}>공지사항 리스트</h3>
                </div>
                <div className="BoardList" style={BoardList}>
                    <h1 style={{fontWeight:"700", fontSize:"1.5rem"}}>질문과 답변</h1>
                    <h3 style={{fontSize:"1.5rem"}}>공지사항 리스트</h3>
                </div>
                <div className="BoardList" style={BoardList}>
                    <Link to='/guessipan' style={{fontWeight:"700", fontSize:"1.5rem"}}>자유 게시판</Link>
                    
                    <MemoThumbnail className="jaemin" data={this.props.memoData} 
                        currentUser={this.props.currentUser}>
                    </MemoThumbnail>
                </div>
                <div className="BoardList" style={BoardList}>
                    <h1 style={{fontWeight:"700", fontSize:"1.5rem"}}>정보 공유</h1>
                    <h3 style={{fontSize:"1.5rem"}}>정보글 리스트</h3>
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

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data,
        listStatus: state.memo.list.status,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoListRequest: (isInitial, listType, id, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);