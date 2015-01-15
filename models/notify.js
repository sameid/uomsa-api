var _e = require('../config').ENVIRONMENT;

var gcm = require('node-gcm-service');
var sender = new gcm.Sender();
sender.setAPIKey(_e.gcm.key);

var r = require('redis');
var redis = r.createClient(_e.redis.port, _e.redis.host, {auth_pass: _e.redis.pass} );

exports.notify = function(title, _message){
	var message = new gcm.Message();
	message.addNewKeyValue('message',_message);
	message.addNewKeyValue('title', title );
	message.timeToLive = 3000;
	redis.smembers("gcm-reg-ids", function(err, members){
		sender.sendMessage(message.toString(), members, true, function(err, data) {
    		if (!err) console.log(data);
    		else console.log(err);
		});
	});
}

exports.registerDevice = function(req, res){
	// if (req.body.user_id){
	// 	//push to some hset
	// }
	// else {
		redis.sadd('gcm-reg-ids', req.body.reg_id);
		res.send('registered with api');
	// }

}

exports.sendNotifications = function(req, res){
	res.send('etst');
}