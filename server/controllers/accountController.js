import data from "./dbController";

const logic = (action, req, res) => {
  const accounts = data.findAccountByAccountNumber(parseInt(req.params.accountNumber));
  if (!accounts) {
    return res.status(400).json({
      status: 400,
      error: "Invalid account number",
    });
  }
  if (accounts.status === action) {
    return res.status(400).json({
      status: 400,
      error: `Account is ${action}`,
    });
  }
  accounts.status = action;
  return res.status(200).json({
    status: 200,
    data: accounts,
  });
};

class AccountController {
  static createAccount(req, res) {
    if (!req.body.email) {
      return res.status(400).json({
        status: 400,
        error: "email is required",
      });
    }
    if (!req.body.phoneNumber) {
      return res.status(400).json({
        status: 400,
        error: "phone number is required",
      });
    }
    if (!req.body.firstName) {
      return res.status(400).json({
        status: 400,
        error: "first name is required",
      });
    }
    if (!req.body.lastName) {
      return res.status(400).json({
        status: 400,
        error: "last name is required",
      });
    }
    if (!req.body.dob) {
      return res.status(400).json({
        status: 400,
        error: "date of birth is required",
      });
    }
    if (!req.body.address) {
      return res.status(400).json({
        status: 400,
        error: "address is required",
      });
    }
    if (!req.body.type) {
      return res.status(400).json({
        status: 400,
        error: "Account type is required",
      });
    }
    if (!req.body.balance) {
      return res.status(400).json({
        status: 400,
        error: "opening balance is required",
      });
    }
    const lengthOfAccountNumber = 6;
    const bankAccountNumberBranding = 9000000000;
    const id = Math.floor(Math.random() * lengthOfAccountNumber);
    const accountNumber = bankAccountNumberBranding + Math.floor(Math.random() * lengthOfAccountNumber);
    const createdOn = new Date(Date.now());
    const owner = data.findOneUser("email", req.body.email).id;

    data.createAccount(id, accountNumber, createdOn, owner, "active", req.body.firstName, req.body.lastName, req.body.email, req.body.type, req.body.balance, req.body.phoneNumber, req.body.dob, req.body.address);
    const newAccount = data.findAccountById(owner);

    res.status(201).json({
      status: 201,
      data: newAccount,
    });
  }

  static activateAccount(req, res) {
    logic("active", req, res);
  }

  static deactivateAccount(req, res) {
    // eslint-disable-next-line radix
    logic("dormant", req, res);
  }

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
    return res.status(400).json({
      status: 400,
      message: "Account still exist",
    });
  }
}


export default AccountController;
