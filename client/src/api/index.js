import axios from 'axios'
import storage from '../auth/storage'


const url = 'http://localhost:5000'
//const url = 'https://memories-reac.herokuapp.com'
const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
    if (storage.getToken()) {
        req.headers.Authorization = `Bearer ${storage.getToken()}`;
    }

    return req;
});

export const fetchPost = (id) => {
    return API.get(`/posts/${id}`)
}

export const fetchPosts = (page) => {
    return API.get(`/posts?page=${page}`)
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

export const updatePost = (id, post) => {
    return API.patch(`/posts/${id}`, post)
}


export const signIn = (user) => {
    return API.post(`/user/signin`, user)

}

export const signUp = (user) => {
    return API.post(`/user/signup`, user)

}