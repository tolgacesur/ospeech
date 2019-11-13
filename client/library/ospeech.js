export default function OSpeech(config) {
	if (!(this instanceof OSpeech)){
		return new OSpeech();
	}

	this.appKey = "test";
	this.width = 400;
	this.defaultOpen = true;
	this.onload = null;

	// Private properties
	this.username = localStorage.getItem('ospeech-username');
	this.chatBox = null;
	this.toggleButton = null;

	this.init = function() {
		// Config Validation
		config = this.validateConfig(config);

		// Apply Configuration
		Object.assign(this, config);

		var container = document.createElement('div');
		container.style.height = '100%';
		container.style.position = "absolute";
		container.style.top = "0px";
		container.style.right = "0px";
		container.style.zIndex = 1000;
		document.body.appendChild(container);

		// Create chat box
		// TODO : this html source should come from server
		var src = `../client/chat-box/chat-box.html?appKey=${this.appKey}&username=${this.username}`;
		this.chatBox = document.createElement('iframe');
		this.chatBox.setAttribute("src", src);
		this.chatBox.style.height = '100%';
		this.chatBox.style.position = "fixed";
		this.chatBox.style.top = "0px";
		this.chatBox.style.right = "0px";
		this.chatBox.style.zIndex = 1000;
		this.chatBox.frameBorder = "0";
		this.chatBox.style.transition = '.2s';
		this.chatBox.style.webkitTransition = '.2s';
		this.chatBox.style.mozTransition = '.2s';
		this.chatBox.style.oTransition = '.2s';

		var self = this;
		this.chatBox.onload = function() {
			if (self.onload && typeof(self.onload) === 'function'){
				self.onload();
			}

			// TODO : Add spinner or animation here
		}
		container.appendChild(this.chatBox);

		// Create toggle button
		this.toggleButton = document.createElement('button');
		this.toggleButton.style.cssText =`
			background-color: #080e7c;
			border: none;
			color: white;
			padding: 15px 32px;
			text-align: center;
			text-decoration: none;
			display: flex;
			border-radius: 5px 5px 0px 0px;
			outline: none;
			cursor: pointer;
			align-items: center;
			font-size: 16px;`
		this.toggleButton.style.position = "fixed";
		this.toggleButton.style.top = this.chatBox.offsetHeight / 2 + 'px';
		this.toggleButton.style.transform = 'rotate(-90deg)';
		this.toggleButton.style.transition = '.2s';
		this.toggleButton.style.webkitTransition = '.2s';
		this.toggleButton.style.mozTransition = '.2s';
		this.toggleButton.style.oTransition = '.2s';
		this.toggleButton.innerHTML = "<img width=25 height=25 src='../client/library/assets/svg/planet-earth.svg' style='margin-right:5px;'><span>OSpeech</span>";
		this.toggleButton.onclick = this.toggle.bind(this);
		container.appendChild(this.toggleButton);

		if (this.defaultOpen){
			this.show();
		} else {
			this.hide();
		}
	}

	this.toggle = function() {
		if (this.chatBox.style.width === '0px') {
			this.show();
		} else {
			this.hide();
		}
	}

	this.hide = function() {
		this.chatBox.style.width = '0px';
		this.toggleButton.style.right = - (this.toggleButton.scrollHeight / 2) -29 + 'px';
	}

	this.show = function() {
		this.chatBox.style.width = '400px';
		this.toggleButton.style.right = this.width - (this.toggleButton.scrollHeight / 2) -25  + 'px';
	}

	// TODO : In future print console warnings
	this.validateConfig = function(config) {
		if (config){
			if (typeof(config.width) !== 'number'){
				config.width = this.width;
			} else {
				// Width of widget should be lesser than device width
				var deviceWith = (window.innerWidth > 0) ? window.innerWidth : screen.width;
				if (config.width > deviceWith){
					config.width = deviceWith;
				}
			}
		
			if (typeof(config.defaultOpen) !== 'boolean'){
				config.defaultOpen = this.defaultOpen;
			}
	
			if (typeof(config.onload) !== 'function'){
				config.onload = this.onload;
			}
		}

		return config;
	}
}