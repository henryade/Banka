"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _validation = _interopRequireDefault(require("../middleware/validation"));

var _authorization = _interopRequireDefault(require("../middleware/authorization"));

var _dbValidation = _interopRequireDefault(require("../middleware/dbValidation"));

var _uploadImage = _interopRequireDefault(require("../utils/uploadImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/auth/signup", _validation["default"].signUp, _dbValidation["default"].checkUser, _userController["default"].signup);
router.post("/auth/signin", _validation["default"].signIn, _dbValidation["default"].signin, _userController["default"].signin);
router.post("/auth/reset", _validation["default"].forgotPassword, _dbValidation["default"].uploadImage, _userController["default"].reset);
router.post("/auth/forgotPassword", _validation["default"].reset, _dbValidation["default"].uploadImage, _userController["default"].forgotPassword);
router.get("/auth/passwordreset/:token/forgot?", _userController["default"].passwordReset);
router.post("/upload", _authorization["default"].basicAuth, _dbValidation["default"].uploadImage, _uploadImage["default"].uploadImage);
var _default = router;
exports["default"] = _default;