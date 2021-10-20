import storage from '../auth/storage'
import { AUTH, LOGOUT, RETRIEV } from '../utility/actionTypes'
import * as api from '../api'

export const saveUser = (authData) => async (dispatch) => {
    try {
        await storage.saveToken(authData.token)
        await storage.saveUser(authData.user)

        dispatch({ type: AUTH, payload: authData })

    } catch (error) {

        console.log(error)

    }

}

export const signIn = (user) => async (dispatch) => {
    try {
        const { data } = await api.signIn(user)
        console.log(data, 'signin')

        storage.saveToken(data.token)
        storage.saveUser(data.user)


        dispatch({ type: AUTH, payload: data })

    } catch (error) {

        console.log(error)

    }

}

export const signUp = (user) => async (dispatch) => {
    console.log(user, 'signupuser')
    try {
        const { data } = await api.signUp(user)
        /// console.log(data, 'signup')

        storage.saveToken(data.token)
        storage.saveUser(data.user)

        dispatch({ type: AUTH, payload: data })

    } catch (error) {

        console.log(error.message, 'error')

    }

}

export const removeUser = () => async (dispatch) => {
    try {
        storage.removeToken()
        storage.removeUser()

        dispatch({ type: LOGOUT })

    } catch (error) {

        console.log(error)

    }

}

export const retrieveUser = () => async (dispatch) => {
    try {
        const token = storage.getToken()
        const user = storage.getUser()

        dispatch({ type: RETRIEV, payload: { token, user } })

    } catch (error) {

        console.log(error)

    }

}