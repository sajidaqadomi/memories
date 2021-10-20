import { combineReducers } from "redux";

import { reducer as posts } from './posts'
import { authReducer as authData } from './auth'

export default combineReducers({
    posts,
    authData

})