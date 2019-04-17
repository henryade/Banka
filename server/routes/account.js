import express from "express";
import accountData from "../controllers/accountController";
import isLoggedIn from "../middleware/authorization";
import validate from "../middleware/validation";

const router = express.Router();

// ///////////////////
// View All Account //
// /////////////////


router.get("/accounts", accountData.viewAllAccount)

// ///////////////////
// Create Account //
// /////////////////

router.post("/accounts", validate.createAccount, accountData.createAccount);

// ////////////////////////////////
// Activate/Deactivate Account //
// //////////////////////////////

router.patch("/accounts/:accountNumber", validate.changeAccountStatus, accountData.changeAccountStatus);

// ////////////////////////
 /// Delete Account ///
// //////////////////////

router.delete("/accounts/:accountNumber", validate.deleteAccount, accountData.deleteAccount);

module.exports = router;
