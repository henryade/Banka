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

  console.log(account)
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
  const id = generateId();
  const createdOn = new Date(Date.now());  
  const type = action === 1 ? "credit" : "debit";
  const depositor = req.body.depositor || "self";
  const phoneNumber = req.body.depositorPhoneNumber || "self";
  const cashier = 30594;

  data.updateBalance(newBalance, parseInt(req.params.accountNumber));
  // console.log(balance);

  let newTransaction = {};

  try {
    newTransaction = await data.createTransaction(
      id,
      createdOn,
      type,
      req.params.accountNumber,
      cashier,
      amount,
      parseFloat(account.balance),
      parseFloat(newBalance),
      depositor,
      phoneNumber,
    );
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error,
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
           <td style="border:2px solid black;padding:10px;text-align:center;">46576879809</td>
         </tr>
         <tr>
           <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Transaction Location</strong></td>
           <td style="border:2px solid black;padding:10px;text-align:center;">Banka, Lagos</td>
         </tr>
         <tr>
           <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Description</strong></td>
           <td style="border:2px solid black;padding:10px;text-align:center;">Over The Counter(OTC)</td>
         </tr>
         <tr>
           <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Amount</strong></td>
           <td style="border:2px solid black;padding:10px;text-align:center;">N70,000</td>
         </tr>
         <tr>
           <td style="border:2px solid black;padding:10px;text-align:center;"><strong>Date	</strong></td>
           <td style="border:2px solid black;padding:10px;text-align:center;">20-Mar-2019</td>
         </tr>
       </tbody>
                          </table>                     
                        </div>
      <div style="background-color:#F5DEB3; padding-top:4px;padding-bottom:4px;border-top:1px solid black;margin-top:25px;">	
        <p style="padding-left:20px;"><strong>Current Balance <span style="display:inline-block;width:40px;padding-left:20px;"> : </span>N930,000</strong></p>
        <p style="padding-left:20px;"><strong>Available Balance <span style="display:inline-block;width:40px;padding-left:13px;"> : </span> N929,935</strong></p> </div>
                         
    <p style="text-align:center;margin-top:10px;font-size:13px;"><strong>Thank you for choosing Banka Bank plc</strong></p>
      </div>`,
  }
  email.sendMail(message);

  return res.status(200).json({
    status: 200,
    data: newTransaction,
  });
};

export default logic;