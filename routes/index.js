//Root router
var express = require('express');
var router = express.Router();

//General message
router.get('/', function(req, res) {
    res.json({ message: 'Welcom to uMe' });   
});

//Take requests to api routes
router.use('/api', require('./api'));

module.exports = router;