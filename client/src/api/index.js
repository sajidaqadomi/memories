import axios from 'axios'
import storage from '../auth/storage'

const API = axios.create({ baseURL: 'http://localhost:5000' });
//const url = 'http://localhost:5000'
//const url = 'https://memories-reac.herokuapp.com/posts'
API.interceptors.request.use((req) => {
    if (storage.getToken()) {
        console.log(storage.getToken())
        req.headers.Authorization = `Bearer ${storage.getToken()}`;
    }

    return req;
});

export const fetchPosts = () => {
    return API.get(`/posts`)
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

export const updatePost = (id, post) => {
    return API.patch(`/posts/${id}`, post)
}


export const signIn = (user) => {
    return API.post(`/user/signin`, user)

}

export const signUp = (user) => {
    console.log(user, 'api')
    return API.post(`/user/signup`, user)

}