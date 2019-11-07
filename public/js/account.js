var socket = io();
socket.emit('checkToken', {token:token});
var usds;
socket.on('tokenVerified', function(user) {
    usds = user;

    $('#name').text(user.name);
    $('#email').text(user.email);
    $('#phone').text(user.phone);

    for (var i  = 0; i < user.stocks.length; ++i) {
        var stock = user.stocks[i];
        console.log(stock);

        var requestHTML = `
            <div class="request">
                <div class="table">
                    <p class="paramter">Stock: </p>
                    <p class="content">${stock.name}</p>
                </div>

                <div class="table">
                    <p class="paramter">Quantity: </p>
                    <p class="content">${stock.quantity}</p>
                </div>
            </div>
        `;

        $('#previousRequests').append(requestHTML);
    }
});