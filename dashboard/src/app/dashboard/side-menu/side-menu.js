import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import ApiService from '../../service/api';

class Sidemenu extends React.Component {

	logout(){
		ApiService.logout();
	}

	render() {
		return (
			<nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
				<div className="container-fluid">
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<Link className="navbar-brand pt-0" to="/main">
						<img src={process.env.PUBLIC_URL + "/assets/img/header-logo.png"} className="navbar-brand-img" alt="..."/>
					</Link>
					<ul className="nav align-items-center d-md-none">
						<li className="nav-item dropdown">
							<a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
								<div className="dropdown-divider"></div>
								<Link to="" onClick={this.logout} className="dropdown-item">
									<i className="ni ni-user-run"></i>
									<span>Logout</span>
								</Link>
							</div>
						</li>
					</ul>
					<div className="collapse navbar-collapse" id="sidenav-collapse-main">
						<div className="navbar-collapse-header d-md-none">
							<div className="row">
								<div className="col-6 collapse-brand">
									<a href="./index.html">
										<img src={process.env.PUBLIC_URL + "/assets/img/header-logo.png"}/>
									</a>
								</div>
								<div className="col-6 collapse-close">
									<button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
										<span></span>
										<span></span>
									</button>
								</div>
							</div>
						</div>
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink exact className="nav-link" activeClassName="active" to="/main">
									<i className="ni ni-tv-2 text-primary"></i> Dashboard
								</NavLink>
							</li>
						</ul>
						<hr className="my-3"/>
					</div>
				</div>
			</nav>
		);
	}
}

export default Sidemenu;