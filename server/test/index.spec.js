import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import data from "../controllers/dbController";
import app from "../app";
import isLoggedIn from "../middleware/authorization";

chai.use(chaiHttp);

describe("Other Route test", () => {
  it("should be able to see a home route", () => {
    chai.request(app)
      .get("/")
      .end((err, response) => {
        expect(response).have.a.status(200);
        expect(response.text).to.equal("Home Page");
      });
  });
  it("should be able to see a home route", () => {
    chai.request(app)
      .get("/*")
      .end((err, response) => {
        expect(response).have.a.status(200);
        expect(response.text).to.equal("Banka - Invalid Route ");
      });
  });
  it("should be able to see a home route", () => {
    chai.request(app)
      .post("/*")
      .end((err, response) => {
        expect(response).have.a.status(200);
        expect(response.text).to.equal("Banka - Invalid Route ");
      });
  });
  it("should be able to see a home route", () => {
    chai.request(app)
      .put("/*")
      .end((err, response) => {
        expect(response).have.a.status(200);
        expect(response.text).to.equal("Banka - Invalid Route ");
      });
  });
  it("should be able to see a home route", () => {
    chai.request(app)
      .patch("/*")
      .end((err, response) => {
        expect(response).have.a.status(200);
        expect(response.text).to.equal("Banka - Invalid Route ");
      });
  });
  it("should be able to see a home route", () => {
    chai.request(app)
      .delete("/*")
      .end((err, response) => {
        expect(response).have.a.status(200);
        expect(response.text).to.equal("Banka - Invalid Route ");
      });
  });
});
