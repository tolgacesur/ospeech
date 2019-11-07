export default function OSpeech(config) {
	if (!(this instanceof OSpeech)){
		return new OSpeech();
	}

	this.appKey = "test";
	this.width = 400;
	this.defaultOpen = true;

	Object.assign(this, config);

	this.username = localStorage.getItem('ospeech-username');
	this.chatBox = null;
	this.toggleButton = null;

	this.init = function() {
		var container = document.createElement('div');
		container.style.height = '100%';
		container.style.position = "absolute";
		container.style.top = "0px";
		container.style.right = "0px";
		container.style.zIndex = 1000;
		document.body.appendChild(container);


		// Create chat box
		// TODO : this html source should come from server
		var src = `./src/chat-box/chat-box.html?appKey=${this.appKey}&username=${this.username}`;
		this.chatBox = document.createElement('div');
		this.chatBox.style.height = '100%';
		this.chatBox.style.position = "absolute";
		this.chatBox.style.top = "0px";
		this.chatBox.style.right = "0px";
		this.chatBox.style.zIndex = 1000;
		this.chatBox.innerHTML = `<iframe width=${this.width} height="100%" src="${src}" frameborder="0""></iframe>`;
		container.appendChild(this.chatBox);

		// Create toggle button
		this.toggleButton = document.createElement('button');
		this.toggleButton.style.cssText =`
			background-color: #75caeb;
			border: none;
			color: white;
			padding: 15px 32px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			border-radius: 5px 5px 0px 0px;
			outline: none;
			font-size: 16px;`
		this.toggleButton.style.position = "absolute";
		this.toggleButton.style.top = this.chatBox.offsetHeight / 2 + 'px';
		this.toggleButton.style.transform = 'rotate(-90deg)';
		this.toggleButton.innerHTML = "OSpeech";
		this.toggleButton.onclick = this.toggle.bind(this);
		container.appendChild(this.toggleButton);

		

		if (this.defaultOpen){
			this.show();
		} else {
			this.hide();
		}
	}

	this.toggle = function() {
		if (this.chatBox.style.display === "none") {
			this.show();
		} else {
			this.hide();
		}
	}

	this.hide = function() {
		this.chatBox.style.display = "none";
		this.toggleButton.style.right = - (this.toggleButton.scrollHeight / 2) -17 + 'px';
	}

	this.show = function() {
		this.chatBox.style.display = "block";
		this.toggleButton.style.right = this.width - (this.toggleButton.scrollHeight / 2) -18  + 'px';
	}
}