import data from "../controllers/dbController";
import mail from "./email";

/**
 * Debit or Credit controller
 * @param {number} action - positve for credit, negative for debit
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */

 /* istanbul ignore logic */
const logic = async (action, req, res) => {
  const account = await data.findAccountByAccountNumber(parseInt(req.params.accountNumber, 10));
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

  const newBalance = Number.parseFloat(parseFloat(account.balance) + amount * action).toFixed(2);
  const createdOn = new Date(Date.now());
  const type = action === 1 ? "credit" : "debit";
  const depositor = req.body.depositor || "self";
  const phoneNumber = req.body.depositorPhoneNumber || "self";
  const cashier = req.userData.id;
  data.updateBalance(newBalance, parseInt(req.params.accountNumber, 10));

  let newTransaction = {};

  try {
    newTransaction = await data.createTransaction(
      createdOn,
      type,
      req.params.accountNumber,
      cashier,
      parseFloat(amount),
      parseFloat(account.balance),
      newBalance,
      depositor,
      phoneNumber,
    );
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: "Error Occured",
    });
  }
  const person = await data.findOwner(account.owner);
  const { email } = person;
  const name = `${person.lastName} ${person.firstName}`.toUpperCase();
  const message = mail.message({ name, email, ...newTransaction });
  mail.sendMail(message);

  return res.status(200).json({
    status: 200,
    data: newTransaction,
  });
};

export default logic;
