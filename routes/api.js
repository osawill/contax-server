//Root api router
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log(req);
    res.json({ message: 'hooray! welcome to our api!' });   
});


module.exports = router;