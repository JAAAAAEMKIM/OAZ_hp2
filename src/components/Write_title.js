import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

class Write_title extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            contents: {
                title: '',
                contents: ''
            },
            content: '',
            titles: ''            
        };

        this.handleChange_title = this.handleChange_title.bind(this);
        this.handleChange_contents = this.handleChange_contents.bind(this);
        this.handlePost = this.handlePost.bind(this);
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

    handlePost() {
        // this.setState({
        //     contents: {title: this.state.titles, contents: this.state.content}
        // });

        // let contents = this.state.contents;
        // let cont = ({
        //     title: this.state.titles,
        //     contents: this.state.content
        // });

        // this.setState({
        //     contents: cont
        // });

        const newcontents = this.state.contents;
        newcontents.title = this.state.titles;
        newcontents.contents     = this.state.content;
        this.setState({
            contents: newcontents
        });

        let contents = this.state.contents;


        console.log(this.state);
        
        console.log("hi"+contents);
        console.log(this.state);
        this.props.onPost(contents).then((contents) => {
            // this.props.onPost((contents) => {
                console.log("inner")
                this.setState({
                    contents: ""
                });
            }
        );
    }

    render() {
        console.log("value_title: " + this.state.titles);
        console.log("value_contents: " + this.state.content);
        return (
            <div className="container write">
                <div className="card">
                    <div className="card-title">
                        <textarea 
                            className="materialize-titlearea" 
                            placeholder="Write down your title"
                            value={this.state.titles}
                            onChange={this.handleChange_title}></textarea>
                    </div>
                    <div className="card-content">
                        <textarea 
                            className="materialize-textarea" 
                            placeholder="Write down your memo"
                            value={this.state.content}
                            onChange={this.handleChange_contents}></textarea>
                            
                    </div>
                    <div className="card-action">
                        <a onClick={this.handlePost}>POST</a>
                    </div>
                </div>
            </div>
        );
    }
}

Write_title.propTypes = {
    onPost: PropTypes.func,
    status: PropTypes.object
};

Write_title.defaultProps = {
    onPost: (contents) => { console.error('post function not defined'); },
    status: {}
};

export default Write_title;