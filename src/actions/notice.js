import {
    NOTICE_POST,
    NOTICE_POST_SUCCESS,
    NOTICE_POST_FAILURE,

    NOTICE_LIST,
    NOTICE_LIST_SUCCESS,
    NOTICE_LIST_FAILURE,

    NOTICE_EDIT,
    NOTICE_EDIT_SUCCESS,
    NOTICE_EDIT_FAILURE,

    NOTICE_REMOVE,
    NOTICE_REMOVE_SUCCESS,
    NOTICE_REMOVE_FAILURE,

    NOTICE_STAR,
    NOTICE_STAR_SUCCESS,
    NOTICE_STAR_FAILURE
} from './ActionTypes';


import axios from 'axios';

/* NOTICE POST */
export function noticePostRequest(contents) {
    return (dispatch) => {
        // inform NOTICE POST API is starting
        dispatch(noticePost());

        return axios.post('/api/notice/',  contents )
        .then((response) => {
            console.log("please");
            dispatch(noticePostSuccess());
        }).catch((error) => {
            dispatch(noticePostFailure(error.response.data.code));
        });
    };
}

export function noticePost() {
    return {
        type: NOTICE_POST
    };
}

export function noticePostSuccess() {
    return {
        type: NOTICE_POST_SUCCESS
    };
}

export function noticePostFailure(error) {
    return {
        type: NOTICE_POST_FAILURE,
        error
    };
}

/* NOTICE LIST */

/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' notice or 'new' notice
        - id:        OPTIONAL; notice id (one at the bottom or one at the top)
        - username:  OPTIONAL; find notices of following user
*/
export function noticeListRequest(isInitial, listType, id, username) {
    return (dispatch) => {
        // inform notice list API is starting
        dispatch(noticeList());
        
        let url = '/api/notice';
        
        if(typeof username==="undefined") {
            // username not given, load public notice
            url = isInitial ? url : `${url}/${listType}/${id}`;
            // or url + '/' + listType + '/' +  id
        } else {
            // load notices of specific user
            /* to be implemented */
        }
          
        return axios.get(url)
        .then((response) => {
            dispatch(noticeListSuccess(response.data, isInitial, listType));
        }).catch((error) => {
            dispatch(noticeListFailure());
        });
    };
}

export function noticeList() {
    return {
        type: NOTICE_LIST
    };
}

export function noticeListSuccess(data, isInitial, listType) {
    return {
        type: NOTICE_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function noticeListFailure() {
    return {
        type: NOTICE_LIST_FAILURE
    };
}

/* NOTICE EDIT */
export function noticeEditRequest(id, index, contents) {
    return (dispatch) => {
        dispatch(noticeEdit());

        return axios.put('/api/notice/' + id, {contents})
        .then((response) => {
            dispatch(noticeEditSuccess(index, response.data.notice));
        }).catch((error) => {
            dispatch(noticeEditFailure(error.response.data.code));
        });
    };
}

export function noticeEdit() {
    return {
        type: NOTICE_EDIT
    };
}

export function noticeEditSuccess(index, notice) {
    return {
        type: NOTICE_EDIT_SUCCESS,
        index,
        notice
    };
}

export function noticeEditFailure(error) {
    return {
        type: NOTICE_EDIT_FAILIURE,
        error
    };
}

/* NOTICE REMOVE */
export function noticeRemoveRequest(id, index) {
    return (dispatch) => {
        dispatch(noticeRemove());
        
        return axios.delete('/api/notice/' + id)
        .then((response) => {
            dispatch(noticeRemoveSuccess(index));
        }).catch((error) => {
            dispatch(noticeRemoveFailure(error.response.data.code));
        });
    };
}
export function noticeRemove() {
    return {
        type: NOTICE_REMOVE
    };
}

export function noticeRemoveSuccess(index) {
    return {
        type: NOTICE_REMOVE_SUCCESS,
        index
    };
}

export function noticeRemoveFailure(error) {
    return {
        type: NOTICE_REMOVE_FAILURE,
        error
    };
}


/* NOTICE TOGGLE STAR */
export function noticeStarRequest(id, index) {
    return (dispatch) => {
        return axios.post('/api/notice/star/' + id)
        .then((response) => {
            dispatch(noticeStarSuccess(index, response.data.notice));
        }).catch((error) => {
            dispatch(noticeStarFailure(error.response.data.code));
        });
    };
}

export function noticeStar() {
    return {
        type: NOTICE_STAR
    };
}

export function noticeStarSuccess(index, notice) {
    return {
        type: NOTICE_STAR_SUCCESS,
        index,
        notice
    };
}

export function noticeStarFailure(error) {
    return{
        type: NOTICE_STAR_FAILURE,
        error
    };
}