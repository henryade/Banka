import express from "express";
import accountData from "../controllers/accountController";
import isLoggedIn from "../middleware/authorization";
import validate from "../middleware/validation";
import checks from "../middleware/dbValidation";

const router = express.Router();

// ///////////////////
// View All Account //
// /////////////////

router.get("/accounts", validate.allAccount, checks.db, accountData.viewAllAccount)

// /////////////////////////
// View specific Account //
// ///////////////////////

router.get("/accounts/:accountNumber", checks.accountCheck, accountData.viewSpecificAccount)

// ///////////////////
// Create Account //
// /////////////////

router.post("/accounts", validate.createAccount, accountData.createAccount);

// ////////////////////////////////
// Activate/Deactivate Account //
// //////////////////////////////

router.patch("/accounts/:accountNumber", validate.changeAccountStatus, checks.accountCheck, accountData.changeAccountStatus);

// ////////////////////////
 /// Delete Account ///
// //////////////////////

router.delete("/accounts/:accountNumber", validate.deleteAccount, checks.accountCheck, accountData.deleteAccount);

module.exports = router;
