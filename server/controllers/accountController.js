import data from "./dbController";
import { generateId, generateAccountNumber } from "../utils/auth";

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
      data: req.body.datafield,
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
    const id = generateId();
    const accountNumber = generateAccountNumber();
    const createdOn = new Date(Date.now());
    const owner = await data.findOwner(req.body.email);
    const balance = req.body.openingBalance;

    if (await data.findAccount(req.body.type)) {
      return res.status(400).json({
        status: 400,
        error: "Account Exists",
      });
    }
    let newAccount = {};
    try {
      newAccount = await data.createAccount(id, accountNumber, createdOn, owner, req.body.gender, "active", req.body.firstName, req.body.lastName, req.body.email, req.body.type, balance, req.body.phoneNumber, req.body.dob, req.body.address);
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    // data.findAccount("owner", owner, "type", req.body.type)
    res.status(201).json({
      status: 201,
      // data: await data.findAccount(req.body.type),
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
    const accounts = req.account;
 
    accounts.status = accounts.status === "active" ? "dormant" : "active";
    const accountUpdate = await data.findAccountByStatus(accounts.status, parseInt(req.params.accountNumber));
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
    const specificAccount = req.account;

    const deleted = await data.deleteAccount(parseInt(req.params.accountNumber));
    
    if (deleted) {
      return res.status(200).json({
        status: 200,
        message: "Account Successfully Delete",
      });
    }
  }
}


export default AccountController;
