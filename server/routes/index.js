import express from "express";
import userData from "../controllers/userController";
import validate from "../middleware/validation";

const router = express.Router();

router.post("/auth/signup", validate.signUp, userData.signup);
router.post("/auth/signin", validate.signIn, userData.signin);

module.exports = router;
