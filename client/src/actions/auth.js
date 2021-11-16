import storage from '../auth/storage'
import { AUTH, END_LOADING_AUTH, ERROR_AUTH, LOGOUT, RETRIEV, START_LOADING_AUTH } from '../utility/actionTypes'
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
    dispatch({ type: START_LOADING_AUTH })
    dispatch({ type: ERROR_AUTH, payload: null })

    try {
        const { data } = await api.signIn(user)

        storage.saveToken(data.token)
        storage.saveUser(data.user)

        dispatch({ type: AUTH, payload: { ...data } })
        dispatch({ type: END_LOADING_AUTH })
        dispatch({ type: ERROR_AUTH, payload: null })

    } catch (error) {
        dispatch({ type: END_LOADING_AUTH })
        dispatch({ type: ERROR_AUTH, payload: error.response.data.message })




    }

}

export const signUp = (user) => async (dispatch) => {

    try {
        const { data } = await api.signUp(user)

        storage.saveToken(data.token)
        storage.saveUser(data.user)

        dispatch({ type: AUTH, payload: { ...data, errorMessage: null } })

    } catch (error) {

        console.log(error.response.data, 'error')
        dispatch({ type: ERROR_AUTH, payload: error.message })


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