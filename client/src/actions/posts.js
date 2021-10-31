import * as api from "../api"
import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, LIKE, START_LOADING, UPDATE } from "../utility/actionTypes"

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id)
        // console.log(data, '-', id, '-', 'id')
        dispatch({ type: FETCH_POST, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)

    }

}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page)
        console.log(data, '-', page, '-', 'page')
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)

    }

}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    console.log(searchQuery, 'actions')
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostsBySearch(searchQuery)
        //  console.log(data, 'postssearch')

        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error)
        dispatch({ type: END_LOADING })

    }

}

export const createPost = (post, history) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        // console.log(data, 'in create post')


        dispatch({ type: CREATE, payload: data })
        history.push(`/posts/${data._id}`)
    } catch (error) {

        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id)
        console.log(data, 'data')
        dispatch({ type: DELETE, payload: { _id: data._id } })

    } catch (error) {
        console.log(error)

    }
}

export const likePost = (id) => async (dispatch) => {
    console.log('action')
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })

    } catch (error) {
        console.log(error)

    }
}