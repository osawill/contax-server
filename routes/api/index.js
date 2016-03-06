//Root api router
var express = require('express');
var router = express.Router();

function getid(req) {
	return req.headers.uid || req.headers.email;
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
	req.db.accounts.find({email: req.headers.email}).then(function (err, account) {
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
router.post('/link_number', function(req, res) {
	var id = getid(req);
	console.log('API[profile] linking phone# for ' + id);

	var db = req.db;
	var number_profile = req.body;
	//We already have a profile for this user -- exit

	var check = db.profile.findOneSync({uid: id});
	console.log(id, check);
	if (check) {
		//Number already exists
		//TODO: better handle this situation
		number_profile.phone_id = check.phone_id;
	};
	number_profile.uid = id;
	console.log(number_profile);
	db.profile.save(number_profile, function(err, doc) {
		if(err){
			console.log('API[profile] error linking phone# for ' + id + ' - ' + err);
			res.status(300).json({error: err});
		}
		else {
			console.log('API[profile] linked phone# for ', id, '-', doc);
			res.status(200).json({data: doc, complete: true});
		}
	});	
//		res.status(200).json({complete: true});
});

module.exports = router;