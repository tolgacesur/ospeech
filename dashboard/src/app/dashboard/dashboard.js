import React from 'react';
import { Route } from 'react-router-dom';

import SideMenu from './side-menu/side-menu';
import Main from './main/main';
import Profile from './profile/profile';
import Topnavbar from './topnavbar/topnavbar';
import Footer from './footer/footer';

import './dashboard.scss';

class Dashboard extends React.Component {

	componentWillMount(){
		window.document.body.style.backgroundColor = '#f8f9fe';
	}

	render() {
		return (
			<div className="body">
				<SideMenu/>
				<div className="main-content">
					<Topnavbar/>
					<div className="header bg-gradient-primary pb-6 pt-5 pt-md-8">
					</div>
					<div className="container-fluid mt--7">
						<Route exact path="/dashboard">
							<Main />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
						<Footer/>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;