import dbs from "../models/db/db";
import { DBQUERY } from "../models/controller";

export const generateRandomPassword = () => {
  const randomPassword = [];
  for (let i = 0; i < 5; i += 1) {
    randomPassword.push(String.fromCharCode(Math.ceil(Math.random() * 25) + 97));
    randomPassword.push(Math.ceil(Math.random() * 10));
  }
  return randomPassword.join("");
};

export const generateAccountNumber = () => {
  const lengthOfAccountNumber = 999999;
  let bankAccountNumberBranding = 9000000000;
  let uniqueNumber = bankAccountNumberBranding + Math.floor(Math.random() * lengthOfAccountNumber);
  // let count = 0;
  // console.log(dbs.queryDb(DBQUERY.SELECT.CHECK([uniqueNumber])))
  // if (dbs.queryDb(DBQUERY.SELECT.CHECK([uniqueNumber]))) {
  //   uniqueNumber = bankAccountNumberBranding + Math.floor(Math.random() * lengthOfAccountNumber);
  //   if (count > 1) {
  //     bankAccountNumberBranding += count > 2 ? 100000 + (count ** 16) : 100000;
  //   }
  //   count += 1;
  // }
  return uniqueNumber;
};

export const generateId = (type) => {
  if (type === "client") {
    return Math.ceil(Math.random() * 2000) + 30000;
  }
  if (type === "staff") {
    return Math.ceil(Math.random() * 200) + 20000;
  }
  if (type === "admin") {
    return Math.ceil(Math.random() * 200) + 10000;
  }
  return Math.ceil(Math.random() * 200) + 100000;
};
