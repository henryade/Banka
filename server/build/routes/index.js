"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _userController = require("../controllers/userController");

var _userController2 = _interopRequireDefault(_userController);

var _validation = require("../middleware/validation");

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/auth/signup", _validation2.default.signUp, _userController2.default.signup);
router.post("/auth/signin", _validation2.default.signIn, _userController2.default.signin);

module.exports = router;