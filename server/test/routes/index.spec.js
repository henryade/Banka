import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import data from "../../controllers/dbController";
import app from "../../app";

chai.use(chaiHttp);

describe("Sign in test", () => {
  const endpoint = "/api/v1/auth/signin";
  it("should not login a user when there are no parameters", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({})
      .end((err, response) => {
        expect(response).have.a.status(400);
      });
    done();
  });

  it("should not login a user when the email is missing", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        password: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.text).to.include("email is required");
      });
    done();
  });


  it("should not login a user when the password is missing", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "user5@gmail.com",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.text).to.include("password is required");
      });
    done();
  });

  it("'should login a user when all the parameters are given", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "user5@gmail.com",
        password: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(200);
        expect(response.body).to.have.property("data");
      });
    done();
  });

  it("should not login a user with wrong credentials", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "user1@gmail.com",
        password: "password",
        name: "fdkjnjn",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("name is not allowed");
      });
    done();
  });

  it("should not login a user with wrong credentials-email", (done) => {
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
    done();
  });
  it("should not be able to login with wrong credentials-password", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "user5@gmail.com",
        password: "pasword",
      })
      .end((error, response) => {
        expect(response).have.a.status(401);
        expect(response.body.error).to.equal("Auth failed");
      });
    done();
  });
  it("should generate token", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "user5@gmail.com",
        password: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(200);
        expect(response.body.data).to.have.property("token");
      });
    done();
  });
  it("should signin staff", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        email: "staff5@gmail.com",
        password: "staff0001",
      })
      .end((error, response) => {
        expect(response).have.a.status(200);
        expect(response.body.data).to.have.property("token");
      });
    done();
  });
});


describe("Sign up test", () => {
  const endpoint = "/api/v1/auth/signup";
  it("should not signup a user when there are no parameters", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({})

      .end((error, response) => {
        expect(response).have.a.status(400);
      });
    done();
  });

  it("should not register a user when the email is missing", (done) => {
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
        expect(response.text).to.include("email is required");
      });
    done();
  });

  it("should not register a user when the email already exist", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "Nme",
        email: "user5@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.body.error).to.equal("email already exist");
      });
    done();
  });

  it("should not register a user when the password is missing", (done) => {
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
        expect(response.text).to.include("password is required");
      });
    done();
  });

  it("should not register a user when the first name is invalid", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "SThdfghdbjdkhbfjdhsjhbsjhvsbjhbvdjslshbjkdhbskhbvdkjbvfdhbjdird",
        lastName: "Gone",
        email: "user2@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.text).to.include("Invalid first name");
      });
    done();
  });

  it("should not register a user when the last name is invalid", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "SThird",
        lastName: "iS",
        email: "sdf@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.text).to.include("Invalid last name");
      });
    done();
  });
  it("should not register a user when the first name is missing", (done) => {
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
        expect(response.text).to.include("first name is required");
      });
    done();
  });

  it("should not register a user when the last name is missing", (done) => {
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
        expect(response.text).to.include("last name is required");
      });
    done();
  });

  it("should not register a user when the the passwords dont match", (done) => {
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
        expect(response).have.a.status(400);
        expect(response.body.error).to.include("confirm password does not match expected value");
      });
    done();
  });

  it("should not register a user when the confirm password is not given", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Fourth",
        lastName: "wskjf",
        email: "user3@gmail.com",
        password: "password",
      })
      .end((error, response) => {
        expect(response).have.a.status(400);
        expect(response.text).to.include("confirm password is required");
      });
    done();
  });

  it("'should register a new user when all the parameters are given", (done) => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Forth",
        lastName: "Desth",
        email: "user90@gmail.com",
        password: "password",
        confirmPassword: "password",
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.data).to.have.property("id");
      });
    done();
  });
});
