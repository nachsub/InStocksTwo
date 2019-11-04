const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var StockSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    influencerId: {
        type: Number,
        required: true
    },
    ipoQuantity: {
        type: Number,
        required: true
    }

    //category
});

StockSchema.statics.findById = function (id) {
    var Stock = this;

    return Stock.findOne({
        id: id
    });
};

StockSchema.statics.findByInfluencerId = function (id) {
    var Stock = this;

    return Stock.findOne({
        influencerId: id
    });
};

var Stock = mongoose.model('Stock', StockSchema);

module.exports = {Stock};
