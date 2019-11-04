require('./config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './public');

var {mongoose} = require('./db/mongoose');
const {validateEmail, validateName, validatePassword} = require('./utils/validation');
const {authenticate} = require('./utils/authenticate');
const {User} = require('./models/user');
const {Stock} = require('./models/stock');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath, { //removing .html file endings
    extensions: ['html'],
}));

io.on('connection', (socket) => {
    console.log("new user connected");

    socket.on('login', (params, callback) => {
        console.log("login request receieved by server");

        User.findByCredentials(params.email, params.password).then((user) => {
            console.log("login function entered");
            return user.generateAuthToken();
        }).then((token) => {
            console.log("token generated . in next function now");
            return socket.emit('token', token);
        }).catch((err) => {
            console.log("error encountered");
           callback();
            console.log("error", err);
        });
    });

    socket.on('register', (params, callback) => {
        var user = new User({
            email: params.email,
            password: params.password,
            name: params.name,
            phone: params.phone,
            stocks: params.stocks
        });

        user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            console.log("user saved");
            socket.emit('registered', token);
        }).catch((err) => {
           callback(false);
            console.log("User saving failed", err);
        });
    });

    socket.on('checkToken', (params) => {
        authenticate(params.token).then((user) => {
                socket.emit('tokenVerified', user);
           }).catch((e) => {
                console.log("Authentication failed");
            });
        });

    socket.on('getInfluencerStock', (params) => {
        Stock.findByInfluencerId(params.influencerId).then((stock) => {
            if (stock) {
                console.log("About to emit: ", stock);
                socket.emit('influencerStock', {stock, influencerId: params.influencerId});
            }
        }).catch((err) => {
            console.log("influencer stock method problem");
        })
    });

    socket.on('getTransactionsBySeller', (params) => {
        Transaction.findTransactionsBySeller(params.seller).then((transactions) => {
            if (transactions) {
                console.log("About to emit: ", transactions);
                socket.emit('transactionsBySeller', {transactions, seller: params.seller});
            }
        }).catch((err) => {
            console.log("no transactions found or err", err);
        })
    });

    socket.on('getTransactionsByBuyer', (params) => {
        Transaction.findTransactionsBySeller(params.buyer).then((transactions) => {
            if (transactions) {
                console.log("About to emit: ", transactions);
                socket.emit('transactionsByBuyer', {transactions, buyer: params.buyer});
            }
        }).catch((err) => {
            console.log("no transactions found or err", err);
        })
    });
})

server.listen(port, () => {

    console.log(`Server is up on ${port}`);
  });

//   var stock1 = new Stock({
//       id: 101,
//       name: "Logan Paul",
//       influencerId: 23,
//       ipoQuantity: 30
//   });

//   var stock2 = new Stock({
//     id: 102,
//     name: "PewDiePie",
//     influencerId: 25,
//     ipoQuantity: 2121
// });

//   stock2.save().then(() => {
//       console.log("Logan Paul saved");
//   }).catch((err) => {
//       console.log("Err: " + err);
//   });
