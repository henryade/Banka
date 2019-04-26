import express from "express";
import accountData from "../controllers/accountController";
import isLoggedIn from "../middleware/authorization";
import validate from "../middleware/validation";
import checks from "../middleware/dbValidation";

const router = express.Router();

// ///////////////////
// View All Account //
// /////////////////

router.get("/accounts", isLoggedIn.staff_admin, validate.allAccount, checks.db, accountData.viewAllAccount)

// /////////////////////////
// View specific Account //
// ///////////////////////

router.get("/accounts/:accountNumber", isLoggedIn.staff_admin, checks.accountCheck, accountData.viewSpecificAccount);

// ///////////////////
// Create Account //
// /////////////////

router.post("/accounts", validate.createAccount, isLoggedIn.user, accountData.createAccount);

// ////////////////////////////////
// Activate/Deactivate Account //
// //////////////////////////////

router.patch("/accounts/:accountNumber", isLoggedIn.staff_admin, validate.changeAccountStatus, checks.accountCheck, accountData.changeAccountStatus);

// ////////////////////////
 /// Delete Account ///
// //////////////////////

router.delete("/accounts/:accountNumber", isLoggedIn.staff_admin, validate.deleteAccount, checks.accountCheck, accountData.deleteAccount);

module.exports = router;
