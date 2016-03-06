//Root api router
var express = require('express');
var router = express.Router();

function getid(req) {
	return req.headers.uid || req.headers.email;
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
	.get(function (req, res) {
		res.status(404).json({message: 'This command is not suppported'});
})
	.post(function (req, res) { //Create
		var id = getid(req);
		console.log('API[profile] creating profile for ' + id);

		var db = req.db;
		var new_profile = req.body;
		//We already have a profile for this user -- exit
		
		var check = db.profile.findOneSync({uid: id});
		console.log(id, check);
		if (check) {
			res.status(300).json({err: 'Profile exists'});
			return;
		};
		new_profile.uid = id;
		console.log(new_profile);
		db.profile.insert(new_profile, function(err, doc) {
			if(err){
				console.log('API[profile] error creating profile for ' + id + ' - ' + err);
				res.status(300).json({error: err});
			}
			else {
				console.log('API[profile] created profile for ', id, '-', doc);
				res.status(200).json({data: doc, complete: true});
			}
		});	
//		res.status(200).json({complete: true});
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