import React from 'react';
import PropTypes from 'prop-types';
import {Notice} from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NoticeList extends React.Component {
    render() {
        const mapToComponents = data => {
            return data.map((notice, i) => {
                return (<Notice 
                            data={notice}
                            ownership={ (notice.writer === this.props.currentUser) }
                            key={notice._id}
                            index={i}
                            onEdit={this.props.onEdit}
                            onRemove={this.props.onRemove}
                            onStar={this.props.onStar}
                            currentUser={this.props.currentUser}
                />);
            });
        };
        
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="notice" 
                                transitionEnterTimeout={2000}
                                transitionLeaveTimeout={1000}>
                    {mapToComponents(this.props.data)}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

NoticeList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onStar: PropTypes.func
};

NoticeList.defaultProps = {
    data: [],
    currentUser: '',
    onEdit: (id, index, contents) => {
        console.error('edit function not defined');
    },
    onRemove: (id, index) => { 
        console.error('remove function not defined'); 
    },
    onStar: (id, index) => {
        console.error('star function not defined');
    }
};

export default NoticeList;