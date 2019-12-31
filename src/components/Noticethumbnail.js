import React from 'react';
import PropTypes from 'prop-types';
import {Memotest} from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NoticeThumbnail extends React.Component {
    render() {
        const mapToComponents = data => {
            return data.map((notice, i) => {
                console.log(i,"th ",notice.title)
                if(i<=10){
                    return (
                        <Memotest
                            memo = {false}
                            data={notice}
                            key={notice._id}
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

NoticeThumbnail.propTypes = {
    data: PropTypes.array,
};

NoticeThumbnail.defaultProps = {
    data: [],
};

export default NoticeThumbnail;