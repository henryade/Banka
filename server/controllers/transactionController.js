import data from "./dbController";

const logic = (action, req, res) => {
  const accounts = data.findAccountByAccountNumber(parseInt(req.params.accountNumber));
  const money = accounts.balance;
  if (!accounts) {
    return res.status(400).json({
      status: 400,
      error: "Invalid account number",
    });
  }
  if (accounts.status === "dormant") {
    return res.status(400).json({
      status: 400,
      error: "Account is Inactive",
    });
  }
  const newBalance = money + action * req.body.amount;

  const lengthOfTransactionId = 6;
  const id = Math.floor(Math.random() * lengthOfTransactionId);
  const createdOn = new Date(Date.now());
  const type = action === 1 ? "credit" : "debit";

  data.createTransaction(
    id,
    createdOn,
    type,
    req.params.accountNumber,
    // cashier,
    req.body.amount,
    newBalance,
    req.body.depositor || null,
    type === "credit" ? req.body.phoneNumber : null,
  );
  const newTransaction = data.findTransactionById(id);


  return res.status(200).json({
    status: 200,
    data: newTransaction,
  });
};


class TransactionController {
  static creditAccount(req, res) {
    console.log("Dsffs")
    return logic(1, req, res);
  }

  static debitAccount(req, res) {
    const account = data.findAccountByAccountNumber(parseInt(req.params.accountNumber));
    const accountMoney = account.balance;
    if (!account) {
      return res.status(400).json({
        status: 400,
        error: "Invalid account number",
      });
    }
    if (account.balance - accountMoney <= 0) {
      return res.status(400).json({
        status: 400,
        error: "Low Funds. Account cant be Debited",
      });
    }
    return logic(-1, req, res);
  }
}


export default TransactionController;
