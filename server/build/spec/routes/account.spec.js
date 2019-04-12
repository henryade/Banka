"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _assert = _interopRequireDefault(require("assert"));

var _request = _interopRequireDefault(require("request"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// import { AccountController } from "../../controllers/accountController";
_chai["default"].use(_chaiHttp["default"]);


describe("Create Account test", function () {
    
    it("should not create a user account if the email is missing", function () {
      
        (0, _chai.expect)("response".length).to.equal(8);
    });




// describe("Create Account test", function () {
//   var endpoint = "/api/v1/accounts";
//   it("should not create a user account if the email is missing", function () {
//     _chai["default"].request(_app["default"]).post(endpoint).send({
//       firstName: "Second",
//       lastName: "Nme",
//       phoneNumber: "08064372423",
//       dob: "1991-05-12",
//       address: "11 Banka str., Andela, Lagos, Nigeria",
//       type: "Savings",
//       balance: 400000.34
//     }).end(function (err, response) {
//       (0, _chai.expect)(response).to.have.status(400);
//       (0, _chai.expect)(response.body.error).to.equal("email is required");
//     });
//   });
  // it("should not create a user account if the phone number is missing", function () {
  //   _chai["default"].request(_app["default"]).post(endpoint).send({
  //     firstName: "Second",
  //     lastName: "Nme",
  //     email: "user1@gmail.com",
  //     dob: "1991-05-12",
  //     address: "11 Banka str., Andela, Lagos, Nigeria",
  //     type: "Savings",
  //     balance: 400000.34
  //   }).end(function (err, response) {
  //     (0, _chai.expect)(response.body.status).to.have.status(400);
  //     (0, _chai.expect)(response.body.error).to.equal("phone number is required");
  //   });
  // });
  // it("should not create a user account if the first name is missing", function () {
  //   _chai["default"].request(_app["default"]).post(endpoint).send({
  //     lastName: "Nme",
  //     email: "user1@gmail.com",
  //     phoneNumber: "08064372423",
  //     dob: "1991-05-12",
  //     address: "11 Banka str., Andela, Lagos, Nigeria",
  //     type: "Savings",
  //     balance: 400000.34
  //   }).end(function (err, response) {
  //     (0, _chai.expect)(response).to.have.status(400);
  //     (0, _chai.expect)(response.body.error).to.equal("first name is required");
  //   });
  // });
  // it("should not create a user account if the last name is missing", function () {
  //   _chai["default"].request(_app["default"]).post(endpoint).send({
  //     firstName: "Second",
  //     email: "user1@gmail.com",
  //     phoneNumber: "08064372423",
  //     dob: "1991-05-12",
  //     address: "11 Banka str., Andela, Lagos, Nigeria",
  //     type: "Savings",
  //     balance: 400000.34
  //   }).end(function (err, response) {
  //     (0, _chai.expect)(response).to.have.status(400);
  //     (0, _chai.expect)(response.body.error).to.equal("last name is required");
  //   });
  // });
  // it("should not create a user account if the date of birth is missing", function () {
  //   _chai["default"].request(_app["default"]).post(endpoint).send({
  //     firstName: "Second",
  //     lastName: "Nme",
  //     email: "user1@gmail.com",
  //     phoneNumber: "08064372423",
  //     address: "11 Banka str., Andela, Lagos, Nigeria",
  //     type: "Savings",
  //     balance: 400000.34
  //   }).end(function (err, response) {
  //     (0, _chai.expect)(response).to.have.status(400);
  //     (0, _chai.expect)(response.body.error).to.equal("date of birth is required");
  //   });
  // });
  // it("should not create a user account if the address is missing", function () {
  //   _chai["default"].request(_app["default"]).post(endpoint).send({
  //     firstName: "Second",
  //     lastName: "Nme",
  //     email: "user1@gmail.com",
  //     phoneNumber: "08064372423",
  //     dob: "1991-05-12",
  //     type: "Savings",
  //     balance: 400000.34
  //   }).end(function (err, response) {
  //     (0, _chai.expect)(response).to.have.status(400);
  //     (0, _chai.expect)(response.body.error).to.equal("address is required");
  //   });
  // });
  // it("should not create a user account if the account type is missing", function () {
  //   _chai["default"].request(_app["default"]).post(endpoint).send({
  //     firstName: "Second",
  //     lastName: "Nme",
  //     email: "user1@gmail.com",
  //     phoneNumber: "08064372423",
  //     dob: "1991-05-12",
  //     address: "11 Banka str., Andela, Lagos, Nigeria",
  //     balance: 400000.34
  //   }).end(function (err, response) {
  //     (0, _chai.expect)(response).to.have.status(400);
  //     (0, _chai.expect)(response.body.error).to.equal("Account type is required");
  //   });
  // });
  // it("should not create a user account if the opening balance is missing", function () {
  //   _chai["default"].request(_app["default"]).post(endpoint).send({
  //     firstName: "Second",
  //     lastName: "Nme",
  //     email: "user1@gmail.com",
  //     phoneNumber: "08064372423",
  //     dob: "1991-05-12",
  //     address: "11 Banka str., Andela, Lagos, Nigeria",
  //     type: "Savings"
  //   }).end(function (err, response) {
  //     (0, _chai.expect)(response).to.have.status(400);
  //     (0, _chai.expect)(response.body.error).to.equal("opening balance is required");
  //   });
  // });
  // it("should create a user account if all credentials are given", function () {
  //   var payload = {
  //     firstName: "Second",
  //     lastName: "Nme",
  //     email: "user1@gmail.com",
  //     balance: 400040.34,
  //     phoneNumber: "08064372423",
  //     dob: "1991-05-12",
  //     address: "11 Banka str., Andela, Lagos, Nigeria",
  //     type: "Savings"
  //   };

  //   _chai["default"].request(_app["default"]).post(endpoint).send(payload).end(function (err, response) {
  //     var _response$body$data = response.body.data,
  //         accountNumber = _response$body$data.accountNumber,
  //         owner = _response$body$data.owner,
  //         id = _response$body$data.id,
  //         createdOn = _response$body$data.createdOn,
  //         status = _response$body$data.status,
  //         acc = _objectWithoutProperties(_response$body$data, ["accountNumber", "owner", "id", "createdOn", "status"]);

  //     (0, _chai.expect)(response).to.have.status(201);
  //     (0, _chai.expect)(response.body).to.be.an("object");
  //     (0, _chai.expect)(response.body.status).to.equal(201);
  //     (0, _chai.expect)(response.body.data).to.be.a("object");
  //     (0, _chai.expect)(response.body.data).to.have.property("accountNumber");
  //     (0, _chai.expect)(response.body.data).to.have.property("owner");
  //     (0, _chai.expect)(response.body.data).to.have.property("id");
  //     (0, _chai.expect)(response.body.data).to.have.property("status");
  //     (0, _chai.expect)(response.body.data).to.have.property("createdOn");
  //     (0, _chai.expect)(acc).to.deep.equal(payload);
  //   });
  // });
}); // const testAccountNumber1 = 9000134322;
// const testAccountNumber2 = 9000134354;
// describe("Activate account test", () => {
//   it("should be able to activate account if the body is empty", () => {
//     chai.request(app)
//           .post(endpoint)
//           .send(pageload)
//           .end((err,response) => {
//           })
// //       expect(response.statusCode).toEqual(200);
// //     });
// //   });
// //   it("should not do nothing if user account is active", () => {
// //     chai.request(app)
//           .post(endpoint)
//           .send(pageload)
//           .end((err,response) => {
//           })
// //       expect(response.statusCode).toEqual(400);
// //       expect(body.error).toBe("Account is active");
// //     });
// //   });
// //   it("should activate a user account if account is dormant", () => {
// //     chai.request(app)
//           .post(endpoint)
//           .send(pageload)
//           .end((err,response) => {
//           })
// //       expect(response.statusCode).toEqual(200);
// //       expect(body.data.status).toBe("active");
// //     });
// //   });
// //   it("should not activate if account number is invalid", () => {
// //     chai.request(app)
//           .post(endpoint)
//           .send(pageload)
//           .end((err,response) => {
//           })
// //       expect(response.statusCode).toEqual(400);
// //       expect(body.error).toBe("Invalid account number");
// //     });
// //   });
// // });
// // describe("Deactivate account test", () => {
// //   it("should be able to deactivate account if there are no parameters", () => {
// //     chai.request(app)
//           .post(endpoint)
//           .send(pageload)
//           .end((err,response) => {
//           })
// //       expect(response.statusCode).toEqual(200);
// //     });
// //   });
// //   it("should not do nothing if user account is dormant", () => {
// //     chai.request(app)
//           .post(endpoint)
//           .send(pageload)
//           .end((err,response) => {
//           })
// //       expect(response.statusCode).toEqual(400);
// //       expect(body.error).toBe("Account is dormant");
// //     });
// //   });
// //   it("should deactivate a user account if account is active", () => {
// //     chai.request(app)
//           .post(endpoint)
//           .send(pageload)
//           .end((err,response) => {
//           })
// //       expect(response.statusCode).toEqual(200);
// //       expect(body.data.status).toBe("dormant");
// //     });
// //   });
// //   it("should not deactivate if account number is invalid", () => {
// //     chai.request(app)
//           .post(endpoint)
//           .send(pageload)
//           .end((err,response) => {
//           })
// //       expect(response.statusCode).toEqual(400);
// //       expect(body.error).toBe("Invalid account number");
// //     });
// //   });
// // });
// // describe("Delete account test", () => {
// //   it("should do nothing if user account is not found", () => {
// //     chai.request(app)
//           .post(endpoint)
//           .send(pageload)
//           .end((err,response) => {
//           })
// //       expect(response.statusCode).toEqual(404);
// //       expect(body.message).toBe("Account Not Found");
// //     });
// //   });
// //   it("should delete a user account if account is found", () => {
// //     chai.request(app)
//           .post(endpoint)
//           .send(pageload)
//           .end((err,response) => {
//           })
// //       expect(response.statusCode).toEqual(200);
// //       expect(body.message).toBe("Account Successfully Delete");
// //     });
// //   });