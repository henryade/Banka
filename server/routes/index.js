import express from "express";
import userData from "../controllers/userController"

const router = express.Router();

router.post("/auth/signup", (req, res) => {
  res.status(200)
});

router.post("/auth/signin", userData.signin);

module.exports = router;