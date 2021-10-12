import * as api from "../api"
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../utility/actionTypes"

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()

        dispatch({ type: FETCH_ALL, payload: data })

    } catch (error) {
        console.log(error)

    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        console.log(data, 'in create post')

        dispatch({ type: CREATE, payload: data })
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