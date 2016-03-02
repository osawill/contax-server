//Root api router
var express = require('express');
var router = express.Router();

function getid(req) {
	return req.headers.email || req.headers.id;
}

////Phonebook routes////
//Batch method
router.route('/')
	.get(function (req, res) {
		var id = getid(req);
		console.log('API[contacts] getting all contacts for ' + id);

		var db = req.db;
		db.phoneBook.find({uid: id}, function (err, doc) {
			if (err)
				res.status(300).json({error: err});
			else
				res.status(200).json({contacts: doc, complete: true});
		});
})
	.post( function (req, res) {
		var id = getid(req);
		console.log('API[contacts] updating all contacts for ' + id);

		var db = req.db;

	//	var data = req.body.data;
	//	db.phoneBook.save(data, function (err, doc){
	//		if(err)
	//			res.status(300).json({error: err});
	//		else
	//			res.status(200).json({contacts: doc, complete: true});
	//	})
		res.status(200).json({complete: true});
})
	.delete( function (req, res) {
		var id = getid(req);
		console.log('API[contacts] deleting all contacts for ' + id);

		var db = req.db;
		db.phoneBook.destroy({uid: id}, function (err, doc) {
			if(err)
				res.status(300).json({error: err});
			else
				res.status(200).json({contacts: doc, complete: true});
		})
})
;
//Singular method
router.route('/:id')
	.get( function (req, res) {
		var id = getid(req);
		var user = req.params.id;
		console.log('API[contacts] getting contact' + user + ' for ' + id);

		var db = req.db;
	//	db.phoneBook.findOne({uid: id, phone_id: data.id}, function (err, doc) {
	//		if(err)
	//			res.status(300).json({error: err});
	//		else{
	//			res.status(200).json({contact: doc, complete: true});
	//		}
	//	});
		res.status(200).json({complete: true});
})
	.post( function (req, res) {
		var id = getid(req);
		var user = req.params.id;
		console.log('API[contacts] creating contact' + user + ' for ' + id);

		var db = req.db;
	//	var data = req.body;
	//	db.phoneBook.save({data: data}, function (err, doc) {
	//		if(err)
	//			res.status(300).json({error: err});
	//		else
	//			res.status(200).json({contacts: doc, complete: true});
	//	})
})
	.put( function (req, res) {
		var id = getid(req);
		var user = req.params.id;
		console.log('API[contacts] updating contact' + user + ' for ' + id);

		var db = req.db;
	//	var data = req.body;
	//  data.uid = uid;
	//
	//	db.phoneBook.save({data: data}, function (err, doc) {
	//		if(err)
	//			res.status(300).json({error: err});
	//		else
	//			res.status(200).json({contacts: doc, complete: true});
	//	})
})
	.delete( function (req, res) {
		var id = getid(req);
		var user = req.params.id;
		console.log('API[contacts] deleting contact' + user + ' for ' + id);

		var db = req.db;
		var data = req.body;
		db.phoneBook.destroy({uid: id, phone_id: data.phone_id}, function (err, doc) {
			if (err)
				res.status(300).json({error: err});
			else 
				res.status(200).json({complete: true});
		})
})
;

module.exports = router;