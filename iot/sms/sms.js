#!/usr/bin/env node
// From: https://www.twilio.com/user/account/developer-tools/api-explorer/message-create 
// export NODE_PATH=/usr/local/lib/node_modules

// Twilio Credentials 
var accountSid = 'AC407ab27aab63fa995dbc24c43a18d204'; 
var authToken = '99e44f31bc8c7981c4ae6d6cf9c65eda'; 

// The message
var message="This is a test message.";

// Use the command line as the message if given.
if(process.argv.length > 2) {
    message = process.argv.slice(2).join(" ");
    console.log(message);
}

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
client.messages.create({ 
	// to: "812-233-3219", 
	to: "812-221-2291", 
	from: "+1-812-233-3826", 
	body: message,
	// https://www.twilio.com/blog/2014/09/getting-started-with-twilio-mms.html
	// mediaUrl: 'http://137.112.41.36/test.jpg',
}, function(err, message) { 
	if(err) {
		console.log(err);
	} else {
		console.log(message.sid);
	}
});
