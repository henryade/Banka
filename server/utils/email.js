import nodemailer from "nodemailer";

class Email {
  static transport() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  static sendMail(message) {
    Email.transport().sendMail(message, (err, info) => {
      if (err) {
        console.log(err)
      }
      console.log("success");
    });
  }
}

export default Email;
