import axios from 'axios'
import * as storage from '../utility/storage'
import authStorage from '../auth/storage'


const url = 'http://localhost:5000'
//const url = 'https://memories-reac.herokuapp.com'
const API = axios.create({ baseURL: url });

const get = API.get//override get to support cache
API.get = async (url, params, axiosConfig) => {
    try {
        const response = await get(url, params, axiosConfig);
        if (response.data) {
            storage.store(url, response.data)
            return response
        }
        let data = storage.get(url)
        return data ? ({ data }) : (response)
    } catch (error) {
        let data = storage.get(url)
        return data ? ({ data }) : ({ message: error })

    }

}

API.interceptors.request.use((req) => {
    if (authStorage.getToken()) {
        req.headers.Authorization = `Bearer ${authStorage.getToken()}`;
    }

    return req;
});

export const fetchPost = (id) => {
    return API.get(`/posts/${id}`)
}

export const fetchPosts = (page) => {
    return API.get(`/posts?page=${page}`)
}

export const fetchPostsByCreator = (creator) => {
    return API.get(`posts/creator?name=${creator}`)
}

export const fetchPostsBySearch = (searchQuery) => {
    return API.get(`/posts/search?searchQuery=${searchQuery.searchMemories || 'none'}&tags=${searchQuery.tags.join(',')}`)

}

export const createPost = (newPost) => {
    return API.post(`/posts`, newPost)
}

export const deletePost = (id) => {
    return API.delete(`/posts/${id}`)
}

export const likePost = (id) => {
    return API.patch(`/posts/${id}/likePost`)
}

export const commentPost = (id, comment) => {
    return API.post(`/posts/${id}/comment`, comment)
}

export const updateComment = (id, commentId, comment) => {
    return API.patch(`/posts/${id}/comment/${commentId}`, comment)
}

export const deleteComment = (id, commentId) => {
    return API.delete(`/posts/${id}/comment/${commentId}`)
}

export const updatePost = (id, post) => {
    return API.patch(`/posts/${id}`, post)
}


export const signIn = (user) => {
    return API.post(`/user/signin`, user)

}

export const signUp = (user) => {
    return API.post(`/user/signup`, user)

}

export const findEmail = (email) => {
    return API.post(`/user/email`, { email })

}