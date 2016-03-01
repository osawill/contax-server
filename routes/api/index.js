//Root api router
var express = require('express');
var router = express.Router();

function getid(req) {
	return req.headers.email || req.headers.id;
}
/*
Routes
/ 		welcome message
/all 	undefined
/info 	send complete user information based on uid in header
/profile Profile info

*/
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/all', function(req, res){
	console.log('API[all] request from('+ req.headers.email+')');
	req.db.accounts.find({email: req.headers.email},function (err, account) {
		res.status(200).json(account);
	})
});

router.get('/info', function(req, res){
	var id = getid(req);
	console.log('API[info] request from('+ id +')');
	
	var db = req.db;
	var account = db.accounts.findOneSync({email: req.headers.email});
	var profile = db.profile.findOneSync({uid: account.uid});
	var phoneid = db.phoneNums.findOneSync({uid: account.uid});
	
	var body = {
		account: account,
		profile: profile,
		phoneID: phoneid,
	}
	console.log('API[info] response to(' + id + '):', body)
	res.json(body)
});

////Profile routes////
//get profile
router.get('/profile/:id', function (req, res) {
	var id = getid(req);
	var user = req.params.id;
	console.log('API[profile] for ' + user + ' from('+ id +')');
	
	if (typeof user !== 'number') {
		console.log('API[profile] response to (' + id + '): Not valid format, ' + user + ' is not a number');
		res.status(400).json({user: null});
		return;
	}
	
	var db = req.db;
	var data = db.profile.findOneSync({uid: user});
	
	//Check if requesting user
	//has permission to view
	//profile
	if (user) {
		console.log('API[profile] response to(' + id + '):', user);
		res.status(200).json({user: data});
	} else {
		console.log('API[profile] response to (' + id + '): No user found by ' + user + ', Got ' + data);
		res.status(300).json({user: null});
	}	
});
//Create profile
router.post('/profile', function (req, res) {
	var id = getid(req);
	console.log('API[profile] creating profile for ' + id);
	
	var db = req.db;
	//We already have a profile for this user -- exit
	if (db.profile.findOneSync({uid: id})) {
		res.status(300).json({complete: false});
		return;
	};
	console.log(req.body);
	//dp.profile.save({}, function(err, doc) {
//		if(err)
//			res.status(300).json({error: err, complete: false});
//		else
//			res.status(200).json({data: doc, complete: true});
	//});	
	res.status(200).json({complete: true});
});
//Update profile
router.put('/profile', function (req, res) {
		var id = getid(req);
	console.log('API[profile] updating profile for ' + id);
	
	var db = req.db;

	console.log(req.body);
	//dp.profile.save({}, function(err, doc) { //Save uses PK
//		if(err)
//			res.status(300).json({error: err, complete: false});
//		else
//			res.status(200).json({data: doc, complete: true});
	//});	
	res.status(200).json({complete: true});
});

module.exports = router;