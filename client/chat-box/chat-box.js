var chatBox = ChatBox();
	chatBox.init();

function ChatBox() {
	if (!(this instanceof ChatBox)){
		return new ChatBox();
	}

	this.username = localStorage.getItem('ospeech-username');
	this.messages = [];

	this.init = function() {
		this.options = this.getOptions(); // appKey
		this.socket = this.createSocket();

		this.getOldMessages();
		this.addChatBoxListeners();

		this.setFormVisibiliy();
		this.updateNoMessageAlert();
	}

	this.createSocket = function() {
		var socket = io(process.env.API_URL, {
			reconnectionDelay: 250,
			reconnectionAttempts: 3,
			transports: [process.env === 'production' ? 'polling' : 'websocket']
		});

		socket.on('connect', this.joinRoom.bind(this));
		socket.on('message-received', this.messageReceived.bind(this));
		socket.on('reconnect_failed', function(){
			console.log("error occured");
			//TODO : Implement this
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

		if (this.username === data.username) {
			messageElement.className += 'right';
		} else {
			messageElement.className += 'left';
		}
		
		var allMessages = document.querySelector("#messages");
		allMessages.appendChild(messageElement);


		if (data.username === this.username) {
			// Scroll to bottom
			var messagesElem = document.getElementById("messages");
			messagesElem.scrollTop = messagesElem.scrollHeight;
		}
	}

	this.sendMessage = function(message) {
		this.socket.emit('send-message', {username: this.username, message, roomId: this.options.appKey});
	}

	this.getOldMessages = function () {
		var self = this;
		$.ajax(process.env.API_URL + '/message/lastmsg', {
			data : JSON.stringify({
				key: self.options.appKey
			}),
			type : 'POST',
			contentType : 'application/json',
		}).done(function(response){
			response.forEach(element => self.messageReceived(element));
		})
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
			// Reset input size
			if (!messageInputElement.value.length){
				messageInputElement.style.height = 0;
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

		saveNameButton.onclick = function() {
			if (!nameInputElement.value.length){
				return;
			}

			self.username = nameInputElement.value;
			localStorage.setItem('ospeech-username', self.username);

			nameInputElement.value = '';
			self.setFormVisibiliy();
		}

		nameInputElement.addEventListener("keyup", function(event) {
			if (!nameInputElement.value.length){
				return;
			}

			// Number 13 is the "Enter" key on the keyboard
			if (event.keyCode === 13) {
				self.username = nameInputElement.value;
				localStorage.setItem('ospeech-username', self.username);

				nameInputElement.value = '';
				self.setFormVisibiliy();
			}
		});


		var feedbackSuccessAlert = document.getElementById('feedback-success-alert');
		var feedbackDangerAlert = document.getElementById('feedback-danger-alert');
		feedbackSuccessAlert.style.display = 'none';
		feedbackDangerAlert.style.display = 'none';

		$('#feedback-popover').on('shown.bs.popover', function () {
			var feedbackEmailInput = document.querySelector('.popover-body #feedback-email-input');
			var sendFeedBackButton = document.querySelector('.popover-body #send-feedback-button');
			var feedbackMessageInput = document.querySelector('.popover-body #feedback-message-input');
			sendFeedBackButton.onclick = function() {
				var email = feedbackEmailInput.value;
				var message = feedbackMessageInput.value;

				if (!message){
					return;
				}

				$.ajax(process.env.API_URL + '/feedbacks/send', {
					data : JSON.stringify({
						email,
						message,
						room: self.options.appKey
					}),
					type : 'POST',
					contentType : 'application/json',
				}).done(function(){
					feedbackEmailInput.value = '';
					feedbackMessageInput.value = '';

					// Show success message
					var feedbackSuccessAlert = document.querySelector('.popover-body #feedback-success-alert');
					feedbackSuccessAlert.style.display = 'block';

					setTimeout(function(){
						feedbackSuccessAlert.style.display = 'none';
					}, 3000);

				}).fail(function(){

					// Show error message
					var feedbackDangerAlert = document.querySelector('.popover-body #feedback-danger-alert');
					feedbackDangerAlert.style.display = 'block';

					setTimeout(function(){
						feedbackDangerAlert.style.display = 'none';
					}, 3000);
				})
			}

			// Reset input size
			feedbackMessageInput.addEventListener('keyup', function(){
				if (!feedbackMessageInput.value.length){
					feedbackMessageInput.style.height = 0;
					return;
				}
			});

			// Auto grow
			feedbackMessageInput.addEventListener('input', function() {
				var scroll_height = feedbackMessageInput.scrollHeight;
				feedbackMessageInput.style.height = scroll_height + 'px';
			});
		})

		$('#user-popover').on('shown.bs.popover', function () {
			var userNameInput = document.querySelector('.popover-body #user-name-input');
			userNameInput.value = self.username;
			userNameInput.placeholder = 'Username';

			var saveUsernameButton = document.querySelector('.popover-body #save-name-button');
			saveUsernameButton.onclick = function() {
				var newUsername = userNameInput.value;
				self.username = newUsername;
				localStorage.setItem('ospeech-username', self.username);
			}
		});
	}

	this.setFormVisibiliy = function() {
		var nameContainer = document.getElementById('name-container');
		var messageInputContainer = document.getElementById('message-input-container');

		if (!this.username){
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

			data[params[x].split('=')[0]] = decodeURIComponent(value);
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

// Helpers
require('./chat-box.css');

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

	$('body').on('click', function (e) {
		$('[data-toggle=popover]').each(function () {
			// hide any open popovers when the anywhere else in the body is clicked
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});
})