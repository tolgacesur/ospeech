var mainUrl = 'http://127.0.0.1:3000';
var chatBox = ChatBox();
	chatBox.init();

// TODO : Fix autogrow

function ChatBox() {
	if (!(this instanceof ChatBox)){
		return new ChatBox();
	}

	this.messages = [];

	this.init = function() {
		this.options = this.getOptions(); // appKey, username
		this.socket = this.createSocket();

		this.addChatBoxListeners();

		this.setFormVisibiliy();
		this.updateNoMessageAlert();
	}

	this.createSocket = function() {
		var socket = io(mainUrl, {
			reconnectionDelay: 500
		});

		socket.on('connect', this.joinRoom.bind(this));
		socket.on('message-received', this.messageReceived.bind(this));
		socket.on('connect_error', function(){
			console.log("error occured");
			// Implement this
		});
		socket.on('connect_timeout', function(){
			console.log("timeout");
			// TODO : show error
		});

		return socket;
	}

	this.joinRoom = function() {
		this.socket.emit('join-room', this.options.appKey);
	}

	this.messageReceived = function(data) {
		this.messages.push(data);
		this.updateNoMessageAlert();

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


		if (data.username === this.options.username) {
			// Scroll to bottom
			var messagesElem = document.getElementById("messages");
			messagesElem.scrollTop = messagesElem.scrollHeight;
		}
	}

	this.sendMessage = function(message) {
		this.socket.emit('send-message', {username: this.options.username, message, roomId: this.options.appKey});
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

		// Auto grow
		messageInputElement.addEventListener('input', function() {
			var scroll_height = messageInputElement.scrollHeight;
			messageInputElement.style.height = scroll_height + 'px';
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

		$('#feedback-popover').on('shown.bs.popover', function () {
			var feedbackEmailInput = document.querySelector('.popover-body #feedback-email-input');
			var sendFeedBackButton = document.querySelector('.popover-body #send-feedback-button');
			var feedbackMessageInput = document.querySelector('.popover-body #feedback-message-input');
			sendFeedBackButton.onclick = function() {
				var email = feedbackEmailInput.value;
				console.log("Feedback", {username: self.options.username, email, room: self.options.appKey});
				feedbackEmailInput.value = '';
				feedbackMessageInput = '';

				// TODO: Add Http request here and close popover. Maybe we can add a thanks message
			}

			// Auto grow
			feedbackMessageInput.addEventListener('input', function() {
				var scroll_height = feedbackMessageInput.scrollHeight;
				feedbackMessageInput.style.height = scroll_height + 'px';
			});
		})

		$('#user-popover').on('shown.bs.popover', function () {
			var userNameInput = document.querySelector('.popover-body #user-name-input');
			userNameInput.value = self.options.username;
			userNameInput.placeholder = 'Username';

			var saveUsernameButton = document.querySelector('.popover-body #save-name-button');
			saveUsernameButton.onclick = function() {
				var newUsername = userNameInput.value;
				self.options.username = newUsername;
				localStorage.setItem('ospeech-username', self.options.username);

				// TODO: Close popover and sperate this function and use above too.
			}
		});
	}

	this.setFormVisibiliy = function() {
		var nameContainer = document.getElementById('name-container');
		var messageInputContainer = document.getElementById('message-input-container');

		if (!this.options.username){
			nameContainer.style.display = 'block';
			messageInputContainer.style.display = 'none';
			nameContainer.focus();
		} else {
			nameContainer.style.display = 'none';
			messageInputContainer.style.display = 'block';
			messageInputContainer.focus();
		}
	}

	this.updateNoMessageAlert = function() {
		var alert =  document.getElementById('no-message');

		if (this.messages.length){
			alert.style.display = 'none';
		}
	}

	this.getOptions = function(){
		var params = location.href.split('?')[1] ? location.href.split('?')[1].split('&') : null;
		var data = {};

		if (!params){
			return data;
		}

		for (var x in params) {
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

		return moment(date).format('MMMM DD, HH:mm');
	}
}

require('./chat-box.css')

$(document).ready(function(){
	$('[data-toggle="popover"]').popover({
		container: 'body',
		trigger: 'click',
		placement: 'bottom',
		html: true,
		sanitize: false,
		content: function() {
			var content = $(this).attr("popover-content");
			return $(content).html();
		}
	});
})