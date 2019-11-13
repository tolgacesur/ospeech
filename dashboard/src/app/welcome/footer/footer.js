import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
	render() {
		return (
			<footer className="py-5">
				<div className="container">
					<div className="row align-items-center justify-content-xl-between">
						<div className="col-xl-6">
						<div className="copyright text-center text-xl-left text-muted">
							© 2019
						</div>
						</div>
						<div className="col-xl-6">
						<ul className="nav nav-footer justify-content-center justify-content-xl-end">
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Ospeech
								</Link>
							</li>
						</ul>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;