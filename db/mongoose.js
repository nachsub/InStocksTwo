var mongoose = require('mongoose');

console.log("entered mongoose.js func");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI); //enter location here

module.exports = {mongoose};
