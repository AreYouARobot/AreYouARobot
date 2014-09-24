var messages = require('../../components/messages.storage.js');

module.exports = {

	latestMsgs: function (req, res) {
		console.log(messages, "this is messages");
		if (messages.storage) {
			console.log("messages found");
			res.status(200).send(messages.storage);
			res.end();
		}
	},

	postMsg: function(req, res) {
		var message = req.body;
		messages.storage['data'].push(message);
		res.status(202).send();
	}

};