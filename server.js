var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var spreadsheetFunc = require('./spreadsheet');
var mailer = require('./mailer/mailer');
var email = require('./emails/email');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// set the Access-Control-Allow-Origin header to the allowed origins
app.use('/', function(req, res, next){
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data


app.post('/newapplicant', function(req, res){
  var applicantData = req.body;
  // 1. Read the applicant spreadsheet first
  spreadsheetFunc.read()
    // 2. Check if applicant applied already
    .then(function(rows){
      if(!spreadsheetFunc.applicantExists()){
        return rows;
      }
    })
    // 3. if not, then find the next empty row index on the spreadsheet
    .then(function(rows){
      var nextIndex = spreadsheetFunc.findNextEmptyRow(rows);
      // 4. add applicant to the next empty index
      return spreadsheetFunc.update(applicantData, nextIndex);
    })
    .then(function(promisedValue){
      // 5. send out emails
      mailer.sendMail(promisedValue.emailObj, applicantData.email); //send applicant the challenge email

      var adminEmailObj = email.adminNotificationEmail(applicantData);
      var emails = process.env.ADMINEMAILS || require('./secret/credentials')['adminEmail'];
      emails = JSON.parse('['+emails+']'); //convert the string to an array of email addresses
      mailer.sendMail(adminEmailObj, emails);  //send administrators email about the applicant
    })
    .then(function(promisedValue){
      res.end();
    });
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
