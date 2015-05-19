var Promise = require('bluebird');
var nodemailer = require('nodemailer');

module.exports = {
  sendMail: function(emailObj, applicantEmailAddr){
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAILACCOUNT || require('../secret/credentials')['gmailAccount'],
        pass: process.env.GMAILPASSWORD || require('../secret/credentials')['gmailPassword']
      }
    });

    var options = {
      from: 'Moringa School Admissions <admissions@moringaschool.com>',
      subject: emailObj.emailSubject,
      html: emailObj.emailContent,
      to: applicantEmailAddr
    };
    return new Promise(function(resolve, reject){
      transporter.sendMail(options, function(err, info) {
        if (err) {
          console.log("error is: ",err);
          return;
        }
        resolve(info);
        return;
      });
    });
  }
};
