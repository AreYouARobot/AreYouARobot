var messages = require('../../components/messages.storage.js');

module.exports = {

	latestMsgs: function (req, res) {
		if (messages.storage) {
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