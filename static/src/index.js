import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css"
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

function renderApp(){
    ReactDOM.render(
        <Router history= {history}>
            <App />
        </Router>
    , document.getElementById('root'));
}

renderApp();