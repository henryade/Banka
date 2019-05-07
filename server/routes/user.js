import express from "express";
import userData from "../controllers/userController";
import checks from "../middleware/dbValidation";
import isLoggedIn from "../middleware/authorization";
import validate from "../middleware/validation";

const router = express.Router();

// /////////////////////////////////////////////
// View all Account Owned by a Specific User //
// ///////////////////////////////////////////

<<<<<<< HEAD
router.get("/user/:email/accounts", validate.email, checks.email, isLoggedIn.user, userData.getAccounts);
=======
router.get("/user/:email/accounts", isLoggedIn.user, validate.email, checks.email, userData.getAccounts);
>>>>>>> ch-refactor-165853483

// ////////////////
// Create Staff //
// //////////////

router.post("/users", isLoggedIn.admin, validate.checkStaff, checks.checkStaff, userData.createUser);

export default router;