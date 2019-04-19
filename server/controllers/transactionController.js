import data from "./dbController";
import { logic } from "../utils/debit-creditLogic";

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
