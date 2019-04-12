import express from "express";
import accountData from "../controllers/accountController";
import isLoggedIn from "../middleware/authorization";

const router = express.Router();

// ///////////////////
// Create Account //
// /////////////////

router.post("/accounts", accountData.createAccount);

// ////////////////////////////////
// Activate/Deactivate Account //
// //////////////////////////////

router.patch("/accounts/:accountNumber/activate", accountData.activateAccount);
router.patch("/accounts/:accountNumber/deactivate", accountData.deactivateAccount);

// ////////////////////////
// /// Delete Account ///
// //////////////////////

router.delete("/accounts/:accountNumber", accountData.deleteAccount);

module.exports = router;
