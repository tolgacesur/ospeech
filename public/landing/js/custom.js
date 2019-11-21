var ospeech = new OSpeech({
	appKey:"Kejz0BdK",
	defaultOpen: false
});

ospeech.init();

var chatIsOpen = false;
function toggleChat(){
	if (chatIsOpen){
		ospeech.hide();
	} else {
		ospeech.show();
	}

	chatIsOpen = !chatIsOpen;
}

var successAlertElement = document.getElementById('alert-success');
successAlertElement.style.display = 'none';

function sendMessage(){
	var emailFieldElement = document.querySelector('#email-field');
	var messageFieldElement = document.querySelector('#message-field');
	var email = emailFieldElement.value;
	var message = messageFieldElement.value;

	if (!email || !message){
		return;
	}

	$.ajax('/feedbacks/send', {
		data : JSON.stringify({
			email,
			message,
			room: "Kejz0BdK"
		}),
		type : 'POST',
		contentType : 'application/json',
	}).done(function(){
		emailFieldElement.value = '';
		messageFieldElement.value = '';
		successAlertElement.style.display = 'block';
	});
}

function getStarted(){
	var url = '/register';

	var email = document.querySelector('#get-started-email').value;
	if (email){
		url += '?email=' + email;
	}

	window.location = url;
}