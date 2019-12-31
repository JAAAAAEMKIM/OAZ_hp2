// src/containers/Home.js //메모가 여기에
import React from 'react';
import { connect } from 'react-redux';
import { Write, NoticeList } from 'components';
import { 
    noticePostRequest,
    noticeListRequest, 
    noticeEditRequest,
    noticeRemoveRequest, 
    noticeRemoveFromData, 
    noticeStarRequest
}from 'actions/notice';

class Home extends React.Component {
    
    constructor(props) {
        super(props);        
        this.handlePost = this.handlePost.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.loadNewNotice = this.loadNewNotice.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleStar = this.handleStar.bind(this);
    }

    componentDidMount() {
        // LOAD NEW NOTICE EVERY 5 SECONDS
        const loadNoticeLoop = () => {
            this.loadNewNotice().then(
                () => {
                    this.noticeLoaderTimeoutId = setTimeout(loadNoticeLoop, 5000);
                }
            );
        };
        this.props.noticeListRequest(true).then(
            () => {
                console.log(this.props.noticeData);
                // BEGIN NEW NOTICE LOADING LOOP
                loadNoticeLoop();
            }
        );
    }

    componentWillUnmount() {
        // STOPS THE loadNoticeLoop
        clearTimeout(this.noticeLoaderTimeoutId);
    }

    loadNewNotice() {
        // CANCEL IF THERE IS A PENDING REQUEST
        if(this.props.listStatus === 'WAITING') 
            return new Promise((resolve, reject)=> {
                resolve();
            });
        
        // IF PAGE IS EMPTY, DO THE INITIAL LOADING
        if(this.props.noticeData.length === 0 )
            return this.props.noticeListRequest(true);
            
        return this.props.noticeListRequest(false, 'new', this.props.noticeData[0]._id);
    }

    /* POST NOTICE */
    handlePost(contents) {
        return this.props.noticePostRequest(contents).then(
            () => {
                if(this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW NOTICE
                    this.loadNewNotice().then(
                        () => {
                            Materialize.toast('Success!', 2000, 'blue');
                        }
                    );
                } else {
                    /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY CONTENTS
                    */
                    let $toastContent;
                    switch(this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(()=> {location.reload(false);}, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #B00000">Please write something</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default:
                            $toastContent = $('<span style="color: #B00000">Something Broke</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }
                }
            }
        );
    }

    handleEdit(id, index, contents) {
        return this.props.noticeEditRequest(id, index, contents).then(
            () => {
                if(this.props.editStatus.status==="SUCCESS") {
                    Materialize.toast('Success!', 2000);
                } else {
                    /*
                        ERROR CODES
                            1: INVALID ID,
                            2: EMPTY CONTENTS
                            3: NOT LOGGED IN
                            4: NO RESOURCE
                            5: PERMISSION FAILURE
                    */
                    let errorMessage = [
                        'Something broke',
                        'Please write soemthing',
                        'You are not logged in',
                        'That notice does not exist anymore',
                        'You do not have permission'
                    ];
                    
                    let error = this.props.editStatus.error;
                    
                    // NOTIFY ERROR
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[error - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
                
                    // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
                    if(error === 3) {
                        setTimeout(()=> {location.reload(false)}, 2000);
                    }
                    
                }
            }
        );
    }

    handleRemove(id, index) {
        this.props.noticeRemoveRequest(id, index).then(() => {
            if(this.props.removeStatus.status==="SUCCESS") {
                // LOAD MORE NOTICE IF THERE IS NO SCROLLBAR
                // 1 SECOND LATER. (ANIMATION TAKES 1SEC)
                setTimeout(() => { 
                    if($("body").height() < $(window).height()) {
                        this.loadOldNotice();
                    }
                }, 1000);
            } else {
                // ERROR
                /*
                    DELETE NOTICE: DELETE /api/notice/:id
                    ERROR CODES
                        1: INVALID ID
                        2: NOT LOGGED IN
                        3: NO RESOURCE
                        4: PERMISSION FAILURE
                */
                let errorMessage = [
                    'Something broke',
                    'You are not logged in',
                    'That notice does not exist',
                    'You do not have permission'
                ];
                
                 // NOTIFY ERROR
                let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>');
                Materialize.toast($toastContent, 2000);


                // IF NOT LOGGED IN, REFRESH THE PAGE
                if(this.props.removeStatus.error === 2) {
                    setTimeout(()=> {location.reload(false)}, 2000);
                }
            }
        });
    }

    handleStar(id, index) {
        this.props.noticeStarRequest(id, index).then(
            () => {
                if(this.props.starStatus.status !== 'SUCCESS') {
                    /*
                        TOGGLES STAR OF NOTICE: POST /api/notice/star/:id
                        ERROR CODES
                            1: INVALID ID
                            2: NOT LOGGED IN
                            3: NO RESOURCE
                    */
                    let errorMessage= [
                        'Something broke',
                        'You are not logged in',
                        'That notice does not exist'
                    ];
                    
                    
                    // NOTIFY ERROR
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.starStatus.error - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
    
    
                    // IF NOT LOGGED IN, REFRESH THE PAGE
                    if(this.props.starStatus.error === 2) {
                        setTimeout(()=> {location.reload(false)}, 2000);
                    }
                }
            }
        );
    }


    render() {
        const write = (<Write onPost={this.handlePost}/>); // 수정필요한 부분 this.{props.handlePost}

        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
                <NoticeList data={this.props.noticeData} 
                    currentUser={this.props.currentUser}
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemove}
                    onStar={this.handleStar}
                    />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.notice.post,
        currentUser: state.authentication.status.currentUser,
        noticeData: state.notice.list.data,
        listStatus: state.notice.list.status,
        editStatus: state.notice.edit,
        removeStatus: state.notice.remove,
        starStatus: state.notice.star
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        noticePostRequest: (contents) => {
            return dispatch(noticePostRequest(contents));
        }, 
        noticeListRequest: (isInitial, listType, id, username) => {
            return dispatch(noticeListRequest(isInitial, listType, id, username));
        },
        noticeEditRequest: (id, index, contents) => {
            return dispatch(noticeEditRequest(id, index, contents));
        },
        noticeRemoveRequest: (id, index) => {
            return dispatch(noticeRemoveRequest(id, index));
        },
        noticeStarRequest: (id, index) => {
            return dispatch(noticeStarRequest(id, index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);