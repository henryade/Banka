import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "User not Signed-In",
      });
    }
    req.userData = decoded;
    next();
  });
};
