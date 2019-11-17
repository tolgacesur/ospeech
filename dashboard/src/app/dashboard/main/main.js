import React from 'react';
import Highlight from 'react-highlight.js'

import Cache from '../../service/cache';
import './main.scss';

class Main extends React.Component {
	constructor(props) {
		super(props)

		let room = Cache.room;

		this.state = {
			copied : false,
			snippet: 
`
    <script src="${window.location.origin}/client/library/ospeech.min.js"></script>
    <script>
        var config = {
            appKey:"${room.token}"
        }

        var ospeech = new OSpeech(config);
        ospeech.init();
    </script>

`,
			api:
`
    var config = {
        appKey:"${room.token}", //required
        width: 400,            // optional - default 400
        defaultOpen: false     // optional - default false

        // optional
        onload : function() {
            console.log("Chat Ready!");
        }
    };

`,
			show: 
`
    ospeech.show();

`,
			hide:
`
    ospeech.hide();

`
		}

		this.copyToClipboard = this.copyToClipboard.bind(this);
	}

	copyToClipboard() {
		const el = document.createElement('textarea');
		el.value = this.state.snippet;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);

		this.setState({
			copied: true
		});

		setTimeout(() => {
			this.setState({
				copied: false
			})
		}, 2000);
	};

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
					<h1>Get Started</h1>
					<h3>Learn how to install our beautiful widget and keep your users engaged.</h3>
					<p>To install our beautiful widget on your website, the first step is to insert our javascript code to your website and you need to instantiate and call the init method, as in the example below:</p>
					<div className="d-flex justify-content-end">
						{ !this.state.copied ? <button className="btn btn-sm btn-secondary mb-2" onClick={this.copyToClipboard} >Copy</button> : null }
						{ this.state.copied ?
							<button className="btn btn-sm btn-secondary mb-2">
								<i className="far fa-check-circle mr-1 text-green"></i>
								Copied
							</button>
						: null
						}
					</div>
					<div className="card mb-2">
						<Highlight language="html">
							{this.state.snippet}
						</Highlight>
					</div>
					<p>This will create a new chat instance.</p>
					<h3>Ospeech widget API:</h3>
					<div className="card mb-2">
						<Highlight language="js">
							{this.state.api}
						</Highlight>
					</div>
					<h3 className="my-4">Show widget</h3>
					<div className="card mb-2">
						<Highlight language="js">
							{this.state.show}
						</Highlight>
					</div>
					<h3 className="my-4">Hide widget</h3>
					<div className="card mb-2">
						<Highlight language="js">
							{this.state.hide}
						</Highlight>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;