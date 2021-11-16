import React, { createContext, useState } from 'react'

export const UpdateContext = createContext()

const UpdateContextProvider = ({ children }) => {
    const [currentId, setCurrentId] = useState(null)
    return (
        <UpdateContext.Provider value={{ currentId, setCurrentId }} >
            {children}
        </UpdateContext.Provider>
    )
}

export default UpdateContextProvider
