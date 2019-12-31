import React from 'react';
import PropTypes from 'prop-types';
import {Memotest} from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {memoListRequest} from '../actions/memo'


import ListGroup from 'react-bootstrap/ListGroup';

class MemoThumbnail extends React.Component {
    render() {
        const mapToComponents = data => {
            return data.map((memo, i) => {
                if(i<=10){
                    return (
                        <Memotest
                            data={memo}
                            key={memo._id}
                        />);
                }
                
            });
        };
        
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="memo" 
                                transitionEnterTimeout={2000}
                                transitionLeaveTimeout={1000}>
                        {mapToComponents(this.props.data)}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

MemoThumbnail.propTypes = {
    data: PropTypes.array,
};

MemoThumbnail.defaultProps = {
    data: [],
};

export default MemoThumbnail;