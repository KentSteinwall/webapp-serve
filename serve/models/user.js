const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


var User = mongoose.model('User',{
    userId:{type:String,
    unique: true},
    type:{type:String},
    hashedPassword:{type:String}


});

User.schema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.hashedPassword, salt, (err, hash) => {
            this.hashedPassword= hash;
            this.saltSecret = salt;
            next();
        });
    });
});



module.exports = { User };
