import data from "./dbController";
import logic from "../utils/transactionLogic";


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
  static async viewAllAccountTransaction(req, res) {
    const transactions = await data
      .findAllAccountTransactionsByAccountNumber(parseInt(req.params.accountNumber, 10));
    if (transactions.length !== 0) {
      return res.status(200).json({
        status: 200,
        data: transactions,
      });
    }
    return res.status(400).json({
      status: 400,
      error: "Invalid Account Number",
    });
  }

  /**
 * View specific transaction
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static async viewSpecificTransaction(req, res) {
    const transaction = await data.findTransactionById(Number(req.params.transactionId));
    if (transaction !== undefined) {
      return res.status(200).json({
        status: 200,
        data: transaction,
      });
    }
    return res.status(404).json({
      status: 404,
      error: "Transaction Id Not Found",
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
