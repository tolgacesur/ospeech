import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import ApiService from '../../service/api';

class Topnavbar extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			redirectReferrer : false
		}

		this.logout = this.logout.bind(this);
	}

	logout(){
		ApiService.logout().then(() => {
			this.setState({
				redirectReferrer: true
			})
		})
	}

	render() {
		if (this.state.redirectReferrer){
			return <Redirect to="/login" />
		}

		return (
			<nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
				<div className="container-fluid justify-content-end">
					<ul className="navbar-nav align-items-center d-none d-md-flex">
						<li className="nav-item dropdown">
							<a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
								<Link className="dropdown-item" to="/profile">
									<i className="ni ni-single-02"></i>
									<span>My profile</span>
								</Link>
								<div className="dropdown-divider"></div>
								<span onClick={this.logout} className="dropdown-item">
									<i className="ni ni-user-run"></i>
									<span>Logout</span>
								</span>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Topnavbar;