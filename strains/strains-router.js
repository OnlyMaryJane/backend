const express = require('express');
const router = express.Router();
const restricted = require('../auth/auth-middleware');

const Strains = require('./strains-model');

// [GET] all strains
router.get('/', restricted, (req, res) => {
    
})


module.exports = router;