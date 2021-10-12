import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../utility/actionTypes";

export const reducer = (posts = [], action) => {

    switch (action.type) {
        case FETCH_ALL:
            return action.payload;

        case CREATE:
            return [...posts, action.payload];

        case DELETE:
            return posts.filter(post => post._id !== action.payload._id);

        case LIKE:
            return posts.map(post => post._id === action.payload._id ? (action.payload) : (post));

        case UPDATE:
            return posts.map(post => post._id === action.payload._id ? action.payload : post)

        default:
            return posts

    }

}