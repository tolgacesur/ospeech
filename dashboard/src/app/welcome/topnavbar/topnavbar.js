import React from 'react';
import { Link } from 'react-router-dom';

class Topnavbar extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-top navbar-horizontal navbar-expand-md navbar-light">
				<div className="container px-4">
					<a className="navbar-brand" href="/">
						<img alt="Logo" src={process.env.PUBLIC_URL + "/assets/img/header-logo-white.png"} />
					</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbar-collapse-main">
					<div className="navbar-collapse-header d-md-none">
						<div className="row">
						<div className="col-6 collapse-brand">
							<img src={process.env.PUBLIC_URL + "/assets/img/header-logo.png"}/>
						</div>
						<div className="col-6 collapse-close">
							<button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
								<span></span>
								<span></span>
							</button>
						</div>
						</div>
					</div>
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to="/register" className="nav-link nav-link-icon">
								<i className="ni ni-circle-08"></i>
								<span className="nav-link-inner--text">Register</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/login" className="nav-link nav-link-icon">
								<i className="ni ni-key-25"></i>
								<span className="nav-link-inner--text">Login</span>
							</Link>
						</li>
					</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Topnavbar;