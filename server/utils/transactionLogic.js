import data from "../controllers/dbController";
/**
 * Debit or Credit controller
 * @param {number} action - positve for credit, negative for debit
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
export const logic = (action, req, res) => {
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

