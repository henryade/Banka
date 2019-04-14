import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

chai.use(chaiHttp);

describe("Create Account test", () => {
  const endpoint = "/api/v1/accounts";
  it("should not create a user when there are no parameters", () => {
    chai.request(app)
      .post(endpoint)
      .send({})
      .end((err, response) => {
        expect(response).have.a.status(400);
      });
  });

  it("should not create a user account if the email is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "Nme",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("email is required");
      });
  });

  it("should not create a user account if the phone number is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("phone number is required");
      });
  });

  it("should not create a user account if the first name is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("first name is required");
      });
  });

  it("should not create a user account if the last name is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("last name is required");
      });
  });

  it("should not create a user account if the date of birth is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("date of birth is required");
      });
  });

  it("should not create a user account if the address is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        type: "Savings",
        balance: 400000.34,
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("address is required");
      });
  });

  it("should not create a user account if the account type is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        balance: 400000.34,
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Account type is required");
      });
  });

  it("should not create a user account if the opening balance is missing", () => {
    chai.request(app)
      .post(endpoint)
      .send({
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
      })

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("opening balance is required");
      });
  });
  it("should create a user account if all credentials are given", () => {
    const payload = {
      firstName: "Second",
      lastName: "Nme",
      email: "user1@gmail.com",
      balance: 400040.34,
      phoneNumber: "08064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Savings",
    };
    chai.request(app)
      .post(endpoint)
      .send(payload)

      .end((err, response) => {
        const {
          accountNumber, owner, id, createdOn, status, ...acc
        } = response.body.data;
        expect(response).to.have.status(201);
        expect(response.body).to.be.an("object");
        expect(response).to.have.status(201);
        expect(response.body.data).to.be.a("object");
        expect(response.body.data).to.have.property("accountNumber");
        expect(response.body.data).to.have.property("owner");
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("status");
        expect(response.body.data).to.have.property("createdOn");
        expect(acc).to.deep.equal(payload);
      });
  });
});

const activeAccount = "9000134322";
const dormantAccount = 9000134354;
const wrongAccount = 900013432;

describe("Activate account test", () => {
  it("should do nothing if user account is active", () => {
    chai.request(app)
      .patch(`/api/v1/accounts/${activeAccount}/activate`)

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Account is active");
      });
  });


  it("should activate an user account if account is dormant", () => {
    chai.request(app)
      .patch(`/api/v1/accounts/${dormantAccount}/activate`)

      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data.status).to.equal("active");
      });
  });

  it("should not activate if account number is invalid", () => {
    chai.request(app)
      .patch(`/api/v1/accounts/${wrongAccount}/activate`)

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid account number");
      });
  });
});

describe("Deactivate account test", () => {
  it("should not do nothing if user account is dormant", () => {
    chai.request(app)
      .patch(`/api/v1/accounts/${dormantAccount}/deactivate`)

      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Account is dormant");
      });
  });


  it("should deactivate a user account if account is active", () => {
    chai.request(app)
      .patch(`/api/v1/accounts/${activeAccount}/deactivate`)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data.status).to.equal("dormant");
      });
  });

  it("should not deactivate if account number is invalid", () => {
    chai.request(app)
      .patch(`/api/v1/accounts/${wrongAccount}/deactivate`)
      .end((err, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid account number");
      });
  });
});

describe("Delete account test", () => {
  it("should do nothing if user account is not found", () => {
    chai.request(app)
      .delete(`/api/v1/accounts/${wrongAccount}`)

      .end((err, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal("Account Not Found");
      });
  });

  it("should delete a user account if account is found", () => {
    chai.request(app)
      .delete(`/api/v1/accounts/${dormantAccount}`)

      .end((err, response) => {
        expect(response).to.have.status(200);

        expect(response.body.message).to.equal("Account Successfully Delete");
      });
  });
});
