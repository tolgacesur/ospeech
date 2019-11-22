import React from 'react';
import { Link } from 'react-router-dom';

import ApiService from '../../service/api';
import Cache from '../../service/cache';

class Topnavbar extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			user : Cache.user
		}

		this.logout = this.logout.bind(this);
	}

	logout(){
		ApiService.logout();
	}

	render() {
		return (
			<nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
				<div className="container-fluid justify-content-end">
					<div className="text-white text-right d-none d-md-block">
						<div>
							<small>{this.state.user.username}</small>
						</div>
						<div>
							<small>{this.state.user.email}</small>
						</div>
					</div>
					<ul className="navbar-nav align-items-center d-none d-md-flex">
						<li className="nav-item dropdown">
							<a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<div className="media align-items-center">
									<span className="avatar avatar-sm rounded-circle">
										<img alt="Image placeholder" src={process.env.PUBLIC_URL + "/assets/img/user.png"}/>
									</span>
								</div>
							</a>
							<div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
								<div className=" dropdown-header noti-title">
									<h6 className="text-overflow m-0">Welcome!</h6>
								</div>
								<Link to="" onClick={this.logout} className="dropdown-item">
									<i className="ni ni-user-run"></i>
									<span>Logout</span>
								</Link>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Topnavbar;