import 'core-js/es6/map';
import 'core-js/es6/set';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'material-icons/iconfont/material-icons.scss';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/style.scss';
import './assets/icon/style.css'
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
        <Provider store={store} >
                <App />
        </Provider>
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
