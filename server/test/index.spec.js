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
  it("should be throw flag on a wrong route", () => {
    chai.request(app)
      .get("/api/v3/reqee")
      .end((err, response) => {
        expect(response).have.a.status(404);
        expect(response.text).to.include("Page Not Found");
      });
  });
});
