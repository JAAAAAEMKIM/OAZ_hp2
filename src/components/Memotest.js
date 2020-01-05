import React from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

class Memotest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.data.contents
        };
    }
    
    render() {
        
        const {data, ownership} = this.props;
        
        const memoView = (
            <ListGroup.Item style={{padding:"5px", margin:"0px"}}>
            <div className="box" style={{fontSize:"15px", overflow:"hidden", boxSizing:"content-box", height:"20px"}}>
                {data.contents}
            </div>
            </ListGroup.Item>
        )

        return (
            <div className="container memo">
                { memoView }
            </div>
        );
    }
    
    componentDidUpdate() {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

}

Memotest.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
};

Memotest.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: [] 
    },
}



export default Memotest;