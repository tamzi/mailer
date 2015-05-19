var emails = {
  emailA: function(applicantFirstName) {
    var email = '<p style="margin-top:0px">Hello '+applicantFirstName+',</p>';
    email += '<p>Thanks for applying to Moringa School! The next step in the process is to complete the following units on Codecademy <a href="http://www.codecademy.com/en/tracks/ruby">here</a> before we schedule an interview.</p>';
    email += '<p>1. Intro To Ruby <br></br>2. Control Flow <br></br>3. Looping <br></br>4. Arrays and Hashes <br></br>5. Blocks and Sorting (Methods, Blocks, & Sorting)</p>';
    email += '<p>Once you are done, please send us a link to your user achievements (<a href="http://www.codecademy.com/users/alvinkatojr/achievements">Click here for an example.</a>) and we will schedule an interview either over Skype or at our office at Nairobi Startup Garage (Ngong Road). Our interview will be your opportunity to learn more about Moringa School, and experience our teaching style.</p>';
    email += '<p>Please feel free to reach out to us with any questions, at this e-mail address.</p>';
    email += '<p>Warmly,</p>';
    email += '<p>Moringa School Team</p>';

    return email;
  },
  emailB: function(applicantFirstName){
    var email = '<p style="margin-top:0px">Hello '+applicantFirstName+'!</p>';
    email += "<p>Thanks for applying to Moringa School! The next step in the process is a coding challenge that you'll complete and send back to us before we schedule an interview.</p>";
    email += "<p>If you’re new to Ruby, go through a few units of Codecademy <a href='http://www.codecademy.com/en/tracks/ruby'>here</a> so you can complete the coding challenge.</p>";
    email += "<p><b>Note:</b> For the coding challenge, use <a href='http://repl.it/languages/Ruby'>this</a> online compiler to write your code.</p>";
    email += "<p><b>Coding challenge:</b><br></br>Using the Ruby language, have the function Palindrome(str) take the str parameter being passed and return the string <b>true</b> if the parameter is a palindrome, (the string is the same forward as it is backward) otherwise return the string <b>false</b>. For example: \"racecar\" is also \"racecar\" backwards. Punctuation and numbers will not be part of the string.</p>";
    email += "<p><b>Example:</b><br></br>Palindrome(\“racecar\")<br></br>- this is a method call</p>";
    email += "<p><b>Expected output:</b><br></br>Palindrome(\“racecar\”)-> true</p>";
    email += "<p>Note:<br></br>Racecar is a palindrome.</p>";
    email += "<p>Please send us your solution one week from today. When you’re done:</p>";
    email += "<p>Copy your method into a file and save it with ‘.rb’. Ex: palindrome.rb.<br></br>Send the file to to us.</p>";
    email += "<p>We will schedule an interview after we review the coding challenge. Please reach out to us at contact@moringaschool.com if you have any questions!</p>";
    email += "<p>Best,<br></br>Moringa School Team</p>";

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
