import data from "./dbController";

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
  static createAccount(req, res) {
    const lengthOfAccountNumber = 6;
    const bankAccountNumberBranding = 9000000000;
    const id = Math.ceil(Math.random() * lengthOfAccountNumber);
    const accountNumber = bankAccountNumberBranding + Math.floor(Math.random() * lengthOfAccountNumber);
    const createdOn = new Date(Date.now());
    const owner = data.findOneUser("email", req.body.email).id;


    if (data.findAccount("owner", owner, "type", req.body.type)) {
      return res.status(400).json({
        status: 400,
        error: "Account Exists",
      });
    }
    data.createAccount(id, accountNumber, createdOn, owner, req.body.gender, "active", req.body.firstName, req.body.lastName, req.body.email, req.body.type, req.body.balance, req.body.phoneNumber, req.body.dob, req.body.address);


    res.status(201).json({
      status: 201,
      data: data.findAccount("owner", owner, "type", req.body.type),
    });
  }

  /**
 * Activate or Deactivate an account
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static changeAccountStatus(req, res) {
    const accounts = req.account;
    accounts.status = accounts.status === "active" ? "dormant" : "active";
    data.updateDB("ACCOUNTS", accounts, accounts.status, "status");
    return res.status(200).json({
      status: 200,
      data: data.findAccountByAccountNumber(accounts.accountNumber),
    });
  }

  /**
 * Delete an account
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
  static deleteAccount(req, res) {
    const specificAccount = req.account;

    data.deleteAccount(specificAccount);
    const checkAccountData = data.findAccountByAccountNumber(specificAccount);
    if (!checkAccountData) {
      return res.status(200).json({
        status: 200,
        message: "Account Successfully Delete",
      });
    }
  }
}


export default AccountController;
