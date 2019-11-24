import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<div className="row align-items-center justify-content-xl-between">
					<div className="col-xl-6">
						<div className="copyright text-center text-xl-left text-muted">
							&copy; 2019 <Link className="font-weight-bold ml-1" to="/main">Ospeech</Link>
						</div>
					</div>
					<div className="col-xl-6">
						<ul className="nav nav-footer justify-content-center justify-content-xl-end">
							<li className="nav-item">
								<Link className="nav-link" to="/main">Ospeech</Link>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;