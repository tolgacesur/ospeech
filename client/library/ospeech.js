export default function OSpeech(config) {
	if (!(this instanceof OSpeech)){
		return new OSpeech();
	}

	this.appKey = "";
	this.width = 400;
	this.defaultOpen = false;
	this.onload = null;

	// Private properties
	this.chatBox = null;
	this.toggleButton = null;
	this.mobileToggleButton = null;

	this.init = function() {
		// Config Validation
		config = this.validateConfig(config);

		// Apply Configuration
		Object.assign(this, config);

		var container = document.createElement('div');
		container.style.zIndex = 9999;
		document.body.appendChild(container);

		// Create chat box
		var src = `${process.env.CHATBOX_URL}?appKey=${this.appKey}`;
		this.chatBox = document.createElement('iframe');
		this.chatBox.setAttribute("src", src);
		this.chatBox.id = 'ospeech-chatbox';
		this.chatBox.style.height = '100%';
		this.chatBox.style.position = "fixed";
		this.chatBox.style.top = "0px";
		this.chatBox.style.right = "0px";
		this.chatBox.style.width = "0px";
		this.chatBox.width = this.width + 'px';
		this.chatBox.style.zIndex = 9999;
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
			background-color: #558597;
			border: none;
			padding: 15px 32px;
			text-align: center;
			text-decoration: none;
			display: flex;
			border-radius: 5px 5px 0px 0px;
			outline: none;
			cursor: pointer;
			justify-content: center;
			align-items: center;`
		this.toggleButton.style.position = "fixed";
		this.toggleButton.style.top = this.chatBox.offsetHeight / 2 + 'px';
		this.toggleButton.style.transform = 'rotate(-90deg)';
		this.toggleButton.style.transition = '.2s';
		this.toggleButton.style.webkitTransition = '.2s';
		this.toggleButton.style.mozTransition = '.2s';
		this.toggleButton.style.oTransition = '.2s';
		this.toggleButton.onclick = this.toggle.bind(this);

		var imgElement = document.createElement('img');
		imgElement.width = '90';
		imgElement.height = '25';
		imgElement.src = '../client/library/assets/img/logo.png';
		imgElement.style.marginRight = '5px';
		this.toggleButton.appendChild(imgElement);

		container.appendChild(this.toggleButton);


		// Create toggle button for mobile
		this.mobileToggleButton = document.createElement('button');
		this.mobileToggleButton.innerHTML = "<img height=25 src='../client/library/assets/img/logout.png'>";
		this.mobileToggleButton.style.cssText =`
			border: none;
			background: none;
			color: white;
			text-align: center;
			text-decoration: none;
			cursor: pointer;
			top: 10px;
			z-index: 9999;
			font-size: 16px;`
		this.mobileToggleButton.style.position = 'fixed';
		this.mobileToggleButton.style.transition = '.2s';
		this.mobileToggleButton.style.webkitTransition = '.2s';
		this.mobileToggleButton.style.mozTransition = '.2s';
		this.mobileToggleButton.style.oTransition = '.2s';
		this.mobileToggleButton.onclick = this.hide.bind(this);
		container.appendChild(this.mobileToggleButton);

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
		this.mobileToggleButton.style.right = - this.width + 'px';
	}

	this.show = function() {
		this.chatBox.style.width = this.width + 'px';
		this.toggleButton.style.right = this.width - (this.toggleButton.scrollHeight / 2) -25  + 'px';

		var deviceWith = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		if (this.width >= deviceWith){
			this.mobileToggleButton.style.right = this.width - 45 + 'px';
		}
	}

	this.validateConfig = function(config) {
		if (config){
			if (typeof(config.width) !== 'number'){
				if (typeof(config.width) !== 'undefined'){
					console.warn("Opseech invalid width value: ", config.width);
				}

				config.width = this.width;
			}

			// Width of widget should be lesser than device width
			var deviceWith = (window.innerWidth > 0) ? window.innerWidth : screen.width;
			if (config.width > deviceWith * 0.8){
				config.width = deviceWith;
			}
		
			if (typeof(config.defaultOpen) !== 'boolean'){
				if (typeof(config.defaultOpen) !== 'undefined'){
					console.warn("Opseech invalid defaultOpen value: ", config.defaultOpen);
				}

				config.defaultOpen = this.defaultOpen;
			}
	
			if (typeof(config.onload) !== 'function'){
				if (typeof(config.onload) !== 'undefined'){
					console.warn("Opseech invalid onload function: ", config.onload);
				}

				config.onload = this.onload;
			}
		}

		return config;
	}
}