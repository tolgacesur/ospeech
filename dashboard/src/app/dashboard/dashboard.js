import React from 'react';
import { Route } from 'react-router-dom';

import SideMenu from './side-menu/side-menu';
import Main from './main/main';
import Topnavbar from './topnavbar/topnavbar';
import Footer from './footer/footer';

import ApiService from '../service/api';
import Cache from '../service/cache';

import './dashboard.scss';

class Dashboard extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			ready : false
		}
	}

	UNSAFE_componentWillMount(){
		window.document.body.style.backgroundColor = '#f8f9fe';
		ApiService.getAppData().then(data => {
			Cache.setUser(data.user);
			Cache.setRoom(data.room);

			this.setState({
				ready: true
			})
		});
	}

	render() {
		if (!this.state.ready){
			return null
		}

		return (
			<div className="body">
				<SideMenu/>
				<div className="main-content">
					<Topnavbar/>
					<div className="header bg-gradient-primary pb-6 pt-5 pt-md-8">
					</div>
					<div className="container-fluid mt--7">
						<Route exact path="/main">
							<Main />
						</Route>
						<Footer/>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;