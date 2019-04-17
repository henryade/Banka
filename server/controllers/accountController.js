import data from "./dbController";

class AccountController {
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
    // if (!owner) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: "Must use the same email",
    //   });
    // }

    if (data.findAccountById(owner)) {
      if (data.findAccountById(owner).type === req.body.type) {
        return res.status(400).json({
          status: 400,
          error: "Account Exists",
        });
      }
    }
    data.createAccount(id, accountNumber, createdOn, owner, req.body.gender, "active", req.body.firstName, req.body.lastName, req.body.email, req.body.type, req.body.balance, req.body.phoneNumber, req.body.dob, req.body.address);
    const newAccount = data.findAccountById(owner).type === req.body.type ? data.findAccountById(owner) : res.status(404).json({
      status: 404,
      message: "Account Not Found",
    });


    res.status(201).json({
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
  static changeAccountStatus(req, res) {
    const accounts = data.findAccountByAccountNumber(parseInt(req.params.accountNumber));
    if (!accounts) {
      return res.status(400).json({
        status: 400,
        error: "Invalid account number",
      });
    }
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
    const specificAccount = data.findAccountByAccountNumber(parseInt(req.params.accountNumber));
    if (!specificAccount) {
      return res.status(404).json({
        status: 404,
        message: "Account Not Found",
      });
    }

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
