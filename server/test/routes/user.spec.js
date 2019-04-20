import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../app";


chai.use(chaiHttp);

describe("Create Staff test", () => {
  const endpoint = "/api/v1/users";
  it("should not create staff when there are no parameters", () => {
    chai.request(app)
      .post(endpoint)
      .send({})

      .end((error, response) => {
        expect(response).have.a.status(400);
      });
  });

  it("should not create when the email already exist", () => {
    chai.request(app)
      .post(endpoint)
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
  });

  it("should not create when the first name is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        lastName: "Gone",
        email: "user2@gmail.com",
        userType: "admin",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.text).to.include("first name is required");
      });
  });

  it("should not create when the last name is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "SThird",
        email: "sdf@gmail.com",
        userType: "admin",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.text).to.include("last name is required");
      });
  });


  it("'should not create staff if usertype is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Forth",
        lastName: "Desth",
        email: "user3@gmail.com",

      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("user type is required");
      });
  });

  it("'should create staff when all the parameters are given", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Forth",
        lastName: "Desth",
        email: "staff1@gmail.com",
        userType: "admin",
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.data).to.have.property("token");
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("firstName");
        expect(response.body.data).to.have.property("lastName");
        expect(response.body.data).to.have.property("email");

      });
  });
  it("'should create staff when all the parameters are given", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Forth",
        lastName: "Desth",
        email: "staff3@gmail.com",
        userType: "staff",
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.data).to.have.property("token");
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("firstName");
        expect(response.body.data).to.have.property("lastName");
        expect(response.body.data).to.have.property("email");

      });
  });
});

describe("View all accounts by a user test", () => {
  it("should display accounts when there are no parameters", () => {
    chai.request(app)
      .get("/api/v1/user/user1@gmail.com/accounts")

      .end((error, response) => {
        expect(response).have.a.status(200);
        expect(response.body.data).to.be.an("array");
        expect(response.body.data[0]).to.be.an("object");
      });
  });

  it("should not display if the email doesnt exist", () => {
    chai.request(app)
      .get("/api/v1/user/user20@gmail.com/accounts")
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("Email not found");
      });
  });
});
