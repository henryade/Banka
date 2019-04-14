import express from "express";
import userData from "../controllers/userController";
import isLoggedIn from "../middleware/authorization";

const router = express.Router();

router.post("/auth/signup", userData.signup);
router.post("/auth/signin", isLoggedIn, userData.signin);

module.exports = router;
