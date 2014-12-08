var socket = io.connect();

// Helper functions
// Add message to the screen with users pseudo
function addMessage(msg, pseudo) {
	$("#chatEntries").append('<div class="message"><p>' +
		// html_sanitize(pseudo) + ' : ' +
		// html_sanitize(msg) + '</p></div>';
	pseudo + ' : ' +
	msg + '</p></div>');
}

// Send message
function sentMessage() {
	if ($('#messageInput').val() !== "")
	{
		var esc_msg = html_sanitize($('#messageInput').val());
		socket.emit('message', esc_msg);
		addMessage(esc_msg, "Me", new Date().toISOString(), true);
		$('#messageInput').val('');
	}
}

function setPseudo() {
	if ($("#pseudoInput").val() !== "")
	{
		socket.emit('setPseudo', $("#pseudoInput").val());
		$('#chatControls').show();
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
	}
}

function displayUsername(username) {
	$("#currentUsername").append('<p>Current username: ' + username + '</p>');
}

socket.on('message', function(data) {
	addMessage(data.message, data.pseudo);
	displayUsername(data.pseudo);
});

$(function() {
	$("#chatControls").hide();
	$("#pseudoSet").click(function () {setPseudo();});
	$("#submit").click(function() {sentMessage();});
});

