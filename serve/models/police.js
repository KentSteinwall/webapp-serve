const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


var Police = mongoose.model('Police',{
firstName:{type:String}, 
lastName :{type:String},
nic:{type:String,
unique: true},
mobile:{type:Number},
email:{type:String},
policeId:{type:String},


});

module.exports = { Police };
