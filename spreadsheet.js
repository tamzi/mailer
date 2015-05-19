var Promise = require('bluebird');
var Spreadsheet = require('edit-google-spreadsheet');
var emails = require('./emails/email');


var gmailAccount = process.env.GMAILACCOUNT || require('./secret/credentials')['gmailAccount'];
var gmailPassword = process.env.GMAILPASSWORD || require('./secret/credentials')['gmailPassword'];
var spreadsheetName = process.env.SPREADSHEETNAME || require('./secret/credentials')['spreadsheetName'];
var worksheetName = process.env.WORKSHEETNAME || require('./secret/credentials')['worksheetName'];

module.exports = {
  /*
  "update" function assumes that the next available empty row index has been located using the "findNextEmptyRow" function.

  INPUT: applicant provided data in an object and an integer (rowNumber) indicating the next empty row on the spreadsheet
  OUTPUT: an object containing the following keys: the row index and emailObj.  The row index is generated dynamically and it's value is an object
  containing data to be placed in the row.  emailObj containts the email subject, email content and email type (A or B).
  */
  update: function(applicantData, rowNumber){
    return new Promise(function(resolve, reject){
      Spreadsheet.load({
        debug: true,
        useHTTPS: true,
        spreadsheetName: spreadsheetName,
        worksheetName: worksheetName,
        username: gmailAccount,
        password: gmailPassword
      }, function sheetReady(err, spreadsheet){
        if(err) throw err;

        var emailObj = emails.generateApplicantEmail(applicantData.firstname);

        var rowData = {};

        rowData[rowNumber] = {
          1: applicantData.firstname,
          2: applicantData.lastname,
          3: applicantData.email,
          4: applicantData.phone,
          6: applicantData.interests,
          7: applicantData.experience,
          9: emailObj.emailType,
          10: new Date().toString()
        };

        spreadsheet.add(rowData);

        spreadsheet.send(function(err){
          if(err) throw err;
          rowData.emailObj = emailObj;  //add the email object so that this object can be used to send the actual email
          resolve(rowData);  //returns the rowData so that we can use the data to send the actual email outside of this promise
        });
      });
    });
  },
  read: function() {
    return new Promise(function(resolve, reject){
      Spreadsheet.load({
        debug: true,
        useHTTPS: true,
        spreadsheetName: spreadsheetName,
        worksheetName: worksheetName,
        username: gmailAccount,
        password: gmailPassword
      }, function sheetReady(err, spreadsheet){
        if(err) throw err;
        spreadsheet.receive(function(err, rows, info){
          if(err) throw err;
          resolve(rows);
        })
      });
    });
  },
  /*
  "findNextEmptyRow" function assumes that the "read" function has already been called and the result (rows) of the "read"
  function is passed into "findNextEmptyRow" so that the next empty row index can be calculated.
  INPUT: rows data from a previous "read" function call
  OUTPUT: integer representing the next empty row in the spreadsheet
  */
  findNextEmptyRow: function(rows){
    var objectKeys = Object.keys(rows);
    for(var i=0; i<objectKeys.length; i++){
      objectKeys[i] = parseInt(objectKeys[i]);
    }
    return objectKeys.sort(function(a,b){return b-a;})[0] + 1;
  },
  applicantExists: function(){
    var exists = false;
    return exists;
  }
};
