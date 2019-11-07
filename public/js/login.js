var socket = io();

if(token) {
    $('#message').text('You are already logged in. Redirecting you to the home page.');
	setTimeout(function(){
		window.location = "index";
	}, 2500);
}

//SIGN IN =>

$('#signIn').on('submit', function(e) {
	e.preventDefault();
	$('#signInButton').val('Authenticating...').prop('disabled',true);

	var email = $('#email').val();
	var password = $('#password').val();

	socket.emit('login', {
		email:email,
		password:password
	}, function() {
        console.log("Authentication failed");
        
		$('#message').text('Authentication failed. Make sure you are entering the correct credentials.');		
		$('#signInButton').val('Try again').prop('disabled',false);
	});
});

//If authentication is successful and server returns token =>

socket.on('token', function(tokenFromServer) {
	token=tokenFromServer;
	localStorage.setItem('token',token);
	$('#message').text('Welcome back. Redirecting you to the homepage.');
	$('#signInButton').val('Welcome.').prop('disabled',true);
	setTimeout(function(){
		window.location = "index";
	}, 2500);
});