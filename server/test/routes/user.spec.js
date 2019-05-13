import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../../app";


chai.use(chaiHttp);

let token = null;
let token1 = null;
let token2 = null;
let token3 = null;
let token4 = null;

before(() => {
  token = jwt.sign({
    email: "staff5@gmail.com",
    password: "staff0001",
  }, process.env.JWT_KEY);

  token1 = jwt.sign({
    email: "user20@gmail.com",
    password: "password",
    type: "client",
    isAdmin: false,
  }, process.env.JWT_KEY);

  token3 = jwt.sign({
    email: "user20gmail.com",
    password: "password",
    type: "client",
    isAdmin: false,
  }, process.env.JWT_KEY);

  token2 = jwt.sign({
    email: "user5@gmail.com",
    password: "password",
    type: "client",
    isAdmin: false,
  }, process.env.JWT_KEY);

  token4 = jwt.sign({
    email: "admin3@gmail.com",
    password: "staff0001",
    type: "staff",
    isAdmin: true,
  }, process.env.JWT_KEY);
});

describe("Create Staff test", () => {
  const endpoint = "/api/v1/users";
  it("should not create staff when there are no parameters", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token4}`)
      .send({})
      .end((error, response) => {
        expect(response).have.a.status(400);
      });
    done();
  });

  it("should not create when the email already exist", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token4}`)
      .send({
        firstName: "Second",
        lastName: "Nme",
        email: "staff5@gmail.com",
        userType: "admin",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("email already exist");
      });
    done();
  });

  it("should not create when the first name is missing", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token4}`)
      .send({
        lastName: "Gone",
        email: "user2@gmail.com",
        userType: "admin",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.text).to.include("first name is required");
      });
    done();
  });

  it("should not create when the last name is missing", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token4}`)
      .send({
        firstName: "SThird",
        email: "sdf@gmail.com",
        userType: "admin",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.text).to.include("last name is required");
      });
    done();
  });


  it("'should not create staff if usertype is missing", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token4}`)
      .send({
        firstName: "Forth",
        lastName: "Desth",
        email: "user3@gmail.com",

      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("user type is required");
      });
    done();
  });

  it("'should create staff when all the parameters are given", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token4}`)
      .send({
        firstName: "Forth",
        lastName: "Dedth",
        email: "staff002@gmail.com",
        userType: "admin",
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("firstName");
        expect(response.body.data).to.have.property("lastName");
        expect(response.body.data).to.have.property("email");
      });
    done();
  });
  it("'should create staff when all the parameters are given", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token4}`)
      .send({
        firstName: "Forth",
        lastName: "Desth",
        email: "staff30@gmail.com",
        userType: "staff",
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("firstName");
        expect(response.body.data).to.have.property("lastName");
        expect(response.body.data).to.have.property("email");
      });
    done();
  });
});

describe("View all accounts by a user test", () => {
  it("should display accounts when there are no parameters", (done) => {
    chai.request(app)
      .get("/api/v1/user/user5@gmail.com/accounts")
      .set("authorization", `Bearer ${token2}`)
      .end((error, response) => {
        expect(response).have.a.status(200);
        expect(response.body.data).to.be.an("array");
        expect(response.body.data[0]).to.be.an("object");
      });
    done();
  });

  it("should not display if the email doesnt exist", (done) => {
    chai.request(app)
      .get("/api/v1/user/user20@gmail.com/accounts")
      .set("authorization", `Bearer ${token2}`)
      .end((error, response) => {
        expect(response).have.a.status(403);
        expect(response.body.message).to.equal("UnAuthorized User");
      });
    done();
  });

  it("should not display if the email doesnt exist", (done) => {
    chai.request(app)
      .get("/api/v1/user/user20@gmail.com/accounts")
      .set("authorization", `Bearer ${token1}`)
      .end((error, response) => {
        expect(response).have.a.status(404);
        expect(response.body.error).to.equal("Email not found");
      });
    done();
  });

  it("should not display if the email doesnt exist", (done) => {
    chai.request(app)
      .get("/api/v1/user/user20gmail.com/accounts")
      .set("authorization", `Bearer ${token3}`)
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("Invalid email");
      });
    done();
  });
});
