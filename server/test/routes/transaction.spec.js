import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
import Tdata from "../../controllers/dbController";

chai.use(chaiHttp);

const testAccountNumber1 = 9000134322;
const wrongAccountNumber = 8000134354;
const testAccountNumber2 = 9000134354;
const Account = Tdata.findTransactionByAccountNumber(testAccountNumber1);

describe("View specific transaction test", () => {
  it("should display a transaction if id is valid", () => {
    chai.request(app)
      .post(`/api/v1/transactions/349046`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("createdOn");
        expect(response.body.data).to.have.property("type");
        expect(response.body.data).to.have.property("accountNumber");
        expect(response.body.data).to.have.property("amount");
        expect(response.body.data).to.have.property("oldBalance");
        expect(response.body.data).to.have.property("newBalance");

      });
  });

  it("should not display a transaction if id is invalid", () => {
    chai.request(app)
      .post(`/api/v1/transactions/4387483`)

      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal("Invalid Transaction Id");
      });
  });
});

describe("Debit Account test", () => {
  it("should not debit account if there are no parameters", () => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber1}/debit`)
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(400);
      });
  });

  it("should debit a user when the parameters are correct", () => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber2}/debit`)
      .send({
        amount: 50000.00,
        depositor: "Hail",
        phoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(Account.newBalance).to.be.above(response.body.data.newBalance);
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("createdOn");
        expect(response.body.data).to.have.property("type");
        //   expect(response.body.data).to.have.property("cashier");
      });
  });

  it("should not debit a user if the account number invalid", () => {
    chai.request(app)
      .post(`/api/v1/transactions/${wrongAccountNumber}/debit`)
      .send({
        amount: 70000,
        depositor: "Name",
        phoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid Account Number");
      });
  });

  it("should not debit a user if the account status is dormant", () => {
    chai.request(app)
      .post(`/api/v1/transactions/9000134322/debit`)
      .send({
        amount: 70000,
        depositor: "Name",
        phoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Account is Inactive");
      });
  });


  it("should not debit if a user types a wrong amount format  ", () => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber2}/debit`)
      .send({
        amount: "k00yu00",
        depositor: "Name",
        phoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Amount is Invalid");
      });
  });

  it("should not debit a user if the account balance is lower than the amount to be debited", () => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber2}/debit`)
      .send({
        amount: 700000,
        depositor: "Nme",
        phoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Low Funds. Account cant be Debited");
      });
  });
});

describe("Credit Account test", () => {
  it("should not credit account if there are no parameters", () => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber2}/credit`)
      .send({})
      .end((error, response) => {
        expect(response).to.have.status(400);
      });
  });

  it("should credit a user when the parameters are correct", () => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber2}/credit`)
      .send({
        amount: 600000,
        depositor: "Ben",
        phoneNumber: "2348064372423",
      })

      .end((error, response) => {
        expect(response).to.have.status(200);
        //expect(Account.oldBalance).to.be.below(response.body.data.balance);
        expect(response.body.data).to.have.property("id");
        expect(response.body.data).to.have.property("createdOn");
        expect(response.body.data).to.have.property("type");
      // (body.data.cashier).to.have.property("status");
      });
  });

  it("should not debit if a user types a wrong amount format  ", () => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber2}/credit`)
      .send({
        amount: "k00yu00",
        depositor: "Name",
        phoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Amount is Invalid");
      });
  });

  it("should not debit a user if the account status is dormant", () => {
    chai.request(app)
      .post(`/api/v1/transactions/${testAccountNumber1}/credit`)
      .send({
        amount: 70000,
        depositor: "Name",
        phoneNumber: "2348064372423",
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Account is Inactive");
      });
  });

  it("should not credit a user if the account number is invalid", () => {
    chai.request(app)
      .post(`/api/v1/transactions/${wrongAccountNumber}/credit`)
      .send({
        amount: 700,
        depositor: "Simon",
        phoneNumber: "2348064372423",
      })

      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.error).to.equal("Invalid Account Number");
      });
  });
});
