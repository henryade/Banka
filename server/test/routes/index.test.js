import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

chai.use(chaiHttp);

describe("Sign in test", () => {
  const endpoint = "/api/v1/auth/signin";
  it("should not login a user when there are no parameters", () => {
    chai.request(app)
      .post(endpoint)
      .send({})
      .end((err, response) => {
        expect(response).have.a.status(400);
      });
  });

  it("should not login a user when the email is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        password: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("email is required");
      });
  });


  it("should not login a user when the password is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "user1@gmail.com",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("password is required");
      });
  });

  it("'should login a user when all the parameters are given", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "user1@gmail.com",
        password: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(200);
        expect(response.body).to.have.property("data");
      });
  });
  it("should not login a user with wrong credentials-email", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "use@gmail.com",
        password: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(401);
        expect(response.body.error).to.equal("Auth failed");
      });
  });
  it("should not be able to login with wrong credentials-password", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "user1@gmail.com",
        password: "pasword",
      })
      .end((error, response) => {
        expect(response).have.a.status(401);
        expect(response.body.error).to.equal("Auth failed");
      });
  });
  it("should generate token", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "user1@gmail.com",
        password: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(200);
        expect(response.body.data).to.have.property("token");
      });
  });
});


describe("Sign up test", () => {
  const endpoint = "/api/v1/auth/signup";
  it("should not signup a user when there are no parameters", () => {
    chai.request(app)
      .post(endpoint)
      .send({})

      .end((error, response) => {
        expect(response).have.a.status(400);
      });
  });

  it("should not register a user when the email is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "Name",
        password: "password",
        confirmPassword: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("email is required");
      });
  });

  it("should not register a user when the email already exist", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("email already exist");
      });
  });

  it("should not register a user when the password is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "BAse",
        email: "user2@gmail.com",
        confirmPassword: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("password is required");
      });
  });

  it("should not register a user when the first name is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        lastName: "Gone",
        email: "user2@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("first name is required");
      });
  });

  it("should not register a user when the last name is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "SThird",
        email: "sdf@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("last name is required");
      });
  });

  it("should not register a user when the the passwords dont match", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "Game",
        email: "user2@gmail.com",
        password: "password",
        confirmPassword: "pasword",
      })
      .end((error, response) => {
        expect(response).have.a.status(401);
        expect(response.body.error).to.equal("passwords do not match");
      });
  });

  it("should not register a user when the confirm password is not given", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Fourth",
        lastName: "wskjf",
        email: "user3@gmail.com",
        password: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(401);
        expect(response.body.error).to.equal("passwords do not match");
      });
  });

  it("'should register a new user when all the parameters are given", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Forth",
        lastName: "Desth",
        email: "user3@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.data).to.have.property("token");
        expect(response.body.data).to.have.property("id");
      });
  });
});