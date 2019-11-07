var mainUrl = 'http://192.168.2.217:3000';

function ChatBox() {
	if (!(this instanceof ChatBox)){
		return new ChatBox();
	}

	this.init = function() {
		this.options = this.getOptions(); // appKey, username
		this.socket = this.createSocket();
		this.addChatBoxListeners();
		this.setFormVisibiliy();
	}

	this.createSocket = function() {
		var self = this;

		var socket = io(mainUrl);
		socket.on('connect', function(){
			socket.emit('room', self.options.appKey);
		});

		socket.on('ospeech', function(data){
			self.messageReceived(data);
		});

		return socket;
	}

	this.messageReceived = function(data) {
		console.log("message received : ", data);
		var messageElement = document.createElement('div');
		messageElement.innerHTML =
		`<div class="message-container">
			<div class="d-flex">
				<strong class="flex-grow-1">${data.username}</strong>
				<small>${this.formatDate(new Date())}</small>
			</div>
			<p class="mb-1">${data.message}</p>
		</div>`;

		if (this.options.username === data.username) {
			messageElement.className += 'right';
		} else {
			messageElement.className += 'left';
		}
		
		var allMessages = document.querySelector("#messages");
		allMessages.appendChild(messageElement);
	}

	this.sendMessage = function(message) {
		this.socket.emit('ospeech', {username: this.options.username, message});
	}

	this.addChatBoxListeners = function() {
		var sendButton = document.querySelector("#send-button");
		var messageInputElement = document.querySelector("#message-input");

		var self = this;
		sendButton.onclick = function() {
			if (!messageInputElement.value.length){
				return;
			}

			self.sendMessage(messageInputElement.value);
			messageInputElement.value = '';
			messageInputElement.focus();
		}

		messageInputElement.addEventListener("keyup", function(event) {
			if (!messageInputElement.value.length){
				return;
			}

			// Number 13 is the "Enter" key on the keyboard
			if (event.keyCode === 13) {
				self.sendMessage(messageInputElement.value);
				messageInputElement.value = '';
				messageInputElement.focus();
			}
		});


		var saveNameButton = document.querySelector("#save-name-button");
		var nameInputElement = document.querySelector("#name-input");

		self = this;
		saveNameButton.onclick = function() {
			if (!nameInputElement.value.length){
				return;
			}

			self.options.username = nameInputElement.value;
			localStorage.setItem('ospeech-username', self.options.username);

			nameInputElement.value = '';
			self.setFormVisibiliy();
		}

		nameInputElement.addEventListener("keyup", function(event) {
			if (!nameInputElement.value.length){
				return;
			}

			// Number 13 is the "Enter" key on the keyboard
			if (event.keyCode === 13) {
				self.options.username = nameInputElement.value;
				localStorage.setItem('ospeech-username', self.options.username);

				nameInputElement.value = '';
				self.setFormVisibiliy();
			}
		});
	}

	this.setFormVisibiliy = function() {
		var nameContainer = document.getElementById('name-container');
		var messageInputContainer = document.getElementById('message-input-container');

		if (!this.options.username){
			nameContainer.style.display = 'block';
			messageInputContainer.style.display = 'none';
		} else {
			nameContainer.style.display = 'none';
			messageInputContainer.style.display = 'block';
		}
	}

	this.getOptions = function(){
		var params = location.href.split('?')[1].split('&');
		var data = {};
		for (x in params) {
			var value = params[x].split('=')[1];

			value = value === 'null' ? null : value;
			value = value === 'undefined' ? undefined : value;

			data[params[x].split('=')[0]] = value;
		}

		return data;
	}

	this.formatDate = function(date) {
		var isToday = moment(date).isSame(moment(), 'day');
		if (isToday) {
			return moment(date).format('HH:mm');
		}
	}
}