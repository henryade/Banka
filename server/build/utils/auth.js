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

var generateId = exports.generateId = function generateId(type) {
  if (type === "client") {
    return Math.ceil(Math.random() * 2000) + 30000;
  }
  if (type === "staff") {
    return Math.ceil(Math.random() * 200) + 20000;
  }
  return Math.ceil(Math.random() * 200) + 10000;
};