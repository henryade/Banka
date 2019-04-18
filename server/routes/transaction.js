import express from "express";
import transactionData from "../controllers/transactionController";
import isLoggedIn from "../middleware/authorization";

const router = express.Router();


// /////////////////////////////
// View Specific Transaction //
// ///////////////////////////

router.post("/transactions/:transactionId", transactionData.viewSpecificTransaction);

// ///////////////////
// Debit Account //
// /////////////////

router.post("/transactions/:accountNumber/debit", transactionData.debitAccount);

// ///////////////////
// Credit Account //
// /////////////////

router.post("/transactions/:accountNumber/credit", transactionData.creditAccount);

module.exports = router;
