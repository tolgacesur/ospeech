import React from 'react';

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<div className="row align-items-center justify-content-xl-between">
					<div className="col-xl-6">
						<div className="copyright text-center text-xl-left text-muted">
							&copy; 2019 <a href="#" className="font-weight-bold ml-1" target="_blank">Ospeech</a>
						</div>
					</div>
					<div className="col-xl-6">
						<ul className="nav nav-footer justify-content-center justify-content-xl-end">
							<li className="nav-item">
								<a href="#" className="nav-link" target="_blank">Ospeech</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;