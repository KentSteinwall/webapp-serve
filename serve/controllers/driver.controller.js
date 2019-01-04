const mongoose = require('mongoose');
//const User = mongoose.model('Insurance');
const express = require('express');
var router = express.Router();
var ObjectId =require('mongoose').Types.ObjectId;
var { Driver } =require('../models/driver');
var { User } =require('../models/user');
var nodemailer = require('nodemailer');
var generator = require('generate-password');
var type ="Driver";

router.get('/',(req, res) => {
    Driver.find((err, docs) => {
        if(!err) {res.send(docs); }
        else {console.log('Error in Retriving Driver :' + JSON.stringify(err, undefined, 2));}
    });

});
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
      return res.status(400).send('No record with given id: ${req.params.id}');

      Driver.findById(req.params.id, (err ,doc) => {
        if(!err) {res.send(doc); }
        else {console.log('Error in Retriving Driver :' + JSON.stringify(err, undefined, 2));}

      });
});

router.post('/', (req, res) => {
    
    var dri =new Driver({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile:req.body.mobile,
        nic: req.body.nic,
        email: req.body.email,
        license: req.body.license,
         


    });
    dri.save((err, doc)=>{
       if(!err){res.send(doc);
       }
       else if(err.code == 11000)
          {res.status(422).send(['Duplicate NIC found.']); }
          else {return next(err);}
    });
});
router.post('/user', (req, res) => {
    var password = generator.generate({
        length: 5,
        numbers: true
    });
    var ins =new User({
        
        userId: req.body.nic,
        type:type,
        hashedPassword:password,
        
 });
     ins.save((err,doc) => {
        if(!err){res.send(doc);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'dbuddyucsc@gmail.com',
                  secure: false, // use SSL
                  port: 25,
                  pass: 'DBucsc@123'
                },
                tls: {
                    rejectUnauthorized: false
                }
              });
              var mailOptions = {
                  from: 'dbuddyucsc@gmail.com',
                  to: req.body.email,
                  subject: 'driverbuddy',
                  text: password
                };
              
              
              transporter.sendMail(mailOptions, function (error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }
         else if(err.code == 11000)
         {res.status(422).send(['Duplicate found.']); }
         else {return next(err);}
     });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
       return res.status(400).send('No record with given id : ${req.params.id}');
     
     var dri ={
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         nic: req.body.nic,
         mobile:req.body.mobile,
         email: req.body.email,
         license:req.body.license,
         
     };
     Driver.findByIdAndUpdate(req.params.id, { $set: dri},{ new: true},(err,doc) => {
         if(!err) { res.send(doc); }
         else {console.log('Error in Driver Update :' + JSON.stringify(err, undefined, 2)); }
     });
     });
    router.put('/user/:userId', (req, res) => {
      
         
        var dri ={
            userId: req.body.nic,
            
        };
        User.findOneAndUpdate(req.params.userId, { $set: dri},{ new: true},(err,doc) => {
            if(!err) { res.send(doc); }
            else {console.log('Error in Insurance agent Update :' + JSON.stringify(err, undefined, 2)); }
        });
        });
     router.delete('/:id', (req ,res) => {
         if(!ObjectId.isValid(req.params.id))
            return res.status(400).send('No record with given id : ${req.params.id}');   
            
         Driver.findByIdAndRemove(req.params.id, (err, doc) => {
             if(!err) { res.send(doc); }
             else {console.log('Error in Driver Delete :' + JSON.stringify(err, undefined, 2)); }
 
         });
     });
     router.delete('/user/:userId', (req ,res) => {
       
        User.deleteOne({userId:req.params.userId}, (err, doc) => {
         if(!err) { res.send(doc); }
         else {console.log('Error in Insurance agent Delete :' + JSON.stringify(err, undefined, 2)); }
 
     }); 
       
         
     });



module.exports =router;