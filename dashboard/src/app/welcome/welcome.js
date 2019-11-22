import React from 'react';
import { Route } from 'react-router-dom';

import Topnavbar from './topnavbar/topnavbar';
import Login from './login/login';
import Register from "./register/register";
import Footer from './footer/footer';
import Header from './header/header';
import './welcome.scss';

class Welcome extends React.Component {

	render() {
		return (
			<div className="bg-default">
				<div className="main-content">
					<Topnavbar/>
					<Header/>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Footer/>
				</div>
			</div>
		);
	}
}

export default Welcome;