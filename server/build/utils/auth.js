"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var generateRandomPassword = exports.generateRandomPassword = function generateRandomPassword() {
  var randomPassword = [];
  for (var i = 0; i < 5; i += 1) {
    randomPassword.push(String.fromCharCode(Math.ceil(Math.random() * 25) + 97));
    randomPassword.push(Math.ceil(Math.random() * 10));
  }
  return randomPassword.join("");
};

var generateAccountNumber = exports.generateAccountNumber = function generateAccountNumber() {
  var lengthOfAccountNumber = 999999;
  var bankAccountNumberBranding = 9000000000;
  var uniqueNumber = bankAccountNumberBranding + Math.floor(Math.random() * lengthOfAccountNumber);

  return uniqueNumber;
};