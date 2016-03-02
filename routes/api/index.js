//Root api router
var express = require('express');
var router = express.Router();

function getid(req) {
	return req.headers.email || req.headers.id;
}
/*
Routes
/			welcome message
/all		undefined
/info		send complete user information based on uid in header
/profile	Profile info

*/
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/all', function (req, res) {
	console.log('API[all] request from(' + req.headers.email + ')');
	req.db.accounts.find({email: req.headers.email}, function (err, account) {
		res.status(200).json(account);
	});
});

////User routes////
router.get('/info', function (req, res) {
	var id = getid(req);
	console.log('API[info] request from(' + id + ')');
	
	var db = req.db;
	var account = db.accounts.findOneSync({email: req.headers.email});
	var profile = db.profile.findOneSync({uid: account.uid});
	var phoneid = db.phoneNums.findOneSync({uid: account.uid});
	
	var body = {
		account: account,
		profile: profile,
		phoneID: phoneid
	};
	console.log('API[info] response to(' + id + '):', body);
	res.status(200).json(body)
});

////Profile routes////
router.use('/profile', require('./profile'));
////Phonebook routes////
router.use('/contacts', require('./contacts'));

module.exports = router;