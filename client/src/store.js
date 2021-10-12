import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import React from 'react'

import reducers from "./reducers";
import { Provider } from "react-redux";

const store = createStore(reducers, compose(applyMiddleware(thunk)));



const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>

  )
}

export default StoreProvider
