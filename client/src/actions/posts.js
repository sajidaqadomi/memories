import * as api from "../api";
import {
    COMMENT,
    CREATE,
    DELETE,
    DELETE_COMMENT,
    END_LOADING,
    FETCH_ALL,
    FETCH_BY_CREATOR,
    FETCH_BY_SEARCH,
    FETCH_POST,
    LIKE,
    START_LOADING,
    UPDATE,
    UPDATE_COMMENT,
} from "../utility/actionTypes";

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
        dispatch({ type: END_LOADING });
    }
};

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getPostsByCreator = (creator) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPostsByCreator(creator);

        dispatch({ type: FETCH_BY_CREATOR, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
        dispatch({ type: END_LOADING });
    }
};

export const getPostsBySearch =
    (searchQuery, loading = "on") =>
        async (dispatch) => {
            try {
                loading === "on" && dispatch({ type: START_LOADING });
                const { data } = await api.fetchPostsBySearch(searchQuery);

                dispatch({ type: FETCH_BY_SEARCH, payload: data });
                dispatch({ type: END_LOADING });
            } catch (error) {
                console.log(error);
                dispatch({ type: END_LOADING });
            }
        };

export const createPost = (post, history) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
        history.push(`/posts/${data._id}`);
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id);

        dispatch({ type: DELETE, payload: { _id: data._id } });
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (id, comment) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(id, comment);
        console.log(data, "comment");
        dispatch({ type: COMMENT, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateComment = (id, comment) => async (dispatch) => {
    try {
        const { data } = await api.updateComment(id, comment);

        dispatch({ type: UPDATE_COMMENT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteComment = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(id);

        dispatch({ type: DELETE_COMMENT, payload: id });
    } catch (error) {
        console.log(error);
    }
};
