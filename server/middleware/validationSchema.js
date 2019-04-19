import Joi from "joi";

const currentDate = new Date();
const minimumAge = 14;
const day = currentDate.getDate();
const month = 12;
const year = currentDate.getFullYear() - minimumAge;


module.exports = {
  name: Joi.string().regex(/^[A-Za-z][^0-9]+$/).min(2).max(15)
    .required(),
  email: Joi.string().email().regex(/^.+[.]\w{2,3}$/).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{7,15}$/).required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
  phoneNumber: Joi.string().regex(/^234[7-9][0-1][0-9]+$/).length(13).required(),
  dob: Joi.date().min("01-01-1919").max(`${month}-${day}-${year}`).required(),
  balance: Joi.number().positive().max(2000000).required(),
  address: Joi.string().required(),
  cashier: Joi.number().integer().min(10000).positive()
    .max(19999)
    .required(),
  accountNumber: Joi.number().integer().positive().min(9000000001)
    .max(9999999999)
    .required(),
  amount: Joi.number().positive().min(10).max(2000000)
    .required(),
  type: Joi.string().valid(["savings", "current", "fixed", "fixed deposit", "joint"]).lowercase().required(),
  gender: Joi.string().valid(["M", "F", "MALE", "FEMALE"]).uppercase().required(),
};
