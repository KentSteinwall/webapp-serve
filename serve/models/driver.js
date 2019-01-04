const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Driver = mongoose.model('Driver',{
firstName:{type:String}, 
lastName :{type:String},
nic:{type:String,
unique: true},
mobile:{type:Number},
email:{type:String},
license:{type:Number}


});

module.exports = { Driver };