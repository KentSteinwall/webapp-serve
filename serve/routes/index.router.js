const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlUser1 = require('../controllers/insurance.controller');
const jwtHelper = require('../config/jwtHelper');


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
//router.post('/insurance_register', ctrlUser1.insurance_register);
//router.get('/insurance_register', ctrlUser1);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;