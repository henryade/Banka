import Joi from "joi";

const currentDate = new Date();
const minimumAge = 14;
const day = currentDate.getDate();
const month = 12;
const year = currentDate.getFullYear() - minimumAge;


const SchemaObject = {
  name: Joi.string().trim().regex(/^[A-Za-z][^0-9]+$/).min(3)
    .max(25)
    .required(),
  email: Joi.string().trim().email().regex(/^.+[.]\w{2,3}$/)
    .required(),
  password: Joi.string().trim().min(7).regex(/.{7,}$/)
    .required(),
  confirmPassword: Joi.string().trim().min(7).valid(Joi.ref("password"))
    .required(),
  phoneNumber: Joi.string().trim().regex(/^234[7-9][0-1][0-9]+$/).length(13)
    .required(),
  dob: Joi.date().min("01-01-1919").max(`${month}-${day}-${year}`).required(),
  balance: Joi.number().positive().max(2000000).required(),
  address: Joi.string().trim().max(50).required(),
  cashier: Joi.number().integer().positive().min(1)
    .max(19999)
    .required(),
  accountNumber: Joi.number().integer().positive().min(9000000001)
    .max(9999999999)
    .required(),
  amount: Joi.number().positive().min(100).max(10000000)
    .required(),
  type: Joi.string().trim().valid(["savings", "current", "fixed", "fixed deposit", "joint"]).lowercase()
    .required(),
  userType: Joi.string().trim().valid(["admin", "staff"]).lowercase()
    .required(),
  status: Joi.string().trim().valid(["active", "dormant"]).lowercase(),
};

export default SchemaObject;
