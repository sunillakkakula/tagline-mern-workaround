import nodemailer from "nodemailer";

const sendVTTEmail = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sunil.lakkakula@gmail.com",
      pass: "Charan6571",
    },
  });

  let mailOptions = {
    from: "sunil.lakkakula@gmail.com",
    to: "skolapalli@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return;
    }
  });
};
export { sendVTTEmail };
