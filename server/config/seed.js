'use strict';

var User = require('../api/user/user.model.js');

User.find({}).remove(function() {
	User.create({
		provider: 'local',
		facebook_user_id: 'blahblah',
		facebook_access_token: '0123456',
		username: 'imarobot',
		email: 'imarobot@imarobot.com',
		pic: '',
		points: 10,
		achievements: []
	}, {
		provider: 'local',
		facebook_user_id: 'blahblah2',
		facebook_access_token: '01234567',
		username: 'tooprettyforschool',
		email: 'tooprettyforschool@tpfs.com',
		pic: '',
		points: 0,
		achievements: []		
	}, {
		provider: 'local',
		facebook_user_id: 'blahblah3',
		facebook_access_token: '012345678',
		username: 'oreallyowl',
		email: 'oreally@ohreally.com',
		pic: '',
		points: 25,
		achievements: []			
	}, {
		provider: 'local',
		facebook_user_id: 'blahblah4',
		facebook_access_token: '0123456789',
		username: 'jwarrick',
		email: 'jw@jw.com',
		pic: '',
		points: 0,
		achievements: []		
	}, {
		provider: 'local',
		facebook_user_id: 'blahblah5',
		facebook_access_token: '01234567891',
		username: 'fluffy',
		email: 'jw@jw.com',
		pic: 'http://38.media.tumblr.com/bc7ad1e6a8d4e78063466815ce94043c/tumblr_nb0vfnDO731tnlgoco1_500.gif',
		points: 30,
		achievements: ['awesome', 'kickass']		
	}, function() {
		console.log('finished populating users');
	});
});
