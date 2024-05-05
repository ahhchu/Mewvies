export const sendingEmail = (email, sub, txt) => {
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false,
    auth: {
      user: 'mewvies@zohomail.com',
      pass: 'GMaApls4050'
    }
  });
  var mailOptions = {
    from: 'mewvies@zohomail.com',
    to: email,
    subject: sub,
    text: txt
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
