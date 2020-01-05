import React from 'react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';

class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            contents: {
                title: props.data.title,
                contents: props.data.contents
            },
            titles: props.data.title,
            content: props.data.contents
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange_title = this.handleChange_title.bind(this);
        this.handleChange_contents = this.handleChange_contents.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleStar = this.handleStar.bind(this);
    }
    

    toggleEdit() {
        if(this.state.editMode) {
            let id = this.props.data._id;
            let index = this.props.index;
            const newcontents = this.state.contents;
            newcontents.title = this.state.titles;
            newcontents.contents = this.state.content;
            this.setState({
                contents: newcontents
            });
            let contents = this.state.contents;
            
    
            
            this.props.onEdit(id, index, contents).then(() => {
                this.setState({
                    editMode: !this.state.editMode
                });
            })
        } else {
            this.setState({
                editMode: !this.state.editMode
            });   
        }
    }

    handleChange_title(e) {
        this.setState({
            titles: e.target.value
        });
    }

    handleChange_contents(e) {
        this.setState({
            content: e.target.value
        });
    }

    handleRemove() {
        let id = this.props.data._id;
        let index = this.props.index;
        this.props.onRemove(id, index);
    }

    handleStar() {
        let id = this.props.data._id;
        let index = this.props.index;
        this.props.onStar(id, index); 
    }
    
    render() {
        
        const {data, ownership} = this.props;

        let starStyle = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ff9980' } : {} ;

        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button'
                     id={`dropdown-button-${data._id}`}
                     data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${this.props.data._id}`} className='dropdown-content'>
                    <li><a onClick={this.toggleEdit}>Edit</a></li>
                    <li><a onClick={this.handleRemove}>Remove</a></li>
                </ul>
            </div>
        );

        let editedInfo = (
            <span style={{color: '#AAB5BC'}}> · Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
        );
        
        const noticeView = (
            <div className="card">
                <div className="info">
                    <a className="username">{this.props.data.writer}</a> wrote a log · <TimeAgo date = {this.props.data.date.created}/>
                    {this.props.data.is_edited ? editedInfo : undefined }
                    {this.props.ownership ? dropDownMenu : undefined}
                    <div className="option-button">
                        <a className='dropdown-button' 
                            id={`dropdown-button-${data._id}`} 
                            data-activates={`dropdown-${data._id}`}>
                            <i className="material-icons icon-button">more_vert</i>
                        </a>
                        <ul id={`dropdown-${this.props.data._id}`} className='dropdown-content'>
                            <li><a onClick={this.toggleEdit}>Edit</a></li>
                            <li><a onClick={this.handleRemove}>Remove</a></li>
                        </ul>
                    </div>
                </div>
                <div className="card-title">
                    {data.title}
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button"
                    style={starStyle}
                    onClick={this.handleStar}>star</i>
                    <span className="star-count">{this.props.data.starred.length}</span>
                </div>
            </div>
        )

        const editView = (
            <div className="write">
                <div className="card">
                    <div className="card-title">
                        <textarea
                            className="materialize-titlearea"
                            value={this.state.titles}
                            onChange={this.handleChange_title}></textarea>
                    </div>
                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            value={this.state.content}
                            onChange={this.handleChange_contents}></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.toggleEdit}>OK</a>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="container notice">
                {this.state.editMode ? editView : noticeView }
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

Notice.propTypes = {
    data: PropTypes.object,
    ownership: PropTypes.bool,
    onEdit: PropTypes.func,
    index: PropTypes.number,
    onRemove: PropTypes.func,
    onStar: PropTypes.func,
    starStatus: PropTypes.object,
    currentUser: PropTypes.string
};

Notice.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        title: 'Title',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: [] 
    },
    ownership: true,
    onEdit: (id, index, contents) => {
        console.error('onEdit function not defined');
    },
    index: -1,
    onRemove: (id, index) => { 
        console.error('remove function not defined'); 
    },
    onStar: (id, index) => {
        console.error('star function not defined');
    },
    starStatus: {},
    currentUser: ''
}



export default Notice;