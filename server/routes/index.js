import express from "express";
import userData from "../controllers/userController";

const router = express.Router();

router.post("/auth/signup", userData.signup);
router.post("/auth/signin", userData.signin);

module.exports = router;
