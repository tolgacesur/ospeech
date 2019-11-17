import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import Welcome from './welcome/welcome';
import Dashboard from './dashboard/dashboard';
import ApiService from './service/api';


function Home() {
	const token = ApiService.getToken();

	if (token) {
		return <Redirect to="/main"/>
	}

	return null
}

function App() {
	return (
		<Router>
			<Route path="/" component={Home}/>
			<Route path="/login" component={Welcome}/>
			<Route path="/register" component={Welcome}/>
			<Route path="/main" component={Dashboard}/>
		</Router>
	);
}

export default App;
