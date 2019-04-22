import data from "../controllers/dbController";
import { generateId } from "./auth";

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

  return res.status(200).json({
    status: 200,
    data: newTransaction,
  });
};

export default logic;
