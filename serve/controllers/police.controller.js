const mongoose = require('mongoose');
//const User = mongoose.model('Insurance');
const express = require('express');
var router = express.Router();
var ObjectId =require('mongoose').Types.ObjectId;
var { Police } =require('../models/police');
var { User } =require('../models/user');
var nodemailer = require('nodemailer');
var AutoIncrement = require('mongoose-auto-increment');
var generator = require('generate-password');
var type ="Police";


router.get('/',(req, res) => {
    Police.find((err, docs) => {
        if(!err) {res.send(docs); }
        else {console.log('Error in Retriving Police Officer :' + JSON.stringify(err, undefined, 2));}
    });

});
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
      return res.status(400).send('No record with given id: ${req.params.id}');

      Police.findById(req.params.id, (err ,doc) => {
        if(!err) {res.send(doc); }
        else {console.log('Error in Retriving Police officer :' + JSON.stringify(err, undefined, 2));}

      });
});

router.post('/', (req, res) => {
   
    var po =new Police({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nic: req.body.nic,
        mobile:req.body.mobile,
        email: req.body.email,
        policeId: req.body.policeId,
        


    });
    po.save((err, doc)=>{
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
     
     var po ={
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         nic: req.body.nic,
         mobile:req.body.mobile,
         email: req.body.email,
         policeId:req.body.policeId,
        
     };
     Police.findByIdAndUpdate(req.params.id, { $set: po},{ new: true},(err,doc) => {
         if(!err) { res.send(doc); }
         else {console.log('Error in Police Officer Update :' + JSON.stringify(err, undefined, 2)); }
     });
     });
 
    router.put('/user/:userId', (req, res) => {
      
         
        var po ={
            userId: req.body.nic,
            
        };
        User.findOneAndUpdate(req.params.userId, { $set: po},{ new: true},(err,doc) => {
            if(!err) { res.send(doc); }
            else {console.log('Error in Insurance agent Update :' + JSON.stringify(err, undefined, 2)); }
        });
        });


router.delete('/:id', (req ,res) => {
         if(!ObjectId.isValid(req.params.id))
            return res.status(400).send('No record with given id : ${req.params.id}');   
            
         Police.findByIdAndRemove(req.params.id, (err, doc) => {
             if(!err) { res.send(doc); }
             else {console.log('Error in Police Officer Delete :' + JSON.stringify(err, undefined, 2)); }
 
         });
     });
   
     router.delete('/user/:userId', (req ,res) => {
       
        User.deleteOne({userId:req.params.userId}, (err, doc) => {
         if(!err) { res.send(doc); }
         else {console.log('Error in Insurance agent Delete :' + JSON.stringify(err, undefined, 2)); }
 
     }); 
       
         
     });

module.exports =router;


 