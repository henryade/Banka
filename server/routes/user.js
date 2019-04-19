import express from "express";
import userData from "../controllers/userController";
import checks from "../middleware/dbValidation";
import isLoggedIn from "../middleware/authorization";
import validate from "../middleware/validation";
import UserController from "../controllers/userController";

const router = express.Router();

// /////////////////////////////////////////////
// View all Account Owned by a Specific User //
// ///////////////////////////////////////////

router.get("/user/:email/accounts", userData.getAccounts);

// ////////////////
// Create Staff //
// //////////////

router.post("/users", validate.checkStaff, checks.checkStaff, userData.createUser);

export default router;