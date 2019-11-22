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

var errorAllFields = document.getElementById('alert-error-fill-all');
errorAllFields.style.display = 'none';

var errorEmail = document.getElementById('alert-error-invalid-email');
errorEmail.style.display = 'none';

var errorElement = document.getElementById('alert-error-occured');
errorElement.style.display = 'none';

function sendMessage(){
	successAlertElement.style.display = 'none';
	errorElement.style.display = 'none';

	var emailFieldElement = document.querySelector('#email-field');
	var messageFieldElement = document.querySelector('#message-field');
	var email = emailFieldElement.value;
	var message = messageFieldElement.value;

	if (!email || !message){
		errorAllFields.style.display = 'block';
		return;
	}

	errorAllFields.style.display = 'none';

	if (!isEmailAddress(email)){
		errorEmail.style.display = 'block';
		return;
	}

	errorEmail.style.display = 'none';

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
	}).fail(function(){
		errorElement.style.display = 'block';
	})
}

function getStarted(){
	var url = '/register';

	var email = document.querySelector('#get-started-email').value;
	if (email){
		url += '?email=' + email;
	}

	window.location = url;
}

function isEmailAddress(str) {
	const pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return pattern.test(str);
}