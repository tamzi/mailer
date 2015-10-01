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

var adminEmail = function(applicantData){
  var email = '<p style="margin-top:0px">The following applicant just applied</p>';
  email += "<p>Name: "+applicantData.firstname+" "+applicantData.lastname+"</p>";
  email += "<p>Email: "+applicantData.email+"</p>";
  email += "<p>Phone Number: "+applicantData.phone+"</p>";
  email += "<p>Have you applied to Moringa School before? "+applicantData.appliedBefore+"</p>";
  email += "<p>What interests you about web and mobile development? "+applicantData.interests+"</p>";
  email += "<p>What sort of prior experience do you have with web and/or mobile development? "+applicantData.experience+"</p>";

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
