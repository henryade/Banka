import nodemailer from "nodemailer";

class Email {
  static transport() {
    return nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.OfficialBankaEmail,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  static sendMail(mail) {
    return Email.transport().sendMail(mail, (err) => {
      if (err) {
        return err;
      }
      return "Success";
    });
  }

  static staffSignUp(name, email, password) {
    return {
      from: "noreply@banka.com",
      to: email,
      subject: "New Banka Account",
      html: `<div style="font-family:georgia">
      <h1 style="background-color:#172A3A;color:white;padding-left:20px;border-radius:5% 90% 90% 5%;font-family:Comic Sans MS;">Banka </h1>
      <p style="padding-bottom:10px;padding-left:5px;">Dear ${name},</p> 
        <p style="padding-left:15px;">Banka electronic Notification Service (BeNS)
        We wish to inform you that ypur account has been created with us.</p>
      
        <p style="padding-left:15px;">The details of this account are shown below:</p>
        <p style="padding-left:40px;"><strong>Email Address <span style="display:inline-block;width:40px;padding-left:20px;"> : </span>${email}</strong></p>
        <p style="padding-left:40px;"><strong>Password <span style="display:inline-block;width:40px;padding-left:60px;"> : </span>${password}</strong></p> </div>
        <p style="padding-left:15px;">Click <a href="https://henryade.github.io/Banka/">here</a> to sign into your account.</p>`,
    };
  }

  static message(transaction) {
    return {
      from: "noreply@banka.com",
      to: transaction.email,
      subject: "Transaction Alert",
      html: `<div style="font-family:georgia">
      <h1 style="background-color:#172A3A;color:white;padding-left:20px;border-radius:5% 90% 90% 5%;font-family:Comic Sans MS;">Banka </h1>
      <p style="padding-bottom:10px;padding-left:5px;">Dear ${transaction.name},</p> 
                          <p style="padding-left:15px;">Banka electronic Notification Service (BeNS)
                          We wish to inform you that a  transaction occurred on your account with us.</p>
      
                          <p style="padding-left:15px;">The details of this transaction are shown below:</p>
                          <p><strong style="padding-left:20px;">Transaction Notification</strong></p>
                          <div style="font-family:Verdana;">
          
       <table style="border-collapse:collapse;font-size:14px;margin-left:30px">
         <tbody>
           <tr>
             <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Account Number</strong></td>
             <td style="border:2px solid black;padding:10px;text-align:center;">${transaction.accountNumber}</td>
           </tr>
           <tr>
             <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Transaction Location</strong></td>
             <td style="border:2px solid black;padding:10px;text-align:center;">Banka, Lagos</td>
           </tr>
           <tr>
             <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Type</strong></td>
             <td style="border:2px solid black;padding:10px;text-align:center;text-transform:capitalise;">${transaction.type}</td>
           </tr>
           <tr>
             <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Amount</strong></td>
             <td style="border:2px solid black;padding:10px;text-align:center;">${transaction.amount}</td>
           </tr>
           <tr>
             <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Date</strong></td>
             <td style="border:2px solid black;padding:10px;text-align:center;">20-Mar-2019</td>
           </tr>
         </tbody>
                            </table>                     
                          </div>
        <div style="background-color:#F5DEB3;border-top:1px solid black;margin-top:15px;padding-bottom:5px;">
          <p style="padding-left:20px;"><strong>Old Balance <span style="display:inline-block;width:40px;padding-left:20px;"> : </span>${transaction.oldbalance}</strong></p>
          <p style="padding-left:20px;"><strong>New Balance <span style="display:inline-block;width:40px;padding-left:15px;"> : </span>${transaction.newbalance}</strong></p> </div>
                           
      <p style="text-align:center;margin-top:5px;font-size:13px;"><strong>Thank you for choosing Banka Bank plc</strong></p>
        </div>`,
    };
  }

  static resetPassword(token, name, email, link, hlink) {
    const redirectLink = `http://localhost:3000/api/v1/auth/passwordreset/${token}/forgot?${(link === "second") ? "site=2" : ""}`;
    const homeLink = hlink || "https://henryade.github.io/Banka/";
    return {
      from: "noreply@banka.com",
      to: email,
      subject: "Reset Your Password",
      html: `<div class="container" style="width: 45%; margin: 10px auto; background: radial-gradient(circle, rgb(0, 255, 158) 50%, rgb(29, 90, 178) 100%);border-radius: 5px; padding:0 50px; color:#1d5ab2;">
      <div style="font-family:georgia; color:#1d5ab2;font-weight: 600;">
          <h1 style="font-family:Comic Sans MS; text-align:center;"><a href=${homeLink} onMouseOut={this.style.color='#1d5ab2'} onMouseOver={this.style.color='#ffab57'}>Banka</a> </h1>
          <p style="padding-bottom:10px;color:#ffbf80;">Dear <span style="color:#fff;">${name},</span> </p> 
          <p>Banka electronic Notification Service (BeNS).</p>
          <p>We got a request to reset your Banka password. This link expires in one(1) hour. Find below the password reset link:</p>
          <p style="text-align:center;"><a href=${redirectLink} onMouseOut={this.style.color='#1d5ab2'} onMouseOver={this.style.color='#ffab57'}>Reset Password</a></p>
          <p>If you ignore this message, your password will not be changed and you can click the link below to access the app</p>
      </div>
      <p style="text-align:center;margin-top:50px">Click <a onMouseOut={this.style.color='#1d5ab2'} onMouseOver={this.style.color='#ffab57'} href=${homeLink}>here</a> to sign into your account.</p>
      <p style="text-align:center;font-weight:bolder;">&copy; Banka</p>
    <style scoped>
    @media screen and (max-width: 650px) {
      .container {
        width: 75% !important;
      }
    }
    @media screen and (max-width: 400px) {
      .container {
        width: 95%! important;
      }
    }
    </style>
    </div>`,
    };
  }
}

export default Email;
