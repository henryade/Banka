"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _userController = require("../controllers/userController");

var _userController2 = _interopRequireDefault(_userController);

var _authorization = require("../middleware/authorization");

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/auth/signup", _userController2.default.signup);
router.post("/auth/signin", _authorization2.default, _userController2.default.signin);

module.exports = router;