import React from 'react';
import Highlight from 'react-highlight.js'

import './main.scss';
import ApiService from '../../service/api';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snippet: `
				<script src="http://127.0.0.1:3000/client/library/ospeech.min.js"></script>
				<script>
					var ospeech = new OSpeech({
						appKey:"abc123"
					});

					ospeech.init();
				</script>
			`
		}
	}

	componentDidMount(){
		ApiService.getRooms().then(room => {
			console.log(room);
		});
	}

	render() {
		return (
			<div className="card shadow">
				<div className="card-header bg-transparent">
					<div className="row align-items-center">
						<div className="col">
						<h6 className="text-uppercase text-muted ls-1 mb-1">How to use</h6>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="card">
						<Highlight language="html">
							{this.state.snippet}
						</Highlight>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;