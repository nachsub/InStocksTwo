const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var TransactionSchema = new mongoose.Schema({
    buyer: {
        type: Number,
    },
    seller: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    settlementStatus: {
        type: Number,
        required: true
    },
    saleTime: {
        type: Number
    },
    saleInitiationTime: {
        type: Number,
        required: true
    }
});

TransactionSchema.statics.findTransactionsBySeller = function (seller) {
    var Transaction = this;

    return Transaction.find({seller});
};

TransactionSchema.statics.findTransactionsByBuyer = function (buyer) {
    var Transaction = this;

    return Transaction.find({buyer});
};

var User = mongoose.model('Transaction', TransactionSchema);

module.exports = {Transaction};
