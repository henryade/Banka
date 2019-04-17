"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var errors = function errors(res, error, fieldString) {
  // console.log(fieldString)
  var field = fieldString.replace(/([A-Z])/g, " $1").toLowerCase();
  if (fieldString === "dob") {
    field = fieldString.replace("dob", "date of birth");
  }
  switch (error.type) {
    case "any.empty":
      return res.status(400).json({
        status: 400,
        error: field + " should not be empty"
      });
    case "any.required":
      return res.status(400).json({
        status: 400,
        error: field + " is required"
      });

    case "string.regex.base":
      return res.status(400).json({
        status: 400,
        error: field + " has invalid parameters"
      });

    case "string.email":
      return res.status(400).json({
        status: 400,
        error: "Invalid " + field
      });

    case "object.allowUnknown":
      return res.status(400).json({
        status: 400,
        error: error.message.replace(/[^\w|\s]/g, "")
      });
    case "string.length":
      return res.status(400).json({
        status: 400,
        error: error.message.replace(/[^\w|\s]/g, "")
      });

    case "string.min":
      return res.status(400).json({
        status: 400,
        error: "Invalid " + field + " ."
      });
    case "string.max":
      return res.status(400).json({
        status: 400,
        error: "Invalid " + field
      });
    case "number.min":
      var msg = field === "account number" ? "Invalid account number" : field + " should be at least " + error.context.limit + " characters long.";
      return res.status(400).json({
        status: 400,
        error: msg
      });
    case "number.max":
      var msg1 = field === "account number" ? "Invalid account number" : field + " should be at most " + error.context.limit + " characters long.";
      return res.status(400).json({
        status: 400,
        error: msg1
      });
    case "number.base":
      var msg2 = field === "account number" ? "Invalid account number" : field + " should be at most " + error.context.limit + " characters long.";
      return res.status(400).json({
        status: 400,
        error: msg2
      });
    case "any.allowOnly":
      return res.status(400).json({
        status: 400,
        error: field + " does not match expected value."
      });

    default:
      return res.status(400).json({
        status: 400,
        error: field + " contains incorrect parameters"
      });
  }
};

exports.default = errors;