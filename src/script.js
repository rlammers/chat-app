var socket = io.connect();

// Helper functions
// Add message to the screen with users pseudo
function addMessage(msg, pseudo) {
	$("#chatEntries").append('<div class="message"><p>' +
	pseudo + ' : ' +
	msg + '</p></div>');
}

// Send message
function sentMessage() {
	if ($('#messageInput').val() !== "")
	{
		var msg = $('#messageInput').val();
		socket.emit('message', msg);
		addMessage(msg, "Me", new Date().toISOString(), true);
		$('#messageInput').val('');
	}
}

function setPseudo() {
	var username = $("#pseudoInput").val();
	if (username !== "")
	{
		socket.emit('setPseudo', username);
		$('#chatControls').show();
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
		displayUsername(username);
	}
}

function displayUsername(username) {
	$("#currentUsername").empty();
	$("#currentUsername").append('<p>My username: ' + username + '</p>');
}

socket.on('message', function(data) {
	addMessage(data.message, data.pseudo);
});

$(function() {
	$("#chatControls").hide();
	$("#pseudoSet").click(function () {setPseudo();});
	$("#submit").click(function() {sentMessage();});
});

