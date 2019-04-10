/* eslint-disable no-undef */
import request from "request";
import dataFunction from "../../controllers/dbController";

describe("Sign in test", () => {
  const endpoint = "http://localhost:3000/api/v1/accounts";
  it("should not login a user when there are no parameters", (done) => {
    request.post(endpoint, { json: true, body: {} }, (error, response) => {
      expect(response.statusCode).toEqual(400);
      done();
    });
  });

  it("should not create a user account if the email is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("email is required");
      done();
    });
  });


  it("should not create a user account if the phone number is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("phone number is required");
      done();
    });
  });

  it("should not create a user account if the first name is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("first name is required");
      done();
    });
  });

  it("should not create a user account if the last name is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("last name is required");
      done();
    });
  });
  it("should not create a user account if the date of birth is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("date of birth is required");
      done();
    });
  });

  it("should not create a user account if the address is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        type: "Savings",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("address is required");
      done();
    });
  });

  it("should not create a user account if the account type is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        balance: 400000.34,
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("Account type is required");
      done();
    });
  });

  it("should not create a user account if the opening balance is missing", (done) => {
    const pageload = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
      },
    };
    request.post(endpoint, pageload, (error, response, body) => {
      expect(response.statusCode).toEqual(400);
      expect(body.error).toEqual("opening balance is required");
      done();
    });
  });
  it("should create a user account if all credentials are given", (done) => {
      
    const pageload1 = {
      json: true,
      body: {
        firstName: "Second",
        lastName: "Nme",
        email: "user1@gmail.com",
        balance: 400040.34,
        phoneNumber: "08064372423",
        dob: "1991-05-12",
        address: "11 Banka str., Andela, Lagos, Nigeria",
        type: "Savings",
      },
    };

    request.post(endpoint, pageload1, (error, response, body) => {
      const {
        accountNumber, owner, id, createdOn, status, ...acc
      } = body.data;
      expect(response.statusCode).toEqual(201);
      expect(accountNumber).toBeDefined();
      expect(owner).toBeDefined();
      expect(id).toBeDefined();
      expect(status).toBeDefined();
      expect(createdOn).toBeDefined();
      expect(acc).toEqual(pageload1.body);
      done();
    });
  });
});
