export default function OSpeech(config) {
	if (!(this instanceof OSpeech)){
		return new OSpeech();
	}

	this.appKey = "test";
	this.width = 400;

	Object.assign(this, config);

	this.username = localStorage.getItem('ospeech-username');
	this.chatBox = null;
	this.toggleButton = null;

	this.init = function() {
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
		document.body.appendChild(this.chatBox);
		
		// Create toggle button
		this.toggleButton = document.createElement('button');
		this.toggleButton.style.position = "absolute";
		this.toggleButton.style.top = this.chatBox.offsetHeight / 2 + 'px';
		this.toggleButton.style.transform = 'rotate(-90deg)';
		this.toggleButton.innerHTML = "button";
		this.toggleButton.onclick = this.toggle.bind(this);
		document.body.appendChild(this.toggleButton);

		this.show();
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
		this.toggleButton.style.right = -16 + 'px';
	}

	this.show = function() {
		this.chatBox.style.display = "block";
		this.toggleButton.style.right = this.width - 16 + 'px';
	}
}