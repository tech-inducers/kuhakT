import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import redux_thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import aclManagementReducer from "./store/reducer/aclManagementReducer";
import siteConfigReducer from "./store/reducer/siteConfigReducer";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  aclManagementReducer,
  siteConfigReducer
});
const history = createBrowserHistory();
export const store = createStore(
  rootReducer, composeEnhancers(applyMiddleware(redux_thunk))
);
ReactDOM.render(
  <>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
