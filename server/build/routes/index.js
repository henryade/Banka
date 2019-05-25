"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _userController = require("../controllers/userController");

var _userController2 = _interopRequireDefault(_userController);

var _validation = require("../middleware/validation");

var _validation2 = _interopRequireDefault(_validation);

var _authorization = require("../middleware/authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _dbValidation = require("../middleware/dbValidation");

var _dbValidation2 = _interopRequireDefault(_dbValidation);

var _uploadImage = require("../utils/uploadImage");

var _uploadImage2 = _interopRequireDefault(_uploadImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/auth/signup", _validation2.default.signUp, _dbValidation2.default.checkUser, _userController2.default.signup);
router.post("/auth/signin", _validation2.default.signIn, _dbValidation2.default.signin, _userController2.default.signin);
router.post("/auth/reset", _validation2.default.forgotPassword, _dbValidation2.default.uploadImage, _userController2.default.reset);
router.post("/auth/forgotPassword", _validation2.default.reset, _dbValidation2.default.uploadImage, _userController2.default.forgotPassword);
router.get("/auth/passwordreset/:token/forgot?", _userController2.default.passwordReset);
router.post("/upload", _authorization2.default.basicAuth, _dbValidation2.default.uploadImage, _uploadImage2.default.uploadImage);

exports.default = router;