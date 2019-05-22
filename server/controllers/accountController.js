import data from "./dbController";
import { generateAccountNumber } from "../utils/auth";

class AccountController {
/**
 * View all bank accounts
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static viewAllAccount(req, res) {
    return res.status(200).json({
      status: 200,
      data: res.body.datafield,
    });
  }

  /**
 * View specific bank accounts
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static viewSpecificAccount(req, res) {
    return res.status(200).json({
      status: 200,
      data: req.account,
    });
  }


  /**
 * Create a bank account
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static async createAccount(req, res) {
    if (await data.findAccount(req.body.type, req.body.email)) {
      return res.status(400).json({
        status: 400,
        error: "Account Exists",
      });
    }
    const accountNumber = generateAccountNumber();
    const createdOn = new Date(Date.now());
    const user = await data.findOneUser(req.body.email);
    const owner = user.id;
    const balance = req.body.openingBalance;
    let newAccount = {};
    try {
      newAccount = await data.createAccount(req.body.email, accountNumber, createdOn, owner, "active", req.body.type, balance);
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "Error Occured",
      });
    }
    return res.status(201).json({
      status: 201,
      data: newAccount,
    });
  }

  /**
 * Activate or Deactivate an account
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static async changeAccountStatus(req, res) {
    const { account } = req;
    account.status = account.status === "active" ? "dormant" : "active";
    let accountUpdate = {};
    try {
      accountUpdate = await data
        .findAccountByStatus(
          account.status,
          parseInt(req.params.accountNumber, 10),
        );
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return res.status(200).json({
      status: 200,
      data: accountUpdate,
    });
  }

  /**
 * Delete an account
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static async deleteAccount(req, res) {
    const deleted = await data.deleteAccount(parseInt(req.params.accountNumber, 10));

    if (deleted) {
      return res.status(200).json({
        status: 200,
        message: "Account Successfully Delete",
      });
    }
    return null;
  }
}


export default AccountController;
