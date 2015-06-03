var api_key = process.env.SENDGRID_API_KEY || require('../secret/credentials')['sendgrid_api_key'];

module.exports = {
  sendMail: function(emailObj, applicantEmailAddr){
    var sendgrid  = require('sendgrid')(api_key);
    sendgrid.send({
      to:       applicantEmailAddr,
      from:     'admissions@moringaschool.com',
      subject:  emailObj.emailSubject,
      html:     emailObj.emailContent
    }, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
    });
  }
};
