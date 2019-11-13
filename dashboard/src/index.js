import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import App from './app/App';
import './app/App.scss';
import './index.css';
import './assets/highlight/github.css';

import * as serviceWorker from './serviceWorker';

const routing = (
	<Router>
		<Route path="/" component={App} />
	</Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
