import express from "express";
import nodemailer from "nodemailer";
import transactionData from "../controllers/transactionController";
import isLoggedIn from "../middleware/authorization";
import validate from "../middleware/validation";

const router = express.Router();

// /////////////////////////////
// View a  all Account's Transactions //
// ///////////////////////////

router.get("/accounts/:accountNumber/transactions", isLoggedIn.user, transactionData.viewAllAccountTransaction);

// /////////////////////////////
// View Specific Transaction //
// ///////////////////////////

router.get("/transactions/:transactionId", isLoggedIn.user, transactionData.viewSpecificTransaction);

// ///////////////////
// Debit Account //
// /////////////////

router.post("/transactions/:accountNumber/debit", isLoggedIn.staff, validate.debitAccount, transactionData.debitAccount);

// ///////////////////
// Credit Account //
// /////////////////

router.post("/transactions/:accountNumber/credit", isLoggedIn.staff, validate.creditAccount, transactionData.creditAccount);


module.exports = router;
