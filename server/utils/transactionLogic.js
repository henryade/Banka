import data from "../controllers/dbController";
import { generateId } from "./auth";
import email from "./email";

/**
 * Debit or Credit controller
 * @param {number} action - positve for credit, negative for debit
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
 const logic = async (action, req, res) => {
  const account = await data.findAccountByAccountNumber(parseInt(req.params.accountNumber));
  const amount = parseFloat(req.body.amount);

  if (!account) {
    return res.status(400).json({
      status: 400,
      error: "Invalid Account Number",
    });
  }

  if (account.status === "dormant") {
    return res.status(400).json({
      status: 400,
      error: "Account is Inactive",
    });
  }
  if (action === -1 && account.balance - amount <= 0) {
    return res.status(400).json({
      status: 400,
      error: "Low Funds. Account cant be Debited",
    });
  }

  const newBalance = parseFloat(account.balance) + amount * action;
   const createdOn = new Date(Date.now());  
  const type = action === 1 ? "credit" : "debit";
  const depositor = req.body.depositor || "self";
  const phoneNumber = req.body.depositorPhoneNumber || "self";
  const cashier = req.userData.id;

  data.updateBalance(newBalance, parseInt(req.params.accountNumber));

  let newTransaction = {};

  try {
    newTransaction = await data.createTransaction(
      createdOn,
      type,
      req.params.accountNumber,
      cashier,
      parseFloat(amount),
      parseFloat(account.balance),
      parseFloat(newBalance),
      depositor,
      phoneNumber,
    );
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: "Error Occured",
    })
  }
  const message = {
    from: process.env.EMAIL,
    to: "clasiqaas@gmail.com",
    subject: "Transaction Alert",
    html: `<div style="font-family:georgia">
    <h1 style="background-color:#172A3A;color:white;padding-left:20px;border-radius:5% 90% 90% 5%;font-family:Comic Sans MS;">Banka </h1>
    <p style="padding-bottom:10px;padding-left:5px;">Dear DAVID FLUSH,</p> 
                        <p style="padding-left:15px;">Banka Bank eLectronic Notification Service (BeNS)
                        We wish to inform you that a  transaction occurred on your account with us.</p>
    
                        <p style="padding-left:15px;">The details of this transaction are shown below:</p>
                        <p><strong style="padding-left:20px;">Transaction Notification</strong></p>
                        <div style="font-family:Verdana;">
        
     <table style="border-collapse:collapse;font-size:14px;margin-left:30px">
       <tbody>
         <tr>
           <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Account Number</strong></td>
           <td style="border:2px solid black;padding:10px;text-align:center;">${req.params.accountNumber}</td>
         </tr>
         <tr>
           <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Transaction Location</strong></td>
           <td style="border:2px solid black;padding:10px;text-align:center;">Banka, Lagos</td>
         </tr>
         <tr>
           <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Type</strong></td>
           <td style="border:2px solid black;padding:10px;text-align:center;text-transform:capitalise;">${type}</td>
         </tr>
         <tr>
           <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Amount</strong></td>
           <td style="border:2px solid black;padding:10px;text-align:center;">${amount}</td>
         </tr>
         <tr>
           <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Date</strong></td>
           <td style="border:2px solid black;padding:10px;text-align:center;">20-Mar-2019</td>
         </tr>
       </tbody>
                          </table>                     
                        </div>
      <div style="background-color:#F5DEB3;border-top:1px solid black;margin-top:15px;padding-bottom:5px;">
        <p style="padding-left:20px;"><strong>Old Balance <span style="display:inline-block;width:40px;padding-left:20px;"> : </span>${account.balance}</strong></p>
        <p style="padding-left:20px;"><strong>New Balance <span style="display:inline-block;width:40px;padding-left:13px;"> : </span>${newBalance}</strong></p> </div>
                         
    <p style="text-align:center;margin-top:5px;font-size:13px;"><strong>Thank you for choosing Banka Bank plc</strong></p>
      </div>`,
  }
  email.sendMail(message);

  return res.status(200).json({
    status: 200,
    data: newTransaction,
  });
};

export default logic;
