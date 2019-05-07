import jwt from "jsonwebtoken";
import data from "../controllers/dbController";

exports.staff = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Not Authorized",
      });
    }
    if (decoded.type !== "staff" || decoded.isAdmin !== false) {
      return res.status(403).json({
        status: 403,
        message: "Not Authorized To Access this Site",
      });
    }
    req.userData = decoded;
    next();
    return null;
  });
  return null;
};
exports.staff_admin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(407).json({
      status: 407,
      message: "Missing Authorization",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Not Authorized",
      });
    }
    if (decoded.type !== "staff") {
      return res.status(403).json({
        status: 403,
        message: "Not Authorized To Access this Site",
      });
    }
    req.userData = decoded;
    next();
    return null;
  });
  return null;
};
exports.admin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(407).json({
      status: 407,
      message: "Missing Authorization",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Not Authorized",
      });
    }
    if (decoded.isAdmin === false) {
      return res.status(403).json({
        status: 403,
        message: "Not Authorized To Access this Site",
      });
    }
    req.userData = decoded;
    next();
    return null;
  });
  return null;
};
exports.user = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(407).json({
      status: 407,
      message: "Missing Authorization",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Not Authorized",
      });
    }
    if (decoded.type !== "client") {
      return res.status(403).json({
        status: 403,
        message: "Not Authorized To Access this Site",
      });
    }
    if (req.params.email) {
      if (req.params.email !== decoded.email) {
        return res.status(403).json({
          status: 403,
          message: "UnAuthorized User",
        });
      }
    }
    if (req.params.accountNumber) {
      if (data.findAccountByAccountNumber(req.params.accountNumber).owner !== decoded.id) {
        return res.status(403).json({
          status: 403,
          message: "UnAuthorized User",
        });
      }
    }
    if (req.params.transactionId) {
      const transactionAccount = await data.findTransactionById(req.params.transactionId);
      if (transactionAccount === undefined) {
        return res.status(400).json({
          status: 400,
          error: "Invalid Transaction Id",
        });
      }
      const tokenAccount = await data.findAccountByEmail(decoded.email);
      if (transactionAccount.accountNumber
         !== tokenAccount[0].accountNumber) {
        return res.status(403).json({
          status: 403,
          message: "UnAuthorized User",
        });
      }
    }


    req.userData = decoded;
    next();
    return null;
  });
  return null;
};
