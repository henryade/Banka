"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var errors = function errors(res, error, fieldString) {
  var field = fieldString.replace(/([A-Z])/g, " $1").toLowerCase();
  switch (error.type) {
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

      return res.status(400).json({
        status: 400,
        error: "Invalid " + field
      });
    case "number.max":
      return res.status(400).json({
        status: 400,
        error: "Invalid " + field
      });
    case "number.base":
      return res.status(400).json({
        status: 400,
        error: "Invalid " + field
      });
    case "any.allowOnly":
      if (field === "status") {
        return res.status(404).json({
          status: 404,
          error: "Invalid " + field
        });
      }
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