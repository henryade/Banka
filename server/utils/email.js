import nodemailer from "nodemailer";

class Email {
  static transport() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OfficialBankaEmail,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  static sendMail(mail) {
    Email.transport().sendMail(mail, (err) => {
      if (err) {
        return err;
      }
      return null;
    });
  }

  static message(transaction) {
    return {
      from: process.env.EMAIL,
      to: transaction.email,
      subject: "Transaction Alert",
      html: `<div style="font-family:georgia">
      <h1 style="background-color:#172A3A;color:white;padding-left:20px;border-radius:5% 90% 90% 5%;font-family:Comic Sans MS;">Banka </h1>
      <p style="padding-bottom:10px;padding-left:5px;">Dear ${transaction.name},</p> 
                          <p style="padding-left:15px;">Banka Bank eLectronic Notification Service (BeNS)
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
}

export default Email;
