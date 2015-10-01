var Promise = require('bluebird');
var api_key = process.env.SENDGRID_API_KEY || require('../secret/credentials')['sendgrid_api_key'];

module.exports = {
  sendMail: function(emailObj, applicantEmailAddr){
    var sendgrid  = require('sendgrid')(api_key);
    return new Promise(function(resolve, reject){
      sendgrid.send({
        to:       applicantEmailAddr,
        from:     'yes@yourwebsite.com',
        subject:  emailObj.emailSubject,
        html:     emailObj.emailContent
      }, function(err, json) {
        if (err) {
          console.log("Mailing error");
          return console.error(err);
        }else{
          console.log("Sent mail to: "+applicantEmailAddr);
          console.log(json);
          resolve(json);
        }
      });
    });
  }
};
