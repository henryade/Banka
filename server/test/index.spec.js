import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";
<<<<<<< HEAD
=======
import { generateRandomPassword } from "../utils/auth";
>>>>>>> ch-refactor-165853483
import "./routes/index.spec";
import "./routes/user.spec";
import "./routes/account.spec";
import "./routes/transaction.spec";

chai.use(chaiHttp);

describe("Other Route test", () => {
  it("should be able to see a home route", (done) => {
    chai.request(app)
      .get("/")
      .end((err, response) => {
        expect(response).have.a.status(200);
        expect(response.text).to.equal("Home Page");
      });
    done();
  });
  it("should be throw flag on a wrong route", (done) => {
    chai.request(app)
      .get("/api/v3/reqee")
      .end((err, response) => {
        expect(response).have.a.status(404);
        expect(response.text).to.include("Page Not Found");
      });
    done();
<<<<<<< HEAD
=======
  });
});

describe("Function test", () => {
  it("generate password function", (done) => {
    const password = generateRandomPassword();
    expect(password).to.be.a("string");
    expect(password.length).to.be.above(9);
    done();
>>>>>>> ch-refactor-165853483
  });
});
