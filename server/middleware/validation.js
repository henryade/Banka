import Joi from "joi";
import check from "./validationSchema";
import customErrors from "./validationErrors";

const footer = (req, res, schema, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return customErrors(res, result.error.details[0], result.error.details[0].context.label);
  }
  next();
};

const logic = (req, res, next) => {
  const schema = Joi.object().keys({
    accountNumber: check.accountNumber,
  });
  const result = Joi.validate(req.params, schema);
  if (result.error) {
    return customErrors(res, result.error.details[0], result.error.details[0].context.label);
  }
  next();
};

const transactionLogic = (req, res, next) => {
  const schema = Joi.object().keys({
    amount: check.amount,
    depositor: check.name,
    depositorPhoneNumber: check.phoneNumber,
  });
  footer(req, res, schema, next);
};

module.exports = {
  signUp(req, res, next) {
    const schema = Joi.object().keys({
      firstName: check.name,
      lastName: check.name,
      email: check.email,
      password: check.password,
      confirmPassword: check.confirmPassword,
    });

    footer(req, res, schema, next);
  },

  signIn(req, res, next) {
    const schema = Joi.object().keys({
      email: check.email,
      password: check.password,
    });
    footer(req, res, schema, next);
  },

  createAccount(req, res, next) {
    const schema = Joi.object().keys({
      email: check.email,
      openingBalance: check.balance,
      type: check.type,
    });
    footer(req, res, schema, next);
  },

  changeAccountStatus(req, res, next) {
    logic(req, res, next);
  },

  deleteAccount(req, res, next) {
    logic(req, res, next);
  },
  creditAccount(req, res, next) {
    transactionLogic(req, res, next);
  },
  debitAccount(req, res, next) {
    transactionLogic(req, res, next);
  },
  allAccount(req, res, next) {
    const schema = Joi.object().keys({
      status: check.status,
    });
    const result = Joi.validate(req.query, schema);
    if (result.error) {
      return customErrors(res, result.error.details[0], result.error.details[0].context.label);
    }
    next();
  },
  email(req, res, next) {
    const schema = Joi.object().keys({
      email: check.email,
    });
    const result = Joi.validate(req.params, schema);
    if (result.error) {
      return customErrors(res, result.error.details[0], result.error.details[0].context.label);
    }
    next();
  },

  transaction(req, res, next) {
    const schema = Joi.object().keys({
      transactionId: check.cashier,
    });
    const result = Joi.validate(req.params, schema);
    if (result.error) {
      return customErrors(res, result.error.details[0], result.error.details[0].context.label);
    }
    next();
  },

  checkStaff(req, res, next) {
    const schema = Joi.object().keys({
      firstName: check.name,
      lastName: check.name,
      email: check.email,
      userType: check.userType,
    });
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return customErrors(res, result.error.details[0], result.error.details[0].context.label);
    }
    next();
  },

};
