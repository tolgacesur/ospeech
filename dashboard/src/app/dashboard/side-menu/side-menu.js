import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Sidemenu extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
				<div className="container-fluid">
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<Link className="navbar-brand pt-0" to="/">
						<img src="./assets/img/blue.png" className="navbar-brand-img" alt="..."/>
					</Link>
					<ul className="nav align-items-center d-md-none">
						<li className="nav-item dropdown">
							<a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<div className="media align-items-center">
									<span className="avatar avatar-sm rounded-circle">
										<img alt="Image placeholder" src="./assets/img/user.png"/>
									</span>
								</div>
							</a>
							<div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
								<div className=" dropdown-header noti-title">
									<h6 className="text-overflow m-0">Welcome!</h6>
								</div>
								<Link to="/profile" className="dropdown-item">
									<i className="ni ni-single-02"></i>
									<span>My profile</span>
								</Link>
								<div className="dropdown-divider"></div>
								<a href="#" className="dropdown-item">
									<i className="ni ni-user-run"></i>
									<span>Logout</span>
								</a>
							</div>
						</li>
					</ul>
					<div className="collapse navbar-collapse" id="sidenav-collapse-main">
						<div className="navbar-collapse-header d-md-none">
							<div className="row">
								<div className="col-6 collapse-brand">
									<a href="./index.html">
										<img src="./assets/img/blue.png"/>
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
								<NavLink exact className="nav-link" activeClassName="active" to="/">
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