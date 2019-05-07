import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../../app";

chai.use(chaiHttp);

const activeAccount = "9000134322";
const dormantAccount = 9000134354;
const wrongAccount = 900013432;
const wrongAccount2 = 9000134392;
const wrongAccount1 = 900013439201;

let token = null;
let token2 = null;

before(() => {
  token = jwt.sign({
    email: "staff5@gmail.com",
    password: "staff0001",
    type: "staff",
    isAdmin: false,
  }, process.env.JWT_KEY);

  token2 = jwt.sign({
    email: "user5@gmail.com",
    password: "password",
    type: "client",
    isAdmin: false,
  }, process.env.JWT_KEY);
});

<<<<<<< HEAD

=======
>>>>>>> ch-refactor-165853483
describe("View all bank account test", () => {
  it("should return all accounts in the database", (done) => {
    chai.request(app)
      .get("/api/v1/accounts")
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data).to.be.an("array");
        expect(response.body.data[0]).to.be.an("object");
      });
    done();
<<<<<<< HEAD
=======
  });
  it("should not return all accounts in the database if the user is unauthorised", (done) => {
    chai.request(app)
      .get("/api/v1/accounts")
      .set("authorization", `Bearer ${token2}`)
      .end((err, response) => {
        expect(response).to.have.status(403);
        expect(response.body.message).to.equal("Not Authorized To Access this Site");
      });
    done();
>>>>>>> ch-refactor-165853483
  });
});

describe("View all bank account query test", () => {
  it("should return all active accounts in the database", (done) => {
    chai.request(app)
      .get("/api/v1/accounts?status=active")
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(200);
        // expect(response.body.data).to.be.an("array");
        // expect(response.body.data[0]).to.be.an("object");
        // expect(response.body.data[0].status).to.equal("active");
      });
    done();
  });

  it("should return all dormant accounts in the database", (done) => {
    chai.request(app)
      .get("/api/v1/accounts?status=dormant")
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data).to.be.an("array");
        expect(response.body.data[0]).to.be.an("object");
      });
    done();
  });

  it("should throw error", (done) => {
    chai.request(app)
      .get("/api/v1/accounts?status=acive")
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal("Invalid status");
      });
    done();
  });

  it("should throw error", (done) => {
    chai.request(app)
      .get("/api/v1/accounts?id=active")
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("id is not allowed");
      });
    done();
  });
});

describe("View specific bank account test", () => {
  it("should return a specific account in the database", (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${activeAccount}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data).to.be.an("object");
        expect(response.body.data).to.have.property("accountNumber");
        expect(response.body.data).to.have.property("email");
        expect(response.body.data).to.have.property("type");
        expect(response.body.data).to.have.property("status");
        expect(response.body.data).to.have.property("createdOn");
        expect(response.body.data).to.have.property("balance");
      });
    done();
  });

  it("should throw an error if the account isnt in the database", (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${wrongAccount}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal("Account Not Found");
      });
    done();
  });

  it("should throw an error if the account isnt in the database", (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${wrongAccount2}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal("Account Not Found");
      });
    done();
  });

  it("should throw an error if the account isnt in the database", (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${wrongAccount1}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal("Account Not Found");
      });
    done();
  });
});

describe("Create Account test", () => {
  const endpoint = "/api/v1/accounts";
  it("should not create a user when there are no parameters", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token2}`)
      .send({})
      .end((err, response) => {
        expect(response).have.a.status(400);
      });
    done();
  });

  it("should not create a user account if the email is missing", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token2}`)
      .send({
        type: "Savings",
        openingBalance: 400000.34,
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("email is required");
      });
    done();
  });

  it("should not create a user account if the account type is missing", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token2}`)
      .send({
        email: "user1@gmail.com",
        openingBalance: 400000.34,
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("type is required");
      });
    done();
  });

  it("should not create a user account if the opening balance is missing", (done) => {
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token2}`)
      .send({
        email: "user1@gmail.com",
        type: "Savings",
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("opening balance is required");
      });
    done();
  });

  it("should not create accounts if email is invalid", (done) => {
    const payload = {
      email: "hyrgms.com",
<<<<<<< HEAD
      openingBalance: 400040.34,
      type: "Current",
    };
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token2}`)
=======
      openingBalance: 400040.34,
      type: "Current",
    };
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token2}`)
      .send(payload)
      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid email");
      });
    done();
  });

  it("should create a user account if all credentials are given", (done) => {
    const payload = {
      openingBalance: 400040.34,
      email: "clasiqaas@gmail.com",
      type: "savings",
    };
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token2}`)
      .send(payload)

      .end((err, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an("object");
        expect(response).to.have.status(201);
        expect(response.body.data).to.be.a("object");
        expect(response.body.data).to.have.property("accountNumber");
        expect(response.body.data).to.have.property("owner");
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("status");
        expect(response.body.data).to.have.property("createdOn");
      });
    done();
  });

  it("should not create a user account if wrong token is given", (done) => {
    const payload = {
      openingBalance: 400040.34,
      email: "user5@gmail.com",
      type: "Savings",
    };
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token}`)
>>>>>>> ch-refactor-165853483
      .send(payload)
      .end((err, response) => {
<<<<<<< HEAD
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid email");
=======
        expect(response).to.have.status(403);
        expect(response.body.message).to.equal("Not Authorized To Access this Site");
>>>>>>> ch-refactor-165853483
      });
    done();
  });

<<<<<<< HEAD
  it("should create a user account if all credentials are given", (done) => {
    const payload = {
      email: "user5@gmail.com",
      openingBalance: 400040.34,
=======
  it("should not create a user account if bad token is given", (done) => {
    const payload = {
      openingBalance: 400040.34,
      email: "user5@gmail.com",
      type: "Savings",
    };
    chai.request(app)
      .post(endpoint)
      .set("authorization", "Bearer rtcyvubm76546t789k09u544")
      .send(payload)

      .end((err, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal("Not Authorized");
      });
    done();
  });
  it("should not create a user account if bad token is given", (done) => {
    const payload = {
      openingBalance: 400040.34,
      email: "user5@gmail.com",
>>>>>>> ch-refactor-165853483
      type: "Savings",
    };
    chai.request(app)
      .post(endpoint)
      .set("authorization", `Bearer ${token2}`)
      .send(payload)

      .end((err, response) => {
<<<<<<< HEAD
        expect(response).to.have.status(201);
        expect(response.body).to.be.an("object");
        expect(response).to.have.status(201);
        expect(response.body.data).to.be.a("object");
        expect(response.body.data).to.have.property("accountNumber");
        expect(response.body.data).to.have.property("owner");
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("status");
        expect(response.body.data).to.have.property("createdOn");
=======
        expect(response).to.have.status(407);
        expect(response.body.message).to.equal("Missing Authorization");
>>>>>>> ch-refactor-165853483
      });
    done();
  });
});

describe("Activate account test", () => {
  it("should activate an user account if account is dormant", (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${dormantAccount}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data.status).to.equal("active");
      });
    done();
  });

  it("should not activate if account number is invalid", (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${wrongAccount}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid account number");
      });
    done();
  });

  it("should not activate if account number is invalid", (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${wrongAccount2}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal("Account Not Found");
      });
    done();
  });
});

describe("Deactivate account test", () => {
  it("should deactivate a user account if account is active", (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${activeAccount}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data.status).to.equal("dormant");
      });
    done();
  });

  it("should not deactivate if account number is invalid", (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${wrongAccount}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid account number");
      });
    done();
  });

  it("should not deactivate if account number is invalid", (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${wrongAccount2}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal("Account Not Found");
      });
    done();
  });
});

describe("Delete account test", () => {
  it("should do nothing if user account is not found", (done) => {
    chai.request(app)
      .delete(`/api/v1/accounts/${wrongAccount}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid account number");
      });
    done();
  });

  it("should delete a user account if account is found", (done) => {
    chai.request(app)
      .delete(`/api/v1/accounts/${dormantAccount}`)
      .set("authorization", `Bearer ${token}`)
      .end((err, response) => {
        expect(response).to.have.status(200);

        expect(response.body.message).to.equal("Account Successfully Delete");
      });
    done();
  });
});
