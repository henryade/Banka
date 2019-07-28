"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _auth = require("../utils/auth");

require("./routes/index.spec");

require("./routes/user.spec");

require("./routes/account.spec");

require("./routes/transaction.spec");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe("Other Route test", function () {
  it("should be able to see a home route", function (done) {
    _chai["default"].request(_app["default"]).get("/").end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.text).to.equal("Home Page");
    });

    done();
  });
  it("should be throw flag on a wrong route", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v3/reqee").end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(404);
      (0, _chai.expect)(response.text).to.include("Page Not Found");
    });

    done();
  });
});
describe("Function test", function () {
  it("generate password function", function (done) {
    var password = (0, _auth.generateRandomPassword)();
    (0, _chai.expect)(password).to.be.a("string");
    (0, _chai.expect)(password.length).to.be.above(9);
    done();
  });
});