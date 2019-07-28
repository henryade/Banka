"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var errors = function errors(res, error, fieldString) {
  var field = fieldString.replace(/([A-Z])/g, " $1").toLowerCase();

  switch (error.type) {
    case "any.required":
      return res.status(400).json({
        status: 400,
        error: "".concat(field, " is required")
      });

    case "string.regex.base":
      return res.status(400).json({
        status: 400,
        error: "".concat(field, " has invalid parameters")
      });

    case "string.email":
      return res.status(400).json({
        status: 400,
        error: "Invalid ".concat(field)
      });

    case "object.allowUnknown":
      return res.status(400).json({
        status: 400,
        error: error.message.replace(/[^\w|\s]/g, "")
      });

    case "string.min":
      return res.status(400).json({
        status: 400,
        error: "Invalid ".concat(field, " .")
      });

    case "string.max":
      return res.status(400).json({
        status: 400,
        error: "Invalid ".concat(field)
      });

    case "number.min":
      return res.status(400).json({
        status: 400,
        error: "Invalid ".concat(field)
      });

    case "number.max":
      return res.status(400).json({
        status: 400,
        error: "Invalid ".concat(field)
      });

    case "number.base":
      return res.status(400).json({
        status: 400,
        error: "Invalid ".concat(field)
      });

    case "any.allowOnly":
      if (field === "status") {
        return res.status(404).json({
          status: 404,
          error: "Invalid ".concat(field)
        });
      }

      return res.status(400).json({
        status: 400,
        error: "".concat(field, " does not match expected value.")
      });

    default:
      return res.status(400).json({
        status: 400,
        error: "".concat(field, " contains incorrect parameters")
      });
  }
};

var _default = errors;
exports["default"] = _default;