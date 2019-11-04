const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var InfluencerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    stocks :[
        {
            type: Number
        }
    ]

    //add bank details here
});

var User = mongoose.model('Influencer', StockSchema);

module.exports = {Influencer};
