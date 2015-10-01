var emails = {
  emailA: function(emailerFirstName) {
    var email = '<p style="margin-top:0px">Hello '+emailerFirstName+',</p>';
      email += '<p>Thanks for gtting in touch!We have this new product <a href="http://www.yeah.com/newProduct.html/">here</a> .</p>';
  email += '<p>It Promises to give you the best';
   email += '<p>we are pleased that you took time to rech out to us.</p>';
    email += '<p>Please feel free to reach out to us with any questions, at this e-mail address or call +254 897 098.</p>';
    email += '<p>Warmly,</p>';
    email += '<p>Your organization Team</p>';

    return email;
  },
  emailB: function(emailerFirstName){
    var email = '<p style="margin-top:0px">Hello '+emailerFirstName+',</p>';
      email += '<p>Thanks for gtting in touch!We have this new product <a href="http://www.yeah.com/newProduct.html/">here</a> .</p>';
  email += '<p>It Promises to give you the best';
   email += '<p>we are pleased that you took time to rech out to us.</p>';
    email += '<p>Please feel free to reach out to us with any questions, at this e-mail address or call +254 897 098.</p>';
    email += '<p>Warmly,</p>';
    email += '<p>Your organization Team</p>';

    return email;
  }
};


  /*sent to the admin*/
var adminEmail = function(emailerData){
  var email = '<p style="margin-top:0px">There is an email from</p>';
  email += "<p>Name: "+emailerData.firstname+" "+emailerData.lastname+"</p>";
  email += "<p>Email: "+emailerData.email+"</p>";
  email += "<p>Phone Number: "+emailerData.phone+"</p>";
  email += "<p>Title of email? "+emailerSubject.emailerInfo+"</p>";
  email += "<p>What is your long message to us? "+emailerLong.else+"</p>";



  return email;
};

module.exports.generateApplicantEmail = function(applicantFirstName){
  var emailArr = Object.keys(emails);
  var randomEmailArrIndex = Math.floor(Math.random() * emailArr.length);

  var emailObj = {
    emailType: emailArr[randomEmailArrIndex],
    emailSubject: 'Thanks for reaching out to us:',
    emailContent: emails[emailArr[randomEmailArrIndex]](emailerFirstName)
  };

  return emailObj;
};

module.exports.adminNotificationEmail = function(applicantData){
  var emailObj = {
    emailSubject: "Thanks for reaching out to us",
    emailContent: adminEmail(applicantData)
  };
  return emailObj;
};
