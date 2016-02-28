//Root api router
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log(req);
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/all', function(req, res){
	console.log('API[all] request from('+ req.headers.email+')');
	req.db.accounts.find({email: req.headers.email},function (err, account) {
		res.status(200).json(account);
	})
});

router.get('/info', function(req, res){
	var id = req.headers.email || req.headers.id;
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

module.exports = router;