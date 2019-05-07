import express from "express";
import transactionData from "../controllers/transactionController";
import isLoggedIn from "../middleware/authorization";
import validate from "../middleware/validation";

const router = express.Router();

// /////////////////////////////
// View a  all Account's Transactions //
// ///////////////////////////

<<<<<<< HEAD
router.get("/accounts/:accountNumber/transactions", isLoggedIn.user, transactionData.viewAllAccountTransaction);
=======
router.get("/accounts/:accountNumber/transactions",
  isLoggedIn.user, transactionData.viewAllAccountTransaction);
>>>>>>> ch-refactor-165853483

// /////////////////////////////
// View Specific Transaction //
// ///////////////////////////

<<<<<<< HEAD
router.get("/transactions/:transactionId", isLoggedIn.user, transactionData.viewSpecificTransaction);
=======
router.get("/transactions/:transactionId",
  validate.transaction, isLoggedIn.user, transactionData.viewSpecificTransaction);
>>>>>>> ch-refactor-165853483

// ///////////////////
// Debit Account //
// /////////////////

<<<<<<< HEAD
router.post("/transactions/:accountNumber/debit", isLoggedIn.staff, validate.debitAccount, transactionData.debitAccount);
=======
router.post("/transactions/:accountNumber/debit", isLoggedIn.staff,
  validate.debitAccount, transactionData.debitAccount);
>>>>>>> ch-refactor-165853483

// ///////////////////
// Credit Account //
// /////////////////

<<<<<<< HEAD
router.post("/transactions/:accountNumber/credit", isLoggedIn.staff, validate.creditAccount, transactionData.creditAccount);
=======
router.post("/transactions/:accountNumber/credit", isLoggedIn.staff,
  validate.creditAccount, transactionData.creditAccount);
>>>>>>> ch-refactor-165853483


export default router;
