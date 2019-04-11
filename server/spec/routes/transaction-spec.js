import request from "request";
import Tdata from "../../controllers/dbController";

const Account = Tdata.findAccountByAccountNumber(testAccountNumber1);
const testAccountNumber1 = 9000134322;
const testAccountNumber2 = 8000134354;

describe("Debit Account test", () => {

  it("should not debit account if there are no parameters", (done) => {
    request.post(`http://localhost:3000/api/v1/transactions/${testAccountNumber1}/debit`, { json: true, body: {} }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it("should debit a user when the parameters are correct", (done) => {
    const pageload = {
        json: true,
        body: {
          amount: 50000.00,
          depositor: "Hail",
          phoneNumber: "08064372423",
        },
      };
    request.post(`http://localhost:3000/api/v1/transactions/${testAccountNumber1}/debit`, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(testAccountNumber1).toEqual(body.data.accountBalance);
      expect(Account.balance).toBeGreaterThan(body.data.accountBalance);
      expect(body.data.id).toBeDefined();
      expect(body.data.created).toBeDefined();
      expect(body.data.type).toBeDefined();
      //expect(body.data.cashier).toBeDefined();
      done();
    });
  });
});

  it("should not debit a user if the account number invalid", (done) => {
    const pageload = {
        json: true,
        body: {
          amount: 70000,
          depositor: "Name",
          phoneNumber: "08064372423",
        },
      };
    request.post(`http://localhost:3000/api/v1/transactions/${testAccountNumber2}/debit`, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("Invalid account number");
      done();
    });
  });

  it("should not debit a user if the account balance is lower than the amount to be debited", (done) => {
    const pageload = {
        json: true,
        body: {
          amount: 500000,
          depositor: "Nme",
          phoneNumber: "08064372423",
        },
      };
    request.post(`http://localhost:3000/api/v1/transactions/${testAccountNumber2}/debit`, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("Low Funds. Account cant be Debited");
      done();
    });
  });
});

describe("Credit Account test", () => {
  const endpoint = `http://localhost:3000/api/v1/transactions/${testAccountNumber2}/credit`;
  it("should not credit account if there are no parameters", (done) => {
    request.post(`http://localhost:3000/api/v1/transactions/${testAccountNumber1}/credit`, { json: true, body: {} }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it("should not credit account if there are no parameters arent correct", (done) => {
    const pageload = {
        json: true,
        body: {
          amount: 600000,
          depositor: "Frank",
          phoneNumber: "08064372423",
        },
      };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toBe("");
      done();
    });
  });

  it("should credit a user when the parameters are correct", (done) => {
    const pageload = {
        json: true,
        body: {
          amount: 600000,
          depositor: "Ben",
          phoneNumber: "08064372423",
        },
      };
    request.post(`http://localhost:3000/api/v1/transactions/${testAccountNumber1}/debit`, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(200);
      expect(testAccountNumber1).toBe(body.data.accountBalance);
      expect(oldAccountBalance).toBeLessThan(body.data.accountBalance);
      expect(body.data.id).toBeDefined();
      expect(body.data.created).toBeDefined();
      expect(body.data.type).toBeDefined();
      //(body.data.cashier).toBeDefined();
      done();
    });
  });
});

  it("should not credit a user if the account number invalid", (done) => {
    const pageload = {
        json: true,
        body: {
          amount: 700,
          depositor: "Simon",
          phoneNumber: "08064372423",
        },
      };
    request.post(`http://localhost:3000/api/v1/transactions/${testAccountNumber2}/debit`, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(error).toEqual("Invalid Account Number");
      done();
    });
  });
});
