import express from "express";
import userData from "../controllers/userController";
import validate from "../middleware/validation";
import isLoggedIn from "../middleware/authorization";
import checks from "../middleware/dbValidation";
import utils from "../utils/uploadImage";

const router = express.Router();

router.post("/auth/signup", validate.signUp, checks.checkUser, userData.signup);
router.post("/auth/signin", validate.signIn, checks.signin, userData.signin);
router.post("/auth/reset", validate.forgotPassword, checks.uploadImage, userData.reset);
router.post("/auth/forgotPassword", validate.reset, checks.uploadImage, userData.forgotPassword);
router.get("/auth/passwordreset/:token/forgot?", userData.passwordReset);
router.post("/upload", isLoggedIn.basicAuth, checks.uploadImage, utils.uploadImage);

export default router;
