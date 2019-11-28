import React from 'react';

import './room.scss';
import ApiService from '../../service/api';
import Helper from '../../libs/helper';

class Chatroom extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			messages : []
		};

		this.clearHistory = this.clearHistory.bind(this);
	}

	componentWillMount() {
		ApiService.getAllMessages().then(messages => {
			this.setState({messages});
		});
	}

	clearHistory() {
		ApiService.deleteAllMessages().then(messages => {
			this.setState({
				messages: []
			});
		});
	}

	render() {

		let alert = <div className="mt-4"></div>;
		if (!this.state.messages.length){
			alert = <div className="my-8 text-center"><p>Message history is empty!</p></div>
		}

		return (
			<div className="card shadow">
				<div className="card-header bg-transparent">
					<div className="row align-items-center">
						<div className="col">
						<h6 className="text-uppercase text-muted ls-1 mb-1">Chat Room</h6>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="d-flex justify-content-end mb-2">
						<button className="btn btn-sm btn-secondary" onClick={this.clearHistory}>Clear Chat History</button>
					</div>
					<div className="d-flex messages-container justify-content-center">
						<div className="col-md-3 col-sm-12 messages">
							{this.state.messages.map(message => {
								return (
									<div className="message-container" key={message._id}>
										<div className="d-flex">
											<div className="flex-grow-1">
												<strong>{message.username}</strong>
											</div>
											<div>{`${Helper.formatDate(message.createdAt)}`}</div>
										</div>
										<div className="mt-2">
											<p className="mb-0">{message.message}</p>
										</div>
									</div>
								)
							})}
							{alert}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Chatroom;