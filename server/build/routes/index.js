"use strict";

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/auth/signup", _userController["default"].signup);
router.post("/auth/signin", _userController["default"].signin);
module.exports = router;