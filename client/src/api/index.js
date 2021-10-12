import axios from 'axios'

//const url = 'http://localhost:4000/posts'
const url = 'https://memories-reac.herokuapp.com/posts'

export const fetchPosts = () => {
    return axios.get(url)
}

export const createPost = (newPost) => {
    return axios.post(url, newPost)
}

export const deletePost = (id) => {
    return axios.delete(`${url}/${id}`)
}

export const likePost = (id) => {
    return axios.patch(`${url}/${id}/likePost`)
}

export const updatePost = (id, post) => {
    return axios.patch(`${url}/${id}`, post)

}