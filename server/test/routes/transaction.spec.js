import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../../app";

chai.use(chaiHttp);

const testAccountNumber1 = 9000134322;
const wrongAccountNumber = 8000134354;
const testAccountNumber2 = 9000134354;
const testAccountNumber = 9000134302;


let token = null;
let token2 = null;

before(() => {
  token = jwt.sign({
    id: 1,
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

describe("View all account transaction test", () => {
  it("should display all transaction if account number is valid", (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${testAccountNumber1}/transactions`)
      .set("authorization", `Bearer ${token2}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data).to.be.an("array");
        expect(response.body.data[0]).to.be.an("object");
        expect(response.body.data[0]).to.have.property("id");
        expect(response.body.data[0]).to.have.property("createdOn");
        expect(response.body.data[0]).to.have.property("type");
        expect(response.body.data[0]).to.have.property("accountNumber");
        expect(response.body.data[0]).to.have.property("amount");
        expect(response.body.data[0]).to.have.property("oldbalance");
        expect(response.body.data[0]).to.have.property("newbalance");
      });
    done();
  });

  it("should not display any transaction if account number is invalid", (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${wrongAccountNumber}/transactions`)
      .set("authorization", `Bearer ${token2}`)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid Account Number");
      });
    done();
  });
});

describe("View specific transaction test", () => {
  // it("should display a transaction if id is valid", (done) => {
  //   chai.request(app)
  //     .get("/api/v1/transactions/4")
  //     .set("authorization", `Bearer ${token2}`)
  //     .end((error, response) => {
  //       expect(response).to.have.status(200);
  //       expect(response.body.data).to.have.property("id");
  //       expect(response.body.data).to.have.property("createdOn");
  //       expect(response.body.data).to.have.property("type");
  //       expect(response.body.data).to.have.property("accountNumber");
  //       expect(response.body.data).to.have.property("amount");
  //       expect(response.body.data).to.have.property("oldbalance");
  //       expect(response.body.data).to.have.property("newbalance");
  //     });
  //   done();
  // });

  it("should not display a transaction if id is invalid", (done) => {
    chai.request(app)
      .get("/api/v1/transactions/87")
      .set("authorization", `Bearer ${token2}`)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid transaction id");
      });
    done();
  });
});

describe("Debit Account test", () => {
  it("should not debit account if there are no parameters", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber1}/debit`)
      .set("authorization", `Bearer ${token}`)
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(400);
      });
    done();
  });

  it("should debit a user when the parameters are correct", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/9000134302/debit`)
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: 50000,
        depositor: "Hail",
        depositorPhoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("createdOn");
        expect(response.body.data).to.have.property("type");
        expect(response.body.data).to.have.property("cashier");
      });
    done();
  });

  it("should not debit a user if the account number invalid", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${wrongAccountNumber}/debit`)
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: 70000,
        depositor: "Name",
        depositorPhoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid Account Number");
      });
    done();
  });

  it("should not debit a user if the account status is dormant", (done) => {
    chai.request(app)
      .post("/api/v1/transactions/9000134322/debit")
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: 70000,
        depositor: "Name",
        depositorPhoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Account is Inactive");
      });
    done();
  });


  it("should not debit if a user types a wrong amount format  ", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber2}/debit`)
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: "k00yu00",
        depositor: "Name",
        depositorPhoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid amount");
      });
    done();
  });


  it("should not debit if a user types a wrong phone number format  ", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber2}/debit`)
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: 40000,
        depositor: "Name",
        depositorPhoneNumber: "08064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("depositor phone number has invalid parameters");
      });
    done();
  });

  it("should not debit a user if the account balance is lower than the amount to be debited", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber}/debit`)
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: 7000000,
        depositor: "Nme",
        depositorPhoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Low Funds. Account cant be Debited");
      });
    done();
  });
});

describe("Credit Account test", () => {
  it("should not credit account if there are no parameters", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber2}/credit`)
      .set("authorization", `Bearer ${token}`)
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(400);
      });
    done();
  });

  it("should credit a user when the parameters are correct", (done) => {
    chai.request(app)
      .post("/api/v1/transactions/9000134394/credit")
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: 600000,
        depositor: "Ben",
        depositorPhoneNumber: "2348064372423",
      })

      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("createdOn");
        expect(response.body.data).to.have.property("type");
        expect(response.body.data).to.have.property("cashier");
      });
    done();
  });

  it("should not credit if a user types a wrong amount format  ", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber2}/credit`)
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: "k00yu00",
        depositor: "Name",
        depositorPhoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid amount");
      });
    done();
  });

  it("should not credit a user if the account status is dormant", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber1}/credit`)
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: 70000,
        depositor: "Name",
        depositorPhoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Account is Inactive");
      });
    done();
  });

  it("should not credit a user if the account number is invalid", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${wrongAccountNumber}/credit`)
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: 700,
        depositor: "Simon",
        depositorPhoneNumber: "2348064372423",
      })

      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid Account Number");
      });
    done();
  });

  it("should not credit a user if the phone number is invalid", (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${wrongAccountNumber}/credit`)
      .set("authorization", `Bearer ${token}`)
      .send({
        amount: 700,
        depositor: "Simon",
        depositorPhoneNumber: "23480640372423",
      })

      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("depositor phone number contains incorrect parameters");
      });
    done();
  });
});
