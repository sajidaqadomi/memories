
const saveToken = (value) => {
    try {
        localStorage.setItem('token', value)
    }
    catch (error) {
        console.log(error)

    }
}

const removeToken = () => {
    try {
        localStorage.removeItem('token')
    }
    catch (error) {
        console.log(error)

    }
}

const getToken = () => {
    try {
        const token = localStorage.getItem('token')
        return token
    }
    catch (error) {
        console.log(error)

    }
}
const saveUser = (user) => {
    try {
        localStorage.setItem('user', JSON.stringify(user))
    }
    catch (error) {
        console.log(error)

    }
}

const removeUser = () => {
    try {
        localStorage.removeItem('user')
    }
    catch (error) {
        console.log(error)

    }
}

const getUser = () => {
    try {
        const user = localStorage.getItem('user')
        return JSON.parse(user)

    }
    catch (error) {
        console.log(error)

    }
}

const clearStorage = () => {
    try {
        localStorage.clear()
    }
    catch (error) {
        console.log(error)

    }
}

export default { saveToken, saveUser, removeToken, removeUser, getToken, getUser, clearStorage }