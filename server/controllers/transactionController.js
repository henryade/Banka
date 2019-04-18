import data from "./dbController";

/**
 * Debit or Credit controller
 * @param {number} action - positve for credit, negative for debit
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
const logic = (action, req, res) => {
  const accounts = data.findTransactionByAccountNumber(parseInt(req.params.accountNumber));
  const accountStatus = data.findAccountByAccountNumber(parseInt(req.params.accountNumber));
  const amount = parseFloat(req.body.amount);

  if (!accounts || !accountStatus) {
    return res.status(400).json({
      status: 400,
      error: "Invalid Account Number",
    });
  }
  if (action === -1 && accounts.newBalance - amount <= 0) {
    return res.status(400).json({
      status: 400,
      error: "Low Funds. Account cant be Debited",
    });
  }

  if (Number.isNaN(amount)) {
    return res.status(400).json({
      status: 400,
      error: "Amount is Invalid",
    });
  }
  if (accountStatus.status === "dormant") {
    return res.status(400).json({
      status: 400,
      error: "Account is Inactive",
    });
  }
  const newBalance = accounts.newBalance + amount * action;
  const lengthOfTransactionId = 6;
  const id = Math.floor(Math.random() * lengthOfTransactionId);
  const createdOn = new Date(Date.now());
  const type = action === 1 ? "credit" : "debit";
  const depositor = req.body.depositor || null;
  const phoneNumber = req.body.depositorPhoneNumber || null;

  // if (!data.findTransactionByAccountNumber(req.params.accountNumber)) {
  data.createTransaction(
    id,
    createdOn,
    type,
    req.params.accountNumber,
    // req.userData.id,
    amount,
    accounts.newBalance,
    newBalance,
    depositor,
    phoneNumber,
  );
  // } else {
  //   data.updateTransactionDB(req.params.accountNumber, {amount, newBalance: accounts.newBalance, newBalance });
  //   if (type === "debit") data.updateTransactionDB(req.params.accountNumber, { depositor, phoneNumber });
  // }
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
