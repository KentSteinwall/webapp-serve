const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Insurance = mongoose.model('Insurance',{
firstName:{type:String}, 
lastName :{type:String},
nic:{type:String,
unique: true},
mobile:{type:Number},
email: {type:String},
agentId: {type:String},


});

module.exports = { Insurance };