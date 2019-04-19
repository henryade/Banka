import data from "./dbController";

/**
 * Debit or Credit controller
 * @param {number} action - positve for credit, negative for debit
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
const logic = (action, req, res) => {
  const account = data.findAccountByAccountNumber(parseInt(req.params.accountNumber));
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

  const newBalance = account.balance + amount * action;
  const lengthOfTransactionId = 6;
  const id = Math.floor(Math.random() * lengthOfTransactionId);
  const createdOn = new Date(Date.now());
  const type = action === 1 ? "credit" : "debit";
  const depositor = req.body.depositor || "self";
  const phoneNumber = req.body.depositorPhoneNumber || "self";
  data.updateAccountDB(parseInt(req.params.accountNumber), "balance", newBalance);
  
  data.createTransaction(
    id,
    createdOn,
    type,
    req.params.accountNumber,
    // req.userData.id,
    amount,
    account.balance,
    newBalance,
    depositor,
    phoneNumber,
  );

  const newTransaction = data.findTransactionById(id);
  return res.status(200).json({
    status: 200,
    data: newTransaction,
  });
};

/**
 * Transaction Controller Class
 */

class TransactionController {
  /**
 * View specific transaction
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static viewSpecificAccountTransaction(req, res) {
    const transactions = data.findAllAccountTransactionsByAccountNumber(parseFloat(req.params.accountNumber));
    if (transactions !== undefined) {
      return res.status(200).json({
        status: 200,
        data: transactions,
      });
    }
    return res.status(404).json({
      status: 404,
      error: "Invalid Account Number",
    });
  }

  /**
 * View specific transaction
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static viewSpecificTransaction(req, res) {
    const transaction = data.findTransactionById(Number(req.params.transactionId));
    if (transaction !== undefined) {
      return res.status(200).json({
        status: 200,
        data: transaction,
      });
    }
    return res.status(404).json({
      status: 404,
      error: "Invalid Transaction Id",
    });
  }

  /**
 * Credit an account
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static creditAccount(req, res) {
    return logic(1, req, res);
  }

  /**
 * Debit an Account
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static debitAccount(req, res) {
    return logic(-1, req, res);
  }
}


export default TransactionController;
