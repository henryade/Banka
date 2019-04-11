import express from "express";
import accountData from "../controllers/accountController";
import isLoggedIn from "../middleware/authorization";

const router = express.Router();

// ///////////////////
// Create Account //
// /////////////////

router.post("/accounts", accountData.createAccount);

// ///////////////////
// Debit Account //
// /////////////////

router.post("/:userId/transactions/:account-number/debit", (req, res) => {

});

// ///////////////////
// Credit Account //
// /////////////////

router.post("/:userId/transactions/:account-number/credit", (req, res) => {

});

// ////////////////////////////////
// Activate/Deactivate Account //
// //////////////////////////////

router.put("/accounts/:accountNumber/activate", accountData.activateAccount);
router.put("/accounts/:accountNumber/deactivate", accountData.deactivateAccount);

// ////////////////////////
// /// Delete Account ///
// //////////////////////

router.delete("/account/:accountNumber", accountData.deleteAccount);

module.exports = router;
