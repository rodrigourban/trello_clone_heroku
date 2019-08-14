import React from 'react';
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import apiReducer from './store/reducers/api';
import modalReducer from './store/reducers/modal';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './assets/index.scss';
import App from './App';

const composeEnhaces = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  modal: modalReducer,
  api: apiReducer
})

const store = createStore(rootReducer, composeEnhaces(applyMiddleware(thunk)))
const app = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();