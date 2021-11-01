export const get = (key) => {
    const value = localStorage.getItem(key)
    return JSON.parse(value)
}
export const store = (key, value) => {
    const item = localStorage.setItem(key, JSON.stringify(value))

    if (!item) return null
    return item
}