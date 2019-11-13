import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import ApiService from '../../service/api';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email : '',
			password : '',
			redirectReferrer: this.props.isAuthed,
			errors: {
				password: false,
				email: false,
				message: ''
			}
		};

		this.login = this.login.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.isEmailAddress = this.isEmailAddress.bind(this);
	}

	login() {
		let emailInvalid = !this.isEmailAddress(this.state.email);
		let passwordInvalid = this.state.password.length < 8;
		this.setState({
			errors : {
				email: emailInvalid,
				password: passwordInvalid
			}
		});


		if (emailInvalid || passwordInvalid){
			return;
		}

		ApiService.login({
			email: this.state.email,
			password: this.state.password
		}).then(() => {
			this.setState({
				redirectReferrer: true
			});
		}).catch(err => {
			err = err.response.data;
			// TODO : We can use error codes
			this.setState({
				errors : {
					message : err.message || 'Oops Something Went Wrong!'
				}
			});
		});
	}

	onEmailChange(event) {
		this.setState({
			email: event.target.value
		});
	}

	onPasswordChange(event) {
		this.setState({
			password: event.target.value
		});
	}

	isEmailAddress(str) {
		const pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return pattern.test(str);
	}

	render() {
		if (this.state.redirectReferrer){
			return <Redirect to="/dashboard"/>
		}

		return (
			<div className="container mt--8 pb-5">
				<div className="row justify-content-center">
					<div className="col-lg-5 col-md-7">
						<div className="card bg-secondary shadow">
							<div className="card-body px-lg-5 py-lg-5">
								<form role="form">
									<div className="form-group mb-3">
										<div className="input-group input-group-alternative">
											<div className="input-group-prepend">
												<span className="input-group-text"><i className="ni ni-email-83"></i></span>
											</div>
											<input className="form-control" value={this.state.email} onChange={this.onEmailChange} placeholder="Email" type="email" />
										</div>
									</div>
									<div className="form-group">
										<div className="input-group input-group-alternative">
											<div className="input-group-prepend">
												<span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
											</div>
											<input className="form-control" value={this.state.password} onChange={this.onPasswordChange} placeholder="Password" type="password" />
										</div>
									</div>
									{this.state.errors.email ? <div className="alert alert-danger fade show">
										<span className="alert-inner--text">Email is invalid</span>
									</div> : null}
									{this.state.errors.password ? <div className="alert alert-danger fade show">
										<span className="alert-inner--text">Password should be at least 8 characters</span>
									</div> : null}
									{this.state.errors.message ? <div className="alert alert-danger fade show">
										<span className="alert-inner--text">{this.state.errors.message}</span>
									</div> : null}
									<div className="text-center">
										<button type="button" onClick={this.login} className="btn btn-primary my-4">Sign in</button>
									</div>
								</form>
							</div>
						</div>
						<div className="row mt-3">
							<div className="col-6">
								<Link className="text-light" to="/register">
									<small>Create new account</small>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;