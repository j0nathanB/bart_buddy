var accountSid = 'AC1d5d92507963b3bad165e03a8f7cb211'; 
var authToken = 'c9f5d8ccc403f91d45a9c72ea80b8bfd';   

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
  body: 'Hello from Node',
  to: '+15106046933',  // Text this number
  from: '+15109013127' // From a valid Twilio number
})
.then((message) => console.log(message.sid));