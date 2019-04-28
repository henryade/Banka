import jwt from "jsonwebtoken";
import data from "../controllers/dbController";

module.exports = {
  staff(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Not Authorized",
        });
      }
      if (decoded.type !== "staff" || decoded.isAdmin !== false) {
        return res.status(401).json({
          message: "Not Authorized To Access this Site",
        });
      }
      req.userData = decoded;
      next();
    });
    return null;
  },
  staff_admin(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(407).json({
        message: "Missing Authorization",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Not Authorized",
        });
      }
      if (decoded.type !== "staff") {
        return res.status(401).json({
          message: "Not Authorized To Access this Site",
        });
      }
      req.userData = decoded;
      next();
    });
    return null;
  },
  admin(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(407).json({
        message: "Missing Authorization",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Not Authorized",
        });
      }
      if (decoded.isAdmin === false) {
        return res.status(401).json({
          message: "Not Authorized To Access this Site",
        });
      }
      req.userData = decoded;
      next();
      return null;
    });
  },
  user(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(407).json({
        message: "Missing Authorization",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Not Authorized",
        });
      }
      if (decoded.type !== "client") {
        return res.status(401).json({
          message: "Not Authorized To Access this Site",
        });
      }
      if (req.params.email) {
        
        if (req.params.email !== decoded.email) {
          return res.status(401).json({
            message: "UnAuthorized User",
          });
        }
      }
      if (req.params.accountNumber) {
        if (data.findAccountByAccountNumber(req.params.accountNumber).owner !== decoded.id) {
          return res.status(401).json({
            message: "UnAuthorized User",
          });
        }
      }
      if (req.params.transactionId) {
        if (data.findTransactionById(req.params.transactionId).accountNumber !== data.findAccountByEmail(decoded.email).accountNumber) {
          return res.status(401).json({
            message: "UnAuthorized User",
          });
        }
      }


      req.userData = decoded;
      next();
      return null;
    });
  },
};
