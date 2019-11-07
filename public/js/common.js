//basic system checking

if(!localStorage)
	alert("Please update to a modern browser. Some features might not work on your browser");

//checking for prior login and changing flow accordingly

var token = localStorage.getItem('token');

if(token) {
    $('#account').text('Account').click(function() {
        window.location = "account";
    });
}
else {
    $('#account').click(function() {
        window.location = "sign";
    });
}