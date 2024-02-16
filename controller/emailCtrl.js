const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async(data,req,res)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        secure: false, // true for 465, false for other ports
        port: 587,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'dahlia31@ethereal.email',
          pass: '2W7UAFvGqBXSyBmxyF'
          },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Fred Foo 👻" <sahooamit88@example.com>', // sender address
          to: "'sahooamit400@gmail.com'", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
      }
      
      main().catch(console.error);
});

module.exports = {sendEmail};

