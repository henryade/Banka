import express from "express";
import userData from "../controllers/userController";
import validate from "../middleware/validation";
import isLoggedIn from "../middleware/authorization";
import checks from "../middleware/dbValidation";

const router = express.Router();

router.post("/auth/signup", validate.signUp, checks.checkUser, userData.signup);
router.post("/auth/signin", validate.signIn, checks.signin, userData.signin);

export default router;
