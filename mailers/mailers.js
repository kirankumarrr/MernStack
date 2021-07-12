const nodemailer = require("nodemailer");
const Cards = require("../models/Cards");
const pug = require('pug');
const pdf = require('express-pdf');
const { mailCardTemplate } = require("./mailTemplate");
// async..await is not allowed in global scope, must use a wrapper
async function cardsMailer(app) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  const cards = await Cards.find();
  console.log('cards :', cards);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    // host: "smtp.ethereal.email",
    // port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "shoppingw95@gmail.com", // generated ethereal user
      pass: 'YG88vw@09', // generated ethereal password
    },
  });
const dynamicHTML =pug.renderFile(__dirname + `\\cardTemplate.pug`, {iterable: cards})
  // send mail with defined transport object


  //PDF 
  app.use('/pdfFromHTMLString', function(req, res){
    res.pdfFromHTML({
        filename: 'generated.pdf',
        htmlContent : dynamicHTML
    });
});

  // let info = await transporter.sendMail({
  //   from: 'shoppingw95@gmail.com', // sender address
  //   to: "kirankumarrrreddy@gmail.com", // list of receivers
  //   subject: "Sending Mail From MERN ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: mailCardTemplate(cards), // html body
  // });

  // console.log("MAIL TRIGGERED ",info);

  // console.log("Message sent: %s", info.messageId);
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// cardsMailer().catch(console.error);

module.exports = {
    cardsMailer
}
