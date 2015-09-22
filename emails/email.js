var emails = {
  emailA: function(applicantFirstName) {
    var email = '<p style="margin-top:0px">Hello '+applicantFirstName+',</p>';
      email += '<p>Thanks for applying to Moringa School! The next step in the process is to complete the following units on Sololearn <a href="http://www.sololearn.com/Course/Java/">here</a> before we schedule an interview.</p>';
  email += '<p>1. Module 1:Basic Concepts <br></br>2. Module 2:Conditionals and Loops <br></br>3. Module 3:Arrays <br></br>4. Module 4:Classes and Objects</p>';
   email += '<p>Once you are done, kindly send an email to admissions@moringaschool.com to schedule an interview either over Skype or at our office along Ngong Road. The interview will be your opportunity to learn more about Moringa School, and experience our teaching style.</p>';
    email += '<p>Please feel free to reach out to us with any questions, at this e-mail address or call +254 711 581484.</p>';
    email += '<p>Warmly,</p>';
    email += '<p>Moringa School Team</p>';

    return email;
  },
  emailB: function(applicantFirstName){
    var email = '<p style="margin-top:0px">Hello '+applicantFirstName+',</p>';
      email += '<p>Thanks for applying to Moringa School! The next step in the process is to complete the following units on Sololearn <a href="http://www.sololearn.com/Course/Java/">here</a> before we schedule an interview.</p>';
  email += '<p>1. Module 1:Basic Concepts <br></br>2. Module 2:Conditionals and Loops <br></br>3. Module 3:Arrays <br></br>4. Module 4:Classes and Objects</p>';
   email += '<p>Once you are done, kindly send an email to admissions@moringaschool.com to schedule an interview either over Skype or at our office along Ngong Road. The interview will be your opportunity to learn more about Moringa School, and experience our teaching style.</p>';
    email += '<p>Please feel free to reach out to us with any questions, at this e-mail address or call +254 711 581484.</p>';
    email += '<p>Warmly,</p>';
    email += '<p>Moringa School Team</p>';

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
    emailSubject: 'Moringa School Application: Next Steps',
    emailContent: emails[emailArr[randomEmailArrIndex]](applicantFirstName)
  };

  return emailObj;
};

module.exports.adminNotificationEmail = function(applicantData){
  var emailObj = {
    emailSubject: "Moringa School Application",
    emailContent: adminEmail(applicantData)
  };
  return emailObj;
};
