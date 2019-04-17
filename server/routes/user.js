import express from "express";
import accountData from "../controllers/accountController";
import isLoggedIn from "../middleware/authorization";
import validate from "../middleware/validation";

const router = express.Router();

// /////////////////////////
// View all User Account //
// ///////////////////////

router.get("/userId/accounts");