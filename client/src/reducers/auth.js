import { AUTH, LOGOUT, RETRIEV } from "../utility/actionTypes";
import storage from '../auth/storage'



export const authReducer = (authData = { token: null, user: null }, action) => {

    switch (action.type) {
        case AUTH:
            return action.payload;

        case LOGOUT:
            return { token: null, user: null }

        case RETRIEV:
            return action.payload
        default:
            return authData

    }

}