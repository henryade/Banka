import express from "express";
import userData from "../controllers/userController";
import checks from "../middleware/dbValidation";
import isLoggedIn from "../middleware/authorization";
import validate from "../middleware/validation";

const router = express.Router();

// /////////////////////////////////////////////
// View all Account Owned by a Specific User //
// ///////////////////////////////////////////

router.get("/user/:email/accounts", isLoggedIn.user, validate.email, checks.email, userData.getAccounts);

// ////////////////
// Create Staff //
// //////////////

router.post("/users", isLoggedIn.admin, validate.checkStaff, checks.checkStaff, userData.createUser);

router.get("/:email/user", isLoggedIn.staff_admin, validate.email, checks.email, userData.getUser);

export default router;
