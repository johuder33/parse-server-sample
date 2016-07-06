var nodemailer = require('nodemailer');
var config = process.env;
// create reusable transporter object using the default SMTP transport
var stringToConnect = 'smtps://'+config.EmailAPI_USER+':'+config.EmailAPI_PWD+'@mail.zboxapp.com';

var transporter = nodemailer.createTransport(stringToConnect);

module.exports = transporter;