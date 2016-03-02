//Root api router
var express = require('express');
var router = express.Router();

function getid(req) {
	return req.headers.email || req.headers.id;
}

////Profile routes////
//Get profile

router.get('/:id', function (req, res) {
	var id = getid(req);
	var user = req.params.id;
	console.log('API[profile] for ' + user + ' from('+ id +')');
	
	if (typeof user !== 'number') {
		console.log('API[profile] response to (' + id + '): Not valid format, ' + user + ' is not a number');
		res.status(400).json({err:"No user", user: null});
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
//Create/Update profile
router.route('/')
	.post(function (req, res) { //Create
	var id = getid(req);
	console.log('API[profile] creating profile for ' + id);

	var db = req.db;
	//We already have a profile for this user -- exit
	if (db.profile.findOneSync({uid: id})) {
		res.status(300).json;
		return;
	};
	console.log(req.body);
	//dp.profile.save({}, function(err, doc) {
//		if(err)
//			res.status(300).json({error: err});
//		else
//			res.status(200).json({data: doc, complete: true});
	//});	
	res.status(200).json({complete: true});
})
	.put(function (req, res) { //Update
		var id = getid(req);
		console.log('API[profile] updating profile for ' + id);

		var db = req.db;

		console.log(req.body);
		//dp.profile.save({}, function(err, doc) { //Save uses PK
	//		if(err)
	//			res.status(300).json({error: err});
	//		else
	//			res.status(200).json({data: doc, complete: true});
		//});	
		res.status(200).json({complete: true});
});

module.exports = router;