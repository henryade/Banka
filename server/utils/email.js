import nodemailer from "nodemailer";

class Email {
  static transport() {
    return nodemailer.createTransport({
      service: "gmail",
      port: 465,
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.REFRESH_TOKEN,
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
