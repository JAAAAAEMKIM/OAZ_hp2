import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router-dom';

class Board extends React.Component {
    render() {
        return (
            <Row>
                <Col xs>
                    <h1>공지사항</h1>
                    <h3>공지사항 리스트 쭊</h3>
                </Col>
                <Col xs>
                    <h1>질문과 답변</h1>
                    <h3>공지사항 리스트 쭊</h3>
                </Col>
                <Col xs>
                    <Link to='/guessipan'>자유 게시판</Link>
                    <h3>아무 글이나 리스트 쭊</h3>
                </Col>
                <Col xs>
                    <h1>정보 공유</h1>
                    <h3>정보글 리스트 쭊</h3>
                </Col>

            </Row>
        );
    }
}


export default Board;